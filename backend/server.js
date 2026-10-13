const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

 app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});