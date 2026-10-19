import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import BooksRead from "./pages/BooksRead";
import ToRead from "./pages/ToRead";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/read">Read Books</Link>
        {" | "}
        <Link to="/to-read">To Read</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read" element={<BooksRead />} />
        <Route path="/to-read" element={<ToRead />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
