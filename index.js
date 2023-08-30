const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Scifi" },
  { id: 3, name: "Thriller" },
  { id: 4, name: "Romantic" },
];

app.get("/api/genres", (req, res) => {
  res.send(genres.map((genre) => genre.name));
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let genre = genres.find((c) => c.id === parseInt(req.params.id));
  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  let genre = genres.find((g) => g.id === parseInt(req.params.id));
  let index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The requested genres was not found");
  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(genre);
}

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
