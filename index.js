require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const hbs = require('hbs');
const path = require('path');
const router = require('./routes/router')
const mongoConnect = require('./db/mongo')

const staticPath = path.join(__dirname, 'views');
app.use(express.static(staticPath));
const partialPath = path.join(__dirname, 'partials');
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'))
hbs.registerPartials(partialPath);

app.use(express.urlencoded({ extended: false }));
app.use('/', router)
app.use('/api/users', router)


hbs.registerHelper('eq', function (value1, value2, options) {
    return value1 === value2 ? options.fn(this) : options.inverse(this);
});

const start = async () => {
    // await mongoConnect("mongodb://127.0.0.1:27017/user")
    await mongoConnect(process.env.MONGODB_URL)
    app.listen(port, () => {
        console.log(`Server is listening at https://crud-app-kappa-one.vercel.app/`)
    })
}
start()