//mensagens
const Mensagem = require('./classes/Mensagens.js')
const mensagemEnviada = new Mensagem()
let enviarMensagem = false
//variaveis criadas

let nomePessoa;
let sair = true;
let redirect = false
//express
const Express = require('express')
const app = new Express()

//banco
const bancoDeDados = require('./models/banco')
const usuario = require('./models/usuarios')

//handlebars
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const { urlencoded } = require('express')

//classes
const Usuarios = require('./classes/Usuarios.js')
const UsuariosCadastro = new Usuarios()


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
const porta = 3000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.listen(porta, ()=>{
    console.log('ta rodando')
})
app.get('/', (req, res)=>{
    res.redirect(`http://localhost:${porta}/index`)
})
app.get('/index', (req, res)=>{
    if(enviarMensagem){
        res.render('index',{mensagem:`${mensagemEnviada.mensagemErroLogin1}`, sair:!sair}, enviarMensagem = false)
    }else{
        sair = true
        res.render('index',{ sair: !sair})
        
    }
    console.log(!sair)
})
app.get('/cadastrar', (req, res)=>{
    if(enviarMensagem){
        res.render('cadastro', { erro1:true, sair:!sair, mensagem: mensagemEnviada.mensagemErroCadastro2})
    }else{
        res.render('cadastro')
    }
    
})

app.get('/inicio', (req, res)=>{
    if(!sair && nomePessoa){
        res.render('telaInicial',{nome:`${nomePessoa}`, sair:!sair})
    }
    else{
        res.redirect(`http://localhost:${porta}/index`)
    }
})

app.get('/sair', (req, res)=>{
    console.log(`${nomePessoa} Saiu!`);
    sair = true
    enviarMensagem = false
    nomePessoa = null
    redirect = false
    res.redirect(`http://localhost:${porta}/`)
    
})

app.post('/enviar-cadastro', async (req, res)=>{
    let criar = false;
    Usuarios.nome = req.body.nome;
    Usuarios.email = req.body.email;
    Usuarios.senha = req.body.senha;
    Usuarios.cpf = req.body.cpf
    Usuarios.cep = req.body.cep;
    Usuarios.rua = req.body.rua;
    Usuarios.numero = req.body.numero;
    Usuarios.bairro = req.body.bairro;
    Usuarios.cidade = req.body.cidade;
    Usuarios.estado = req.body.estado;
    if(!req.body){
        criar = false
    }else{
        criar=true
    }
    console.log(Usuarios)
    console.log(req.body)
     if(criar){//!req.body.nome == null || typeof !req.body.nome == undefined || !req.body.nome == ""){
        const cadastrar = await usuario.create({
            nome:`${Usuarios.nome}`,
            email:`${Usuarios.email}`,
            senha:`${Usuarios.senha}`,
            cpf:`${Usuarios.cpf}`,
            rua:`${Usuarios.rua}`,
            numero:`${Usuarios.numero}`,
            cep:`${Usuarios.cep}`,
            bairro:`${Usuarios.bairro}`,
            cidade:`${Usuarios.cidade}`,
            estado:`${Usuarios.estado}`

        }).then(()=>{
            console.log("foi")
            
        }).catch(()=>{
            console.log("não foi")
        })
        res.redirect(`http://localhost:${porta}/index`)
        enviarMensagem = false
}else{
    console.log('NÃO FOI')
    enviarMensagem = true
    res.redirect(`http://localhost:${porta}/cadastrar`)
}
    
    
})

app.post('/logar', async(req, res)=>{
    const quantidadeCadastrados = await usuario.findAll()
    const email = req.body.email
    const senha = req.body.senha
    
    console.log(req.body)
    for(let i=0; i<quantidadeCadastrados.length; i++){
        const validador = await usuario.findByPk(i+1)
        if(validador.email==req.body.email && validador.senha == req.body.senha){
            nomePessoa = validador.nome, console.log(`${validador.nome}, dono do cpf ${validador.cpf} entoru!`),redirect = true, sair = false
            break;
        }
        
    }
    if(redirect){
        return enviarMensagem = false, res.redirect(`http://localhost:${porta}/inicio`)
    }else{
        return enviarMensagem = true, res.redirect(`http://localhost:${porta}/index`), sair = true
    }
})
function atualizarTabela(){

    (async ()=>{
        await bancoDeDados.sync()
     })()
}




atualizarTabela()

