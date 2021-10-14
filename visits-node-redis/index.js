const express = require('express')
const redis = require('redis')

const app = express()
const client = redis.createClient({
  host:'redis-server',
  port:6379 //optional since it default, like mongo's 27017
})

client.on("error", function(error) {
  console.error(error);
});

client.set('visits',0)


app.get("/",(req,res)=>{
  client.get('visits',(err,visits)=>{
    if(!err){
      res.send(`Number of visits is ${visits}`)
      client.set('visits',parseInt(visits) + 1)
    }
  })
})

const PORT = 3000
app.listen(PORT,()=>{
  console.log(`Node running on port ${PORT}`)
})