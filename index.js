const express=require("express");
const app=express();
const path =require("path");
app.use(express.urlencoded({extended:true}));

const port=8080;

app.listen(port,() =>{
    console.log("listening");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));


let posts = [
    {
        username:"apnacollege",
        content:"i love coding"
    },
    {
        username:"gps",
        content:"i go to college"
    },
    {
        username:"ayush",
        content:"i am a boy"
    },
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=> {
    res.render("newpost.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    posts.push({username,content});
    console.log(req.body);
    res.redirect("/posts");
})