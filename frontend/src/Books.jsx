import { useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");

  function handleAddBook() {
    const newBook = { name: bookName, author: "John", rating: 2 };

    setBooks((c) => [...c, newBook]);
    setBookName("");
  }

  function handleRemoveBook(index) {
    setBooks((c) => c.filter((_, i) => i !== index));
  }

  function handleNameChange(event) {
    setBookName(event.target.value);
  }

  return (
    <div>
      <h1>Books</h1>

      <ul>
        {books.map((book, index) => (
          <li key={index} onClick={() => handleRemoveBook(index)}>
            {" "}
            {book.name} {book.author} {book.rating}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={bookName}
        onChange={handleNameChange}
        placeholder="Book Title..."
      ></input>
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
}

export default Books;
