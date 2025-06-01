import { createBook, fetchBooks, ITEMS_PER_PAGE } from '../services/book.service';
import type { Book, NewBook, PaginatedBooksData } from '../types/book.types';

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('Book Service', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('fetchBooks', () => {
    const mockBooksData: PaginatedBooksData = {
      first: 1,
      prev: null,
      next: 2,
      last: 5,
      pages: 5,
      items: 50,
      data: [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic',
          rating: 4.5,
          status: 'Read',
          pages: 180,
          review: 'A masterpiece of American literature',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
          rating: 5,
          status: 'Currently Reading',
          pages: 328,
          createdAt: '2024-01-10T14:20:00Z'
        }
      ]
    };

    test('should fetch books successfully for page 1', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockBooksData,
      } as Response);

      const result = await fetchBooks(1);

      expect(mockFetch).toHaveBeenCalledWith(
        `http://localhost:3001/books?_page=1&_per_page=${ITEMS_PER_PAGE}&_sort=-createdAt`
      );
      expect(result).toEqual(mockBooksData);
    });

    test('should fetch books successfully for page 3', async () => {
      const page3Data = { ...mockBooksData, prev: 2, next: 4 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => page3Data,
      } as Response);

      const result = await fetchBooks(3);

      expect(mockFetch).toHaveBeenCalledWith(
        `http://localhost:3001/books?_page=3&_per_page=${ITEMS_PER_PAGE}&_sort=-createdAt`
      );
      expect(result).toEqual(page3Data);
    });

    test('should throw error when fetch fails with 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(fetchBooks(1)).rejects.toThrow('Failed to fetch books');
    });

    test('should throw error when fetch fails with 500', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(fetchBooks(1)).rejects.toThrow('Failed to fetch books');
    });

    test('should handle network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchBooks(1)).rejects.toThrow('Network error');
    });
  });

  describe('createBook', () => {
    const mockNewBook: NewBook = {
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      rating: 4.8,
      status: 'To Read',
      pages: 688,
      review: 'Epic space opera',
      createdAt: '2024-02-01T09:15:00Z'
    };

    const mockCreatedBook: Book = {
      id: 3,
      ...mockNewBook
    };

    test('should create book successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCreatedBook,
      } as Response);

      const result = await createBook(mockNewBook);

      expect(mockFetch).toHaveBeenCalledWith(
        `http://localhost:3001/books`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockNewBook),
        }
      );
      expect(result).toEqual(mockCreatedBook);
    });

    test('should create book without optional review field', async () => {
      const bookWithoutReview: NewBook = {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        rating: 4.6,
        status: 'Read',
        pages: 310,
        createdAt: '2024-01-20T16:45:00Z'
      };

      const createdBookWithoutReview: Book = {
        id: 4,
        ...bookWithoutReview
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdBookWithoutReview,
      } as Response);

      const result = await createBook(bookWithoutReview);

      expect(mockFetch).toHaveBeenCalledWith(
        `http://localhost:3001/books`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookWithoutReview),
        }
      );
      expect(result).toEqual(createdBookWithoutReview);
    });

    test('should throw error when creation fails with 400', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      } as Response);

      await expect(createBook(mockNewBook)).rejects.toThrow('Failed to create book');
    });

    test('should throw error when creation fails with 422', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
      } as Response);

      await expect(createBook(mockNewBook)).rejects.toThrow('Failed to create book');
    });

    test('should handle network error during creation', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(createBook(mockNewBook)).rejects.toThrow('Connection timeout');
    });
  });
});
