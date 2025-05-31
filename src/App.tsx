import { Alert, Box, Container, Typography } from '@mui/material'
import './App.css'
import BookList from './components/BookList'
import AddBookForm from './components/AddBookForm'
import { useBooks } from './context/BookContext'

function App() {
  const { error: globalError } = useBooks()

  return (
    <Container maxWidth="md" sx={{ py: 3, backgroundColor: 'background.paper', minHeight: '100vh', borderRadius: 1, mt:1}}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center" color="primary">
        My Digital Bookshelf
      </Typography>

      {globalError && !globalError.includes("form") && !globalError.includes("Load more") && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          Error occurred: {globalError}
        </Alert>
      )}
     

      <Box sx={{ mb: 3.5 }}>
        <AddBookForm />
      </Box>

      <BookList />
    </Container>
  )
}

export default App
