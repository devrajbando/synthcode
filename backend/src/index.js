import {app} from './app.js'

import dotenv from 'dotenv'
import connectDB from './db/index.js'
    
    dotenv.config()
    

    const port = process.env.PORT || 8000;
    
    console.log('hello')
    
    connectDB()
    .then(()=>{
        app.listen(port,()=>{
            console.log(`server is running at port ${port}`)
        })
    })
    .catch(err=>{
        console.log("mongoDB connection failed",err)
    })
    