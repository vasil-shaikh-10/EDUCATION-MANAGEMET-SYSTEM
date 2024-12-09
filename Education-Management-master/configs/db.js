const mongoose = require('mongoose')
require('dotenv').config()
const DatabaseConnect = async() =>{
    try {
        console.log(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Data Base Connect...")
    } catch (error) {
        console.log("Database Connect error")
    }
}

module.exports = DatabaseConnect