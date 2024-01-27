const express = require("express");
const cors = require("cors");
const { routes } = require("./Routes/index.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes());
app.listen(4000, () => {
  console.log(`server is live on 4000`);
});
