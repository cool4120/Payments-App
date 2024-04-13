const express = require("express");
const cors = require('cors');
const app = express();

const mainRouter = require('./routes/index')
app.use(cors())
app.use(express.json())
app.use('/api/v1',mainRouter);
// console.log(`INDEX>JS`)
app.listen(3000,() => {
    console.log(`Server Running`)
});

