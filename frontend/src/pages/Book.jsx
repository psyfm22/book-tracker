import { useParams } from "react-router";
import { useEffect, useState } from "react";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState();

  async function getBook() {
    console.log("Here now");
    try {
      const response = await fetch(`http://localhost:3000/books/read/${id}`);
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Could not Find book to the server");
    }
  }

  useEffect(() => {
    //This is to protect if there isn't an id in the params
    if (id) {
      getBook();
    }
  }, [id]);

  if (book) {
    <div>
      <h1> Book</h1>
      <div>
        <h2>{book.title}</h2>
        <h2>{book.author}</h2>
        <h2>{book.rating}</h2>
        <h2>{book.date_finished}</h2>
        <h2>{book.notes}</h2>
      </div>
    </div>;
  } else {
    <div>
      <h1>Book Loading...</h1>
    </div>;
  }

  return (
    <div>
      <h1> Book</h1>
      {book && (
        <div>
          <h2>{book.title}</h2>
          <h2>{book.author}</h2>
          <h2>{book.rating}</h2>
          <h2>{book.date_finished}</h2>
          <h2>{book.notes}</h2>
        </div>
      )}
    </div>
  );
}

export default Book;
