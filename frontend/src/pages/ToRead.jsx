import { useState, useEffect } from "react";

function ToRead() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  async function fetchBooks() {
    const response = await fetch("http://localhost:3000/books/to-read");
    const data = await response.json();
    setBooks(data);
  }

  async function handleAddBook(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/books/to-read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
      }),
    });
    if (!response.ok) {
      alert("Failed to add book");
      return;
    }

    setTitle("");
    setAuthor("");

    await fetchBooks();
  }

  useEffect(() => {
    fetchBooks().catch(console.error);
  }, []);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  return (
    <div>
      <h1>My To-Read List</h1>

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

        <button type="submit">Add Book</button>
      </form>

      {books.map((book, index) => (
        <div key={book.book_id}>
          <h2>
            {index + 1}. {book.title}
          </h2>
          <p>Author: {book.author}</p>
          <p>Rating: {book.date_added}</p>
        </div>
      ))}
    </div>
  );
}

export default ToRead;
