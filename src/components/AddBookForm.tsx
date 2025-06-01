import type { NewBook } from '../types/book.types';
import { bookSchema } from '../validators/bookValidator';
import React, { useState } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  TextField, Button, Box, Typography, Grid, CircularProgress, Alert,
  MenuItem, Select, FormControl, InputLabel, type SelectChangeEvent,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent
} from '@mui/material';
import { useBooks } from '../context/BookContext';
import CloseIcon from '@mui/icons-material/Close';

interface AddBookFormProps {
  open: boolean;
  onClose: () => void;
}

const initialFormData: Omit<NewBook, 'createdAt'> = {
  title: '',
  author: '',
  genre: '',
  rating: 0,
  status: 'To Read',
  pages: 0,
  review: '',
};

const ratingOptions = [
    { value: 0, label: '0 - Not Rated' },
    { value: 1, label: '1 - Poor' },
    { value: 2, label: '2 - Fair' },
    { value: 3, label: '3 - Good' },
    { value: 4, label: '4 - Very Good' },
    { value: 5, label: '5 - Excellent' },
  ];

const AddBookForm: React.FC<AddBookFormProps> = ({open, onClose }) => {
  const { addBook, isAddingBook } = useBooks();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<NewBook>({
    resolver: joiResolver(bookSchema),
    defaultValues: initialFormData,
    mode: 'onChange',
  });

  const handleClose = () => {
    onClose();
    reset(initialFormData);
  }

  const onSubmit: SubmitHandler<Omit<NewBook, "createdAt">> = async (data) => {
    setSubmitError(null);
    try {
      const processedData = {
        ...data,
        pages: Number(data.pages) || 0,
        rating: Number(data.rating) || 0,
        createdAt: new Date().toISOString(),
      };
      await addBook(processedData);
      handleClose()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Add a New Book
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        {submitError && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{submitError}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2.5}>
            <Grid size={{xs: 12, sm: 6}}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Book Title"
                    error={!!errors.title}
                    helperText={errors.title?.message || "What's the name of the book?"}
                    disabled={isAddingBook}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Author"
                    error={!!errors.author}
                    helperText={errors.author?.message || "Who wrote it?"}
                    disabled={isAddingBook}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label="Genre"
                    error={!!errors.genre}
                    helperText={errors.genre?.message}
                    disabled={isAddingBook}
                  />
                )}
              />
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.status} disabled={isAddingBook}>
                    <InputLabel id="status-select-label">Reading Status</InputLabel>
                    <Select
                      {...field}
                      labelId="status-select-label"
                      label="Reading Status"
                    >
                      <MenuItem value="To Read">Want to Read</MenuItem>
                      <MenuItem value="Currently Reading">Currently Reading</MenuItem>
                      <MenuItem value="Read">Finished Reading</MenuItem>
                      <MenuItem value="Dropped">Dropped / DNF</MenuItem>
                    </Select>
                    {errors.status && <Typography color="error" variant="caption" sx={{ml:1.5, mt:0.5}}>{errors.status.message}</Typography>}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.rating} disabled={isAddingBook}>
                    <InputLabel id="rating-select-label">Rating</InputLabel>
                    <Select
                      {...field}
                      labelId="rating-select-label"
                      label="Rating"
                      value={field.value}
                      onChange={(e: SelectChangeEvent<unknown>) => {
                          const value = Number(e.target.value);
                          field.onChange(value)
                      }}
                    >
                      {ratingOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.rating && <Typography color="error" variant="caption" sx={{ml:1.5, mt:0.5}}>{errors.rating.message}</Typography>}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Controller
                name="pages"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    type="number"
                    label="Total Pages"
                    value={field.value || ''}
                    error={!!errors.pages}
                    helperText={errors.pages?.message}
                    inputProps={{ min: 1 }}
                    disabled={isAddingBook}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                  />
                )}
              />
            </Grid>

            <Grid size={{xs: 12}}>
              <Controller
                name="review"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Your Quick Review (Optional)"
                    multiline
                    rows={4}
                    error={!!errors.review}
                    helperText={errors.review?.message}
                    disabled={isAddingBook}
                    variant="filled"
                  />
                )}
              />
            </Grid>

            <Grid sx={{ textAlign: 'center', mt: 1 }} size={{xs: 12}}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isAddingBook}
                size="large"
                startIcon={isAddingBook ? <CircularProgress size={22} color="inherit" /> : null}
                sx={{ minWidth: '180px' }}
              >
                {isAddingBook ? 'Saving...' : 'Add This Book'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookForm;
