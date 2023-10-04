const express = require('express')
const server= express()
const mongoose = require('mongoose')
main().catch(err=>console.log(err))

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/starkmart")
    console.log('database connected')
}
server.get('/',(req,res)=>{
    res.json({success:'success'})
})
server.listen(8080,()=>{
    console.log("server is running at port 8080")
})