import { Alert, Box, Button, Container, Typography } from '@mui/material'
import './App.css'
import BookList from './components/BookList'
import AddBookForm from './components/AddBookForm'
import { useBooks } from './context/BookContext'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

function App() {
  const { error: globalError } = useBooks()
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);

  const handleOpenAddBookDialog = () => {
    setIsAddBookDialogOpen(true);
  };

  const handleCloseAddBookDialog = () => {
    setIsAddBookDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3, backgroundColor: 'background.paper', minHeight: '100vh', borderRadius: 1, mt:1}}>
      {globalError && !globalError.includes("form") && !globalError.includes("Load more") && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          Error occurred: {globalError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 2.5 }}>
        <Typography variant="h3" component="h1" textAlign="center" color="primary">
          My Digital Bookshelf
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenAddBookDialog}
          size="large"
        >
          Add New Book
        </Button>
      </Box>

      <AddBookForm open={isAddBookDialogOpen} onClose={handleCloseAddBookDialog} />

      <BookList />
    </Container>
  )
}

export default App
