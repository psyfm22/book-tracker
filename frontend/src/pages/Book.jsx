import { useParams } from "react-router";
import { useEffect, useState } from "react";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    rating: "",
    date_finished: "",
    notes: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  async function getBook() {
    try {
      const response = await fetch(`http://localhost:3000/books/read/${id}`);
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Could not Find book to the server");
    }
  }

  async function updateBook() {
    try {
      const response = await fetch(`http://localhost:3000/books/read/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          rating: book.rating,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update book");
      }

      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Could not update book");
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    //This is to protect if there isn't an id in the params
    if (id) {
      getBook();
    }
  }, [id]);

  function handleUpdateBook(event) {
    event.preventDefault();
    setIsUpdating(true);
    updateBook();
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setBook((b) => ({
      ...b,
      [name]: value,
    }));
  }

  if (!book) {
    <div>
      <h1>Book Loading...</h1>
    </div>;
  }

  return (
    <div>
      <h1> Book</h1>

      <form onSubmit={handleUpdateBook}>
        <div>
          <label>
            Title:
            <input
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              min="0"
              max="10"
              step="1"
              value={book.rating}
              onChange={handleChange}
            />
          </label>
        </div>

        <button onClick={handleUpdateBook} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
}

export default Book;
