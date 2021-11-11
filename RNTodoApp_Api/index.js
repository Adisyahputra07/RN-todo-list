const express = require("express");
const cors = require("cors");
const app = express();

const port = 4010;

const router = require("./src/routes");

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

app.listen(port, () => console.log(`Listening on port ${port}!`));
