const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Test endpoint
app.get("/", (_, res) => {
    res.send("Book Tracker API is running!");
});

app.get("/books/read", async (req, res) => {
    try {
        const [books] = await pool.query(
            "SELECT title, author, rating FROM books_read ORDER BY rating DESC;"
        );

        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch books"
        });
    }
});

app.get("/books/to-read", async (req, res) => {
    try {
        const [books] = await pool.query(
            "SELECT book_id, title, author, date_added FROM books_to_read ORDER BY date_added DESC;"
        );

        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch books"
        });
    }
});



app.post("/books/read", async (req, res) => {
    try {
        const { title, author, rating, date_finished, notes } = req.body;

        const [result] = await pool.query(
            `INSERT INTO books_read
             (title, user_id, author, rating, date_finished, notes)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, 3, author, rating ?? null, date_finished ?? null, notes ?? null]
        );

        res.status(201).json({
            message: "Book added successfully",
            book_id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to add book"
        });
    }
});

app.post("/books/to-read", async (req, res) => {
    try {
        const { title, author, notes } = req.body;

        const [result] = await pool.query(
            `INSERT INTO books_to_read
             (user_id, title, author, notes)
             VALUES (?, ?, ?, ?)`,
            [3, title, author, notes ?? null]
        );

        res.status(201).json({
            message: "Book added successfully",
            book_id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to add book"
        });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});