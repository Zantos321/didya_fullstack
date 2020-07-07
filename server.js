const express = require("express");
const app = express();

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/tasks", require("./api/v1/tasks"));
app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 1985;

app.listen(port, () =>
   console.log(`Example app listening at http://localhost:${port}`)
);
