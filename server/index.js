require('dotenv').config()

try{
    if(process.env.PORT){
        console.log("PORT is " + process.env.PORT)
    }
    else{ 
        process.exit() 
    }
}
catch(err){  
    process.exit() 
}


const {sequelize}= require('./models')
const cors = require('cors')
const express = require('express')
const path = require('path')
const app = express()
app.use(express.urlencoded({ extended: false }));

app.use(express.json())
// app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use("/uploads", express.static("uploads"))

app.use("/api", require('./routes'))


app.listen({port: process.env.PORT}, async () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
    try {
        await sequelize.authenticate();
        console.log('Database connection stablish');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})
