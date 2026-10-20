import { useState } from "react";

function AddBook() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [author, setAuthor] = useState("");
  const [read, setRead] = useState(false);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  function handleRatingChange(event) {
    setRating(event.target.value);
  }

  function handleIsRead(event) {
    setRead(event.target.checked);
  }

  async function handleAddBook(event) {
    event.preventDefault();

    let response;
    if (read) {
      response = await fetch("http://localhost:3000/books/read", {
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
    } else {
      response = await fetch("http://localhost:3000/books/to-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
        }),
      });
    }

    if (!response.ok) {
      alert("Failed to add book");
      return;
    }

    setTitle("");
    setAuthor("");
    setRating("");
    alert("Book Added Successfully");
  }

  return (
    <div>
      <h1>Add a book</h1>

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
            Have you read the Book:
            <input type="checkbox" checked={read} onChange={handleIsRead} />
          </label>
        </div>

        {read && (
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
        )}

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
