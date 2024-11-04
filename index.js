import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import axios from "axios";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import cors from "cors";
import jwt from "jsonwebtoken"
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import data from "autoprefixer";


dotenv.config();

const dbPassword = process.env.DB_PASSWORD

// Properly set __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

const saltRounds = 10;

//connecting to DB 
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "QuestGear",
    password: dbPassword,
    port: 5432
})

db.connect();

//dummy userData
let userData = [{ "id": 2, "username": "Joy", "email": "helloHi@gmail.com", "pass": "ballbatball" }]

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files **only in production**
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, "dist")));

}

app.post("/register", async (req, res) => {
    console.log(req.body);
    const { username, email, pass } = req.body;
    try {
        const checkResults = await db.query("SELECT * FROM users WHERE email = $1;", [email]);

        if (checkResults.rows.length > 0) {
            res.status(409).send("Email already exists. Try loggin in. ");
        }
        else {
            //hashing the password and saving it in the database
            bcrypt.hash(pass, saltRounds, (err, hash) => {
                if (err) {
                    console.log("Error hashing password:", err);
                }
                else {
                    console.log("Hashed Password:", hash);
                    const query = `INSERT INTO users (username, email, pass) VALUES($1, $2, $3);`
                    const values = [username, email, hash];
                    db.query(query, values, (err, result) => {
                        if (err) {
                            console.error("Error executing query", err.stack);
                            res.status(500).send("Error creating account");
                        }
                        else {
                            console.log("User inserted successfully");
                            res.status(201).send("Account created successfully");
                        }
                    })
                }
            })

        }

    }
    catch (err) {
        console.log(err);
    }

})

app.post("/api/login", async (req, res) => {
    const { username, pass } = req.body;

    try {
        const checkResults = await db.query("SELECT * FROM users WHERE username = $1;", [username]);

        if (checkResults.rows.length > 0) {
            //username exists so check password
            const user = checkResults.rows[0];
            const storedPassword = user.pass;


            //verifying the password
            bcrypt.compare(pass, storedPassword, (err, result) => {

                if (err) {
                    console.log("Error comparing passwords:", err);
                }
                else {

                    if (result) {
                        //generate jwt token
                        const token = jwt.sign(
                            { UserId: user.id, Username: user.username }, //payload
                            process.env.JWT_SECRET,   //secret key to sign the token
                            { expiresIn: process.env.JWT_EXPIRES_IN }
                        )


                        res.status(201).json({
                            status: 'success',
                            token,
                            data: {
                                user
                            },
                        })



                    }
                    else {
                        console.log("username or password is incorrect");
                        res.sendStatus(401);
                    }
                }
            })
        }
        else {
            console.log("username or password is incorrect");
            res.sendStatus(401);
        }

    }
    catch (err) {
        console.log(err);
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
