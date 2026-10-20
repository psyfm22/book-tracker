import { useState, useEffect } from "react";

function AddBook() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [author, setAuthor] = useState("");
  const [watchlist, setWatchlist] = useState(false);

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
    </div>
  );
}

export default AddBook;
