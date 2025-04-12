const express=require("express");
const app=express();
const path =require("path");
app.use(express.urlencoded({extended:true}));

const {v4:uuidv4}=require('uuid');
const methodoverride=require("method-override");
const port=8080;

app.use(methodoverride('_method'))
app.listen(port,() =>{
    console.log("listening");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));


let posts = [
    {   id:uuidv4(),
        username:"apnacollege",
        content:"i love coding"
    },
    {   id:uuidv4(),
        username:"gps",
        content:"i go to college"
    },
    {   id:uuidv4(),
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
    let id=uuidv4();
    posts.push({id,username,content});
    console.log(req.body);
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) =>id===p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newcontent=req.body.content;
    let post =posts.find((p)=> id===p.id);
    post.content=newcontent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post =posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
    
})
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts =posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
})