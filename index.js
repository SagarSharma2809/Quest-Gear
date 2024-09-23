import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Properly set __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'dist' directory (including the assets folder)
app.use(express.static(join(__dirname, "dist")));

// Serve the index.html file from the dist directory
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "dist", "index.html"));
});

// app.post("/Signup", (req, res)=>{

// })

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
