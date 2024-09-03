const express = require('express')


const connectDb = require('./config/db')

const port = 8000;

const app = express();

app.set('view engine', 'ejs')

connectDb();

app.use(express.urlencoded())

app.use('/', require('./routes/indexRoutes'))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is start on port number${port}`);

})
