const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')


connectToMongo();

const app = express()
const port = 5000

//help in middleware
app.use(cors())
app.use(express.json());

// Available Routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


app.listen(port, () => {
  console.log(`iNotebook app backend listening on port http://localhost:${port}`)
})