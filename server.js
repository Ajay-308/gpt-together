const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
//routes path
const authRoutes = require("./routes/authRoutes.js");
const errorHandler = require("./middleware/errorMiddleware.js");

dotenv.config();

connectDB();

//rest object
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extension: false }));
app.use(errorHandler);

app.use(morgan("dev"));

const PORT = process.env.PORT || 8000;
//routes
app.use("/api/v1/auth", authRoutes);
//listen
app.listen(8000, () => {
  console.log(
    `server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
