import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import BooksRead from "./pages/BooksRead";
import ToRead from "./pages/ToRead";
import AddBook from "./pages/AddBook";
import Book from "./pages/Book";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/read">Read Books</Link>
        {" | "}
        <Link to="/to-read">To Read</Link>
        {" | "}
        <Link to="/add-book">Add Book</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read" element={<BooksRead />} />
        <Route path="/to-read" element={<ToRead />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/read/:id" element={<Book />} />
        <Route path="/to-read/:id" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
