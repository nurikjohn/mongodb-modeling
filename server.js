const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
).replace('<USERNAME>', process.env.DATABASE_USERNAME);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('\x1b[35mDatabase connection successful \x1b[0m'));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`\x1b[35mApp running on port ${port} \x1b[0m`);
});
