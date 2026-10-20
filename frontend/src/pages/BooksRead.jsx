import { useState, useEffect } from "react";

function BooksRead() {
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    const response = await fetch("http://localhost:3000/books/read");
    const data = await response.json();
    setBooks(data);
  }

  useEffect(() => {
    fetchBooks().catch(console.error);
  }, []);

  async function handleDeleteBook(id) {
    try {
      const response = await fetch(`http://localhost:3000/books/read/${id}`, {
        method: "DELETE",
      });
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
      <h1>Books Read</h1>

      {books.map((book, index) => (
        <div key={book.book_id}>
          <h2>
            {index + 1}. {book.title}
          </h2>
          <p>Author: {book.author}</p>
          <p>Rating: {book.rating ?? "Not rated"}</p>
          <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BooksRead;
