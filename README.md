# My Digital Bookshelf Application

This React + TypeScript application serves as a demonstration of skills for a technical assessment. It enables users to view and add books, featuring infinite scroll for book listing and a modal form for adding new entries. The application interacts with a mock backend powered by "json-server".

## Core Features

*   **Book Listing:** Displays an inventory of books in a tabular format, showing details such as title, author, genre, user rating, reading status, page count, and a brief review.
*   **Infinite Scroll Implementation:** Dynamically loads more books as the user scrolls, providing a seamless browsing experience for larger datasets. This is implemented using the "react-infinite-scroll-component".
*   **Add New Book Functionality:** Users can add new books to their collection via a modal. This includes client-side form validation using Joi.
*   **State Management:** Leverages the React Context API for managing shared application state related to books, loading indicators, and error handling.
*   **API Integration:** Fetches and posts data to a "json-server", which simulates a RESTful backend.
*   **Data Sorting:** Books are sorted by their creation timestamp in descending order, ensuring the most recently created books appear at the top of the list.
*   **UI/UX:** Built with Material-UI (MUI) for a consistent and responsive user interface.
*   **Testing:** Incorporates unit tests for the API service layer (book.service.ts)

## Technology Stack

*   **Frontend Framework/Libraries:**
    *   React with TypeScript
    *   Vite
    *   Material-UI (MUI)
    *   Joi Validation
    *   React Infinite Scroll Component
    *   React Context API
*   **Mock Backend:**
    *   "json-server"
*   **Testing Frameworks/Libraries:**
    *   Jest
 
## State Management: Why React Context API?

For this application's state management, React's Context API was chosen for its simplicity and suitability to the project's scale. While powerful libraries like Redux offer extensive features, they would introduce unnecessary complexity for managing the book collection and UI states in this particular project. Context API provides an effective built-in solution to share state (like the book list and loading indicators) and functions across components, cleanly avoiding prop drilling without the overhead of a larger state management system. This keeps the component interactions direct and the overall architecture more straightforward.
