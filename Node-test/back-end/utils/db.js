const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/maoyan', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
const Users = mongoose.model('users', {
    username: String,
    password: String
})

const Cinemas = mongoose.model('cinema', {
    cinemaName: String,
    cinemaLocation: String,
    cinemaPhone: Number,
    cinemaServe1: String,
    cinemaServe2: String,
    cinemaServe3: String,
})
const MovieHost = mongoose.model('movieHost', {
    // movieName: String,
    // movieLocation: String,
    // moviePhone: Number,
    // movieServe1: String,
    // movieServe2: String,
    // movieServe3: String,
})

module.exports = {
    Users,
   Cinemas,
   MovieHost
}