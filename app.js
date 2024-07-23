const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Sorry, we cannot find that!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
