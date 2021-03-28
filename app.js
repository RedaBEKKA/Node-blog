const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Blog = require('./models/blog')


const dbURI = 'mongodb+srv://Bignova:test1234@cluster-clickcollect.hdblt.mongodb.net/nodetuts?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(result=>app.listen(3000))
    .catch(err=>console.log(err))



const morgan = require('morgan')
//register view engine
app.set('view engine','ejs')

//listen for request




//static & middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) //pour recuperer les données du form dans req.body
app.use(morgan('dev'))





app.get('/',(req,res)=>{
    //res.send('<p>Page Home</p>')
    //res.sendFile('./views/index.html',{root:__dirname})
    // const blogs=[
    //     {title:'BigNova coding',snippet:'Python,Java,Javascript,Golang'},
    //     {title:'BigNova Tawseel',snippet:'Python,Java,Javascript,Golang'},
    //     {title:'BigNova Tours',snippet:'JavaScript ES6,react js, node js , Express js'}
    // ]
    
    // res.render('index',{title:'Home',blogs})
    res.redirect('/blogs')

})

app.get('/about',(req,res)=>{
   
    //res.sendFile('./views/about.html',{root:__dirname})
    res.render('about',{title:'Apropos de nous'})
})

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('index',{title:'Tous les blogs',blogs:result})
        })
        .catch(err=>console.log(err))
})

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body)
    blog.save()
        .then(result=>{
            res.redirect('/blogs')
        })
        .catch(err=>console.log(err))
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Nouveau blog'})
})

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then(result=>{
            res.render('details',{blog:result,title:'Détails des blogs'})
        })
        .catch(err=>console.log(err))
})

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'}) //envoyer une reponse pour le navigateur
    })
    .catch(err=>console.log(err))
})

//redirects
// app.get('/about-us',(req,res)=>{
//     res.redirect('/about')
// })




//Error
app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{root:__dirname})
    res.status(404).render('404',{title:'404'})
})