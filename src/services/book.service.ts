import type { Book, NewBook} from "../types/book.types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ITEMS_PER_PAGE = 5;

export const fetchBooks = async (page: number): Promise<Book[]> => {
  const response = await fetch(`${API_BASE_URL}/books?_page=${page}&_per_page=${ITEMS_PER_PAGE}&_sort=-createdAt`);

  if (!response.ok) throw new Error('Failed to fetch books')

  const data = await response.json();
  console.log(data)
  return data.data
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