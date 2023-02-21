const mazeSolver=require("./mazeSolver.js")
const express=require("express")
const fs=require("fs");
const app=express();
app.get("/",(req,res)=>
{
    res.end(fs.readFileSync("index.html"));
})
app.get("/solve",(req,res)=>
{
    let start={x:1,y:5};
    let end={x:39,y:29};
    mazeSolver("maze.png",30,41,start,end).then(arr=>
        {
            console.log("response to be sent")
            arr.push(start);
            arr.push(end);
            res.status(200).json(JSON.stringify(arr));
        })
})
app.listen(5000,()=>
{
    console.log("App running on port 5000")
})