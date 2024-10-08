import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


let username = "";
let password = "";
let userEmail = "";

// Properly set __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'dist' directory (including the assets folder)
app.use(express.static(join(__dirname, "dist")));

// Serve the index.html file from the dist directory
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "dist", "index.html"));
});


app.post("/register", (req, res) => {
    console.log(req.body);
    username = req.body.username;
    userEmail = req.body.email;
    password = req.body.password;
    res.sendFile(join(__dirname, "dist", "index.html")); //client side routing takes over
})

app.post("/login", (req, res) => {
    console.log(req.body);
    if (username == req.body.username && password == req.body.password) {
        res.sendStatus(201);
    }
    else {
        console.log("username or password doesn't match")
        res.sendStatus(401);
    }
})

// Proxy endpoint to fetch random paragraph
app.get("/api/proxy", async (req, res) => {
    try {
        const response = await axios.get("http://metaphorpsum.com/paragraphs/1/6");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

//catch-all route for any unknown paths
app.get("*", (req, res) => {

    res.sendFile(join(__dirname, "dist", "index.html"));
})

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
