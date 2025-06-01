export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  status: "Read" | "Currently Reading" | "To Read" | "Dropped" | string;
  pages: number;
  review?: string;
  createdAt: string;
}

export type NewBook = Omit<Book, 'id'>;

type NumberOrNull = number | null; 

export interface PaginatedBooksData {
  first: NumberOrNull;
  prev: NumberOrNull;
  next: NumberOrNull;
  last: NumberOrNull;
  pages: NumberOrNull;
  items: NumberOrNull;
  data: Book[];
}

export interface BookContextType {
  books: Book[];
  isLoading: boolean;
  isAddingBook: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadInitialBooks: () => Promise<void>;
  loadMoreBooks: () => Promise<void>;
  addBook: (newBook: NewBook) => Promise<void>;
}
