//mensagens
const Mensagem = require('./classes/Mensagens.js')
const mensagemEnviada = new Mensagem()
let enviarMensagem = false
//variaveis criadas
let corpo
let nomePessoa;
let sobrenomePessoa
let cpfPessoa;
let enderecoPessoa;
let cepPessoa;
let emailPessoa;
let sair = true;
let redirect = false
let logar = false
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
const usuarioObjeto= new Usuarios()


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
    if(!(typeof usuarioObjeto.erro == undefined)){
        res.render('cadastro', { erro:true, sair:!sair, mensagem: usuarioObjeto.erro})
        usuarioObjeto.erro = null;
    }else{
        res.render('cadastro')
    }
    console.log(usuarioObjeto.erro)
    
})

app.get('/inicio', (req, res)=>{
    if(!sair && nomePessoa){
        res.render('telaInicial',{nome:`${nomePessoa}`, sair:!sair, logar: logar})
    }
    else{
        res.redirect(`http://localhost:${porta}/index`)
    }
})

app.get('/sair', (req, res)=>{
    console.log(`${nomePessoa} Saiu!`);
    sair = true
    enviarMensagem = false
    cpfPessoa = null
    enderecoPessoa = null
    cepPessoa = null
    emailPessoa = null
    nomePessoa = null
    redirect = false
    sobrenomePessoa = null
    res.redirect(`http://localhost:${porta}/`)
    
})

app.post('/enviar-cadastro', async (req, res)=>{
    usuarioObjeto.verificar(req.body)
    
    console.log(typeof corpo)
    
    
    if(usuarioObjeto.confirmar){ 
        usuarioObjeto.cadastrar(usuarioObjeto.confirmar, usuarioObjeto)
        console.log(usuarioObjeto)
        res.redirect(`http://localhost:${porta}/index`)
    }
    else{
        res.redirect(`http://localhost:${porta}/cadastrar`)
    }
    console.log(req.body)
     
    
    
})

app.post('/logar', async(req, res)=>{
    const quantidadeCadastrados = await usuario.findAll()
    const email = req.body.email
    const senha = req.body.senha

    console.log(req.body)
    for(let i=0; i<quantidadeCadastrados.length; i++){
        const validador = await usuario.findByPk(i+1)
        if(validador.email==req.body.email && validador.senha == req.body.senha){
            nomePessoa = validador.nome
            cpfPessoa = validador.cpf
            enderecoPessoa = (validador.rua + "," + validador.numero + "," + validador.bairro + "," + validador.cidade + "," + validador.estado)
            cepPessoa = validador.cep;
            emailPessoa = validador.email;
            sobrenomePessoa = validador.sobrenome;
            console.log(`${validador.nome}, dono do cpf ${validador.cpf} entoru!`)
            redirect = true
            sair = false
            logar = true;
            break;
        }
     
    }
    if(redirect){
        return enviarMensagem = false, res.redirect(`http://localhost:${porta}/inicio`)
    }else{
        return enviarMensagem = true, res.redirect(`http://localhost:${porta}/index`), sair = true
    }
})
app.get('/perfil', (req, res)=>{
    
    if(!sair){
        res.render('perfil',{
            nomePessoaLogada: nomePessoa,
            emailPessoaLogada: emailPessoa,
            cpf: cpfPessoa,
            cep: cepPessoa,
            endereco: enderecoPessoa,
            sobrenome: sobrenomePessoa,
            nome: nomePessoa,
            sair:true,
            logar: logar
        })
    }
    else{
        res.redirect('/index')
    }
})

app.post('/modificar',async (req, res)=>{
    const {nome, sobrenome, email} = req.body
    
    usuario.update({nome, sobrenome, email},{
        where:{cpf: cpfPessoa, nome: nomePessoa, email: emailPessoa}
    })
    
    emailPessoa = req.body.email;
    nomePessoa = req.body.nome;
    sobrenomePessoa =req.body.sobrenome
    res.redirect(`http://localhost:${porta}/perfil`)
})

function atualizarTabela(){

    (async ()=>{
        await bancoDeDados.sync()
     })()
}




atualizarTabela()

