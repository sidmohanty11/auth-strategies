import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.send("<h1>hi</h1>");
});

app.listen(8000, () => {
  console.log("listening at PORT ", 8000);
});
