const mongoose = require('mongoose');

const MONGO = process.env.MONGODB_URI;

mongoose.connect(MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch((err) => console.log(err))