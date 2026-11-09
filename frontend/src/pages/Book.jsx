import { useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";

function Book() {
  const location = useLocation();
  const isRead = location.pathname.startsWith("/read");

  const { id } = useParams();

  const [readBook, setReadBook] = useState({
    title: "",
    author: "",
    rating: "",
    date_finished: "",
    notes: "",
  });
  const [toReadBook, setToReadBook] = useState({
    title: "",
    author: "",
    date_added: "",
    notes: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  async function getBook() {
    try {
      const response = await fetch(`http://localhost:3000/books/read/${id}`);
      const data = await response.json();
      setReadBook(data);
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
          title: readBook.title,
          author: readBook.author,
          rating: readBook.rating,
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

    console.log(isRead);

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

    setReadBook((b) => ({
      ...b,
      [name]: value,
    }));
  }

  if (!readBook && !toReadBook) {
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
              value={readBook.title}
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
              value={readBook.author}
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
              value={readBook.rating}
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
