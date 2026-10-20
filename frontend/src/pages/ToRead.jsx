import { useState, useEffect } from "react";
import { Link } from "react-router";

function ToRead() {
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    const response = await fetch("http://localhost:3000/books/to-read");
    const data = await response.json();
    setBooks(data);
  }

  useEffect(() => {
    fetchBooks().catch(console.error);
  }, []);

  async function handleDeleteBook(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/books/to-read/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        alert("Failed to Delete book");
        return;
      }
      await fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Could not connect to the server");
    }
  }

  return (
    <div>
      <h1>My To-Read List</h1>

      {books.map((book, index) => (
        <div key={book.book_id}>
          <Link to={`/to-read/${book.book_id}`}>
            <h2>
              {index + 1}. {book.title}
            </h2>
          </Link>
          <p>Author: {book.author}</p>
          <p>Date Added: {book.date_added}</p>
          <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ToRead;
