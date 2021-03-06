const mongoose = require('mongoose')
const schema = mongoose.Schema;

const blogSchema = new schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }


},{timestamps:true}) //il crée created at , updated-at

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog