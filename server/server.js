const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const logEntries = require("./routes/entries");

require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB")
);

const middlewares = require("./middleware");

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Heyyyyy" });
});
app.use("/entries", logEntries);

app.use(middlewares.error);
app.use(middlewares.handlingErrors);

//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
