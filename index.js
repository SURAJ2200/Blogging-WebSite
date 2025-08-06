const express =require("express");
const app = express();
app.use(express.json())
const port = process.env.PORT || 4000;
const path = require("path");
const methodOverride =require("method-override")
const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride('_method'))


let posts = [
  {
    "id": uuidv4(),
    "title": "Getting Started with JavaScript",
    "author": "Suraj Mishra",
    "content": "JavaScript is a versatile language used for both front-end and back-end development...",
    "date": "2025-07-25",
    "tags": ["JavaScript", "Programming", "WebDev"],
    "likes": 102
  },
  {
    "id": uuidv4(),
    "title": "Understanding REST APIs",
    "author": "Ayesha Khan",
    "content": "REST APIs allow systems to communicate over HTTP. Let's understand the key principles...",
    "date": "2025-07-26",
    "tags": ["API", "REST", "Backend"],
    "likes": 88
  },
  {
    "id": uuidv4(),
    "title": "Dark Mode in JavaScript: How To",
    "author": "Ravi Patel",
    "content": "Dark mode is popular. You can toggle themes using a simple JavaScript function...",
    "date": "2025-07-27",
    "tags": ["JavaScript", "UI", "Theme"],
    "likes": 70
  },
  {
    "id":uuidv4(),
    "title": "How to Create a Blog without a Database",
    "author": "Suraj Mishra",
    "content": "You can store blog data in JSON files or use localStorage for simple blog apps...",
    "date": "2025-07-27",
    "tags": ["Blog", "NoDB", "Frontend"],
    "likes": 59
  },
  {
    "id": uuidv4(),
    "title": "CSS Grid vs Flexbox",
    "author": "Neha Singh",
    "content": "Both CSS Grid and Flexbox are powerful layout tools. Here’s how they differ...",
    "date": "2025-07-28",
    "tags": ["CSS", "Design", "Frontend"],
    "likes": 95
  },
  {
    "id": uuidv4(),
    "title": "Deploying a Node.js App on Render",
    "author": "Rohit Verma",
    "content": "Render is a great option to host your full-stack apps. Learn how to deploy step by step...",
    "date": "2025-07-29",
    "tags": ["Node.js", "Deploy", "DevOps"],
    "likes": 64
  },
  {
    "id": uuidv4(),
    "title": "Introduction to MongoDB",
    "author": "Suraj Mishra",
    "content": "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents...",
    "date": "2025-07-29",
    "tags": ["MongoDB", "Database", "Backend"],
    "likes": 80
  },
  {
    "id": uuidv4(),
    "title": "Why Learn Git and GitHub",
    "author": "Anjali Mehta",
    "content": "Version control is essential for developers. Git and GitHub are tools you must know...",
    "date": "2025-07-30",
    "tags": ["Git", "GitHub", "VersionControl"],
    "likes": 110
  },
  {
    "id": uuidv4(),
    "title": "How to Improve Website Performance",
    "author": "Karan Desai",
    "content": "Optimizing assets, lazy loading, and code splitting are some techniques to improve speed...Optimizing assets, lazy loading, and code splitting are some techniques to improve speed...Optimizing assets, lazy loading, and code splitting are some techniques to improve speed...Optimizing assets, lazy loading, and code splitting are some techniques to improve speed...Optimizing assets, lazy loading, and code splitting are some techniques to improve speed...",
    "date": "2025-07-30",
    "tags": ["Performance", "Web", "Optimization"],
    "likes": 73
  },
  {
    "id": uuidv4(),
    "title": "Top 5 VSCode Extensions for Web Developers",
    "author": "Meena Rao",
    "content": "These extensions can enhance productivity while working on web projects...",
    "date": "2025-07-31",
    "tags": ["VSCode", "Tools", "Productivity"],
    "likes": 120
  }
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
  let {title,author,content,date,tags,likes} = req.body;
  let id  = uuidv4()
   posts.push({title,author,content,date,tags,likes})
    res.redirect("/posts")
})

app.get("/posts/:id/",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=>id===p.id)
  console.log(post)
  res.render("show.ejs",{post})

})

app.patch("/posts/:id",(req,res)=>{
   let {id} = req.params;
   let newContent = req.body.content;
   let newTitle = req.body.title;
   let newAuthor = req.body.author;
   let newTags = req.body.tags;
   let newDate = req.body.date;
   let newLikes= req.body.likes;
   let post = posts.find((p)=>id==p.id)
   post.content = newContent
   post.title = newTitle
   post.author = newAuthor
   post.tags = newTags
   post.date = newDate
   post.likes = newLikes
   console.log(post)
    res.redirect("/posts")
     
})
 
app.get("/posts/:id/edit",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=>id===p.id)
  
  res.render("edit.ejs",{post})

})




app.delete("/posts/:id",(req,res)=>{
  let {id} = req.params;
  posts = posts.filter((p)=>id!==p.id)
  res.redirect("/posts")
})
app.get("/", (req, res) => {
  res.redirect("/posts");  
});
    


app.listen(port,()=>{
    console.log(`app listen on port ${port}`)
})
