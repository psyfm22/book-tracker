import { Link } from "react-router";

function Home() {
  return (
    <div>
      <h1>My Book Tracker</h1>
      <p>Welcome to your book tracker.</p>
      <Link to="/read">
        <button>View Books Read</button>{" "}
      </Link>

      <Link to="/to-read">
        <button>View Books To Read List</button>{" "}
      </Link>
    </div>
  );
}

export default Home;
