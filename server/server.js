const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = require("./models");

// Routers
app.get('/health', (req, res) => {
    res.json({
        About: "API Server For Socials",
        Version: "1.0"
    })
})

const postRouter = require("./routes/posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/likes");
app.use("/likes", likesRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
})







