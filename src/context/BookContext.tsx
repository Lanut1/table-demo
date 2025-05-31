import React, { createContext, useState, useContext, useCallback, useEffect, type ReactNode } from 'react';
import { fetchBooks, createBook as apiCreateBook, ITEMS_PER_PAGE } from '../services/book.service';
import type { Book, BookContextType, NewBook } from '../types/book.types';

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading ] = useState<boolean>(false);
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [error, setError] = useState< string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const loadInitialBooks = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    console.log("loading initial")
    try {
      const initialBooks = await fetchBooks(1);
      setBooks(initialBooks);
      console.log(initialBooks)
      setCurrentPage(1);
      setHasMore(initialBooks.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load initial books');
      setBooks([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    loadInitialBooks();
  }, []);

  const loadMoreBooks = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoading) return;

    console.log("loading more books")

    setIsLoadingMore(true);
    setError(null);
    try {
      const nextPageToFetch = currentPage + 1;
      const newBooks = await fetchBooks(nextPageToFetch);
      console.log(newBooks)


      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      setCurrentPage(nextPageToFetch);
      setHasMore(newBooks.length === ITEMS_PER_PAGE)
    } catch (err) {
      setError(err instanceof Error ? `Load more error: ${err.message}` : 'Failed to load more books');
    } finally {
      setIsLoadingMore(false)
    }
  }, [isLoadingMore, hasMore, currentPage, isLoading])

  const addBook = useCallback(async (newBookData: NewBook) => {
    if (isAddingBook) return;

    setIsAddingBook(true);
    setError(null);

    try {
      const addedBook = await apiCreateBook(newBookData);
      setBooks(prevBooks => [addedBook, ...prevBooks.filter(b => b.id !== addedBook.id)].sort((a,b) => b.id - a.id ));
    } catch (err) {
      const errorMessage = err instanceof Error ? `Add book error: ${err.message}` : 'Failed to add book';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsAddingBook(false);
    }
  }, [isAddingBook]);

  return (
    <BookContext.Provider value={{
        books,
        isLoading,
        isAddingBook,
        isLoadingMore,
        error,
        hasMore,
        loadInitialBooks,
        loadMoreBooks,
        addBook
      }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = (): BookContextType => {
  const context = useContext(BookContext);
  if (context === undefined) throw new Error('useBooks must be used within a BookProvider')

  return context;
};
