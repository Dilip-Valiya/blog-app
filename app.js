import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [
  {
    title: "Project Description",
    content:
      "The goal of this project is to create a Blog web application using Node.js, Express.js, and EJS. The application will allow users to create and view blog posts. Posts will not persist between sessions as no database will be used in this version of the application.",
  },
];

app.get("/", (req, res) => {
  res.render("home", { posts: posts });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = req.params.postName.toLowerCase();

  posts.forEach((post) => {
    const storedTitle = post.title.toLowerCase();
    if (storedTitle === requestedTitle) {
      res.render("post", { title: post.title, content: post.content });
    }
  });

  res.render("post", { title: "404", content: "No Post found!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
