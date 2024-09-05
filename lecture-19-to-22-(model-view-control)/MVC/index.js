const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = 9000;

connectDB();

app.set('view engine', 'ejs')
app.use(express.urlencoded())


app.use('/', require('./routes/indexRoute'))


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;

    }
    console.log(`Server is running on port ${port}`)
})