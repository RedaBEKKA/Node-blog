const http = require('http');
const fs = require('fs');
const _ = require('lodash')
const server = http.createServer((req,res)=>{
    //lodash

    const num = _.random(0,20)
    console.log(num)

    const greet = _.once(() =>{
        console.log("hello")
    })
    greet()
    greet()
    
    //set header content type
    // res.setHeader('Content-Type','text/html');
    // res.write('<h1>Node js </h1>')
    // res.write('<p>Azul Reda !</p>')
    // res.end()

    res.setHeader('Content-Type','text/html');
    let path= './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-us':            
            res.statusCode = 301 //redireger vers un autre route
            res.setHeader('Location','/about')
            res.end()
            break
        default:
            path +='404.html'
            res.statusCode = 404
            break
    }

    fs.readFile(path,(err,data)=>{
        if (err) {
            console.log(err)
            res.end()
        }
        else{
           // res.write(data);
           
            res.end(data) //si on envoie bcp de reponses on utilise res.write
        }
    });
});


server.listen(3001,'localhost',()=>{
    console.log("Listening for host on 3000")
})