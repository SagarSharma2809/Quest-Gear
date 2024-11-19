import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import axios from "axios";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import { dirname, join } from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Properly set __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

const saltRounds = 10;

// connecting to DB 
const db = new pg.Client({
    user: process.env.DB_USER_SUPABASE,
    host: process.env.DB_HOST_SUPABASE,
    database: 'postgres',
    password: process.env.DB_PASSWORD_SUPABASE,
    port: 6543
})


db.connect();

//dummy userData
let userData = [{ "id": 2, "username": "Joy", "email": "helloHi@gmail.com", "pass": "ballbatball" }]

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


// Serve static files **only in production**
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, "dist")));
}

const checkToken = (req, res, next) => {
    const userToken = req.cookies.token;
    if (userToken) {
        jwt.verify(userToken, process.env.JWT_SECRET, (err, authorizedData) => {
            if (err) {
                console.log(err, 'could not connect to the protected route');
                res.status(403).json({ message: "Invalid token" });
            } else {
                //token verified successfully

                req.authorizedData = authorizedData;
                next();
            }
        });

    }
    else {
        //if header is undefined, return 403    
        res.sendStatus(403);
    }
}

app.get("/home/user", checkToken, async (req, res) => {
    const { UserId } = req.authorizedData;
    console.log("Connected to protected route");
    try {
        const results = await db.query("SELECT * FROM users WHERE id = $1", [UserId]);

        const data = {
            "email": results.rows[0].email,
            "username": results.rows[0].username
        }

        if (results.rows.length > 0) {
            res.json({
                message: "Successful log in",
                userData: data
            })
        }
        else {
            console.log("User doesn't exist with this id");
        }

    }
    catch (e) {
        console.log(e, "error in quering user data from cookie");
    }

})


app.get('/logout', (req, res) => {

    res.clearCookie('token');
    res.status(201).json({ message: "success logout" });
})


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


                        res.status(201).cookie('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                            maxAge: 7 * 24 * 60 * 60 * 1000   //cookie valid for 7 days
                        }).json({ message: "success" })

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
