import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import model from './models/User.js';
import ConnectedToDB from './configs/app.js';
import pkg from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import 'dotenv/config'

const app = express();

app.use(bodyParser.json());
app.use(cors());

const { hash, compare } = pkg;

app.post("/api/user/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (password.length < 6) {
        return res.status(422).send({ messgae: "Have a password of at least 6 characters !" });
    }

    const isUserExit = await model.findOne({ $or: [{ username }, { email }] });

    if (isUserExit) {
        return res.status(422).send({ messgae: "This username or email exists !" });
    }

    const passwordHashed = await hash(password, 12);

    const generatedToken = jwt.sign({ identifier: username }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });

    await model.create({ username, email, password: passwordHashed });

    return res.setHeader("Set-Cookie", serialize("token", generatedToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 24 * 24
    })).status(201).send({ messgae: "successfully" })
})

app.post("/api/user/login", async (req, res) => {
    const { identifier, password } = req.body;

    if (password.length < 6) {
        return res.status(422).send({ messgae: "Have a password of at least 6 characters !" });
    }

    const isUserExit = await model.findOne({ $or: [{ username: identifier }, { email: identifier }] });

    if (!isUserExit) {
        return res.status(422).send({ messgae: "This username or email does not exists !" });
    }

    const verifyPassword = await compare(password, isUserExit.password);

    if (!verifyPassword) {
        return res.status(422).json({ message: "Wrong in verify password !" });
    }

    const generatedToken = jwt.sign({ identifier: isUserExit.username }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });

    return res.setHeader("Set-Cookie", serialize("token", generatedToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 24 * 24
    })).status(201).send({ messgae: "successfully" })
})

app.get("/api/user/logout", async (req, res) => {
    res.setHeader("Set-Cookie", serialize("token", "", {
        path: '/',
        maxAge: 0
    })).status(200).send({ messgae: "successfully" })
})

app.listen(3000, () => {
    console.log("connected to server on port 3000");
    ConnectedToDB();
})