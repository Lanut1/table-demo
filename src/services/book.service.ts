import type { Book, NewBook, PaginatedBooksData} from "../types/book.types";
const API_BASE_URL = process.env.API_BASE_URL;
export const ITEMS_PER_PAGE = 10;

export const fetchBooks = async (page: number): Promise<PaginatedBooksData> => {
  const response = await fetch(`${API_BASE_URL}/books?_page=${page}&_per_page=${ITEMS_PER_PAGE}&_sort=-createdAt`);

  if (!response.ok) throw new Error('Failed to fetch books')

  return await response.json();
};

export const createBook = async (bookData: NewBook): Promise<Book> => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) throw new Error('Failed to create book')

  return response.json();
};