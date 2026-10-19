import { useState, useEffect } from "react";

function BooksRead() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    const response = await fetch("http://localhost:3000/books/read");
    const data = await response.json();
    setBooks(data);
  }

  useEffect(() => {
    fetchBooks().catch(console.error);
  }, []);

  async function handleAddBook(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/books/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        rating: rating === "" ? null : Number(rating),
      }),
    });
    if (!response.ok) {
      alert("Failed to add book");
      return;
    }

    setTitle("");
    setAuthor("");
    setRating("");

    await fetchBooks();
  }

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

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  function handleRatingChange(event) {
    setRating(event.target.value);
  }

  return (
    <div>
      <h1>Books Read</h1>

      <form onSubmit={handleAddBook}>
        <div>
          <label>
            Title:
            <input value={title} onChange={handleTitleChange} required />
          </label>
        </div>

        <div>
          <label>
            Author:
            <input value={author} onChange={handleAuthorChange} required />
          </label>
        </div>

        <div>
          <label>
            Rating:
            <input
              type="number"
              min="0"
              max="10"
              step="1"
              value={rating}
              onChange={handleRatingChange}
            />
          </label>
        </div>

        <button type="submit">Add Book</button>
      </form>

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
