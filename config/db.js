const mongoose = require('mongoose')
const colors = require('colors')

const connectDb =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to mongoose database ${mongoose.connection.host}`.bgGreen.white)

    }
    catch(error){
        console.log(`mongoDb Database Error ${error}`.bgRed.white)

    }
}
module.exports= connectDb