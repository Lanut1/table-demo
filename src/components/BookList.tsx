import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, CircularProgress, Box, Alert
} from '@mui/material';
import { useBooks } from '../context/BookContext';


const BookList: React.FC = () => {
  const {
    books,
    isLoading,
    error,
    hasMore,
    loadMoreBooks,
    loadInitialBooks
  } = useBooks();

  
  if (isLoading && books.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '200px', my: 2 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>
          Loading your books...
        </Typography>
      </Box>
    );
  }

  if (error && !error.includes("form") && !error.includes("Load more") && books.length === 0) {
    return (
          <Alert severity="error" sx={{ mt: 2 }}>
      Oops! Error loading books: {error}
    </Alert>
    )

  }

  if (!isLoading && books.length === 0 && !error) {
    return (
      <Typography sx={{ textAlign: 'center', mt: 3, fontStyle: 'italic' }}>
        No books here yet. Add the new one!
      </Typography>
    )
  }


  return (
    <>
      <InfiniteScroll
        dataLength={books.length}
        next={loadMoreBooks}
        hasMore={hasMore}
        loader={
          <Box display="flex" justifyContent="center" py={2.5}>
            <CircularProgress size={28} />
            <Typography variant="body2" sx={{ ml: 1.5, alignSelf: 'center' }}>Fetching more reads...</Typography>
          </Box>
        }
        endMessage={
          <Typography textAlign="center" color="text.secondary" py={3} sx={{ fontStyle: 'italic' }}>
            <b>No more books to load.</b>
          </Typography>
        }
        refreshFunction={loadInitialBooks}
      >
        <TableContainer component={Paper} elevation={2} sx={{ mt: 1 }}>
          <Table aria-label="books table" stickyHeader >
            <TableHead sx={{backgroundColor: 'grey.200'}}>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>Title</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Author</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>Genre</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Pages</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Review</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books?.map((book) => (
                <TableRow key={book.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                  <TableCell component="th" scope="row">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell align="right">{book.rating > 0 ? `${book.rating}/5` : '-'}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell align="right">{book.pages > 0 ? book.pages : '-'}</TableCell>
                  <TableCell sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {book.review || 'No review yet'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>

      {error && error.includes("Load more") && (
          <Alert severity="warning" sx={{mt: 2.5}}>
            Error fetching more books
          </Alert>
      )}
    </>
  );
};

export default BookList;
