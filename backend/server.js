const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

 app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
    res.send("Book Tracker API is running!");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});