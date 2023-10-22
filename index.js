// SERVIDOR
const express = require('express');
const app = express();


const Post = require('./models/Post');

var sql = require('./models/db.js')



// BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Config
    // Template Engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine({defaultLayout: "main", runtimeOptions: {
    allowProtoPropertiesByDefault: true,

    allowProtoMethodsByDefault: true,
}
}));
app.set('view engine', 'handlebars');   

//Rotas
app.get('/', function(req,res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts})
    })
})
app.get('/cadastro', function(req,res){
    res.render('formulario');
})
app.post('/recebido', function(req,res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/');
    }).catch(function(error){
        res.send('Deu erro: ' + error)
    })
})

app.get('/deletar/:id', function(req,res){
    Post.destroy({where: {'id' : req.params.id}}).then(function(){
        res.send('excluido com sucesso');
    }).catch(function(error){
        res.send('DEU FALHA' + error)
    })
})

app.listen(8080, function(){
    console.log('Servidor rodando na url:  http://localhost:8080 ')
});

