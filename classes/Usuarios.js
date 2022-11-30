const DB = require('../models/banco')
const USER = require('../models/usuarios')
const MSG = require('./Mensagens')

const mensagemErro= new MSG()

class Usuarios{
    _nome;
    _sobrenome;
    _email;
    _senha;
    _cpf;
    _rua;
    _numero;
    _bairro;
    _cidade;
    _estado;
    _cep;
    _confirmar;

    erro;
    validador = []

    get confirmar(){
        return this._confirmar
    }
    set confirmar(valor){
        this._confirmar = valor;
    }
    get nome(){
        return this._nome
    }
    set nome(valor){
        const caracteres = "123456789!@#$%¨&*()_+{`^}?:><,.;/~][=-¹²³£¢¬°´";
        for(let i = 0; i < caracteres.length; i++){
            for(let j = 0; j< valor.length; j++){
                if(valor[j]==caracteres[i]){
                    this.validador.push(false);
                    return;
                }
            }
        }
        this._nome = valor;
        this.validador.push(true);
    }
    get sobrenome(){
        return this._sobrenome;
    }
    set sobrenome(valor){
        let caracteres = "123456789!@#$%¨&*()_+{`^}?:><,.;/~][=-¹²³£¢¬°´";
        for(let i = 0; i < caracteres.length; i++){
            for(let j = 0; j< valor.length; j++){
                if(valor[j]==caracteres[i]){
                    this.validador.push(false)
                    return;
                }
            }
        }
        this._sobrenome = valor;
        this.validador.push(true);
    }
    get email(){
        return this._email;

    }
    set email(valor){
        if(typeof valor == undefined || valor ==""){
            this.validador.push(false);
            return;
        }
        this.validador.push(true);
        this._email = valor
    }
    get senha(){
        return this._senha;
    }
    set senha(valor){
        if(typeof valor == undefined || valor ==""){
            this.validador.push(false);
            return;
        }
        this.validador.push(true);
        this._senha = valor
    }

    get cpf(){
        return this._cpf;
    }
    set cpf(valor){
        if(typeof valor == undefined || valor ==""){
            this.validador.push(false);
            return;
        }
        for(let i =0; i<valor.length; i++){
            const letras ="!@#$%¨&*()_+{}?:><MNBVCXZ|AQWERTYUIOPÇ^`LKJHGFDSA¹²³£¢¬§ªº°°?₢mnbvzxcasdqwertypoiuyçlkjhgf";
            for(let j =0; j<letras.length; j++){
                if(valor[i]==letras[j]){
                    this.validador.push(false);
                }
            }
        }
        this.validador.push(true);
        this._cpf = valor
    }

    get rua(){
        return this._rua;
    }
    set rua(valor){
        if(typeof valor == undefined || valor ==""){
            this.validador.push(false);
            return;
        }
        this.validador.push(true);
        this._rua = valor
    }
    get numero(){
        return this._numero;
    }
    set numero(valor){
        if(typeof valor == undefined || valor ==""){
            this.validador.push(false);
            return;
        }
        this.validador.push(true);
        this._numero = valor
    }

    get bairro(){
        return this._bairro;
    }
    set bairro(valor){
        if(typeof valor == undefined || valor ==""){
            this.validador.push(false);
            return;
        }
        this.validador.push(true);
        this._bairro = valor
    }

    get cidade(){
        return this._cidade;
    }
    set cidade(valor){
        if(typeof valor == undefined || valor ==""){
            this.validador.push(false);
            return;
        }
        this.validador.push(true);
        this._cidade = valor
    }

    get estado(){
        return this._estado;
    }
    set estado(valor){
        if(typeof valor == undefined || valor ==""){
            this.validador.push(false);
            return;
        }
        this.validador.push(true);
        this._estado = valor
    }

    get cep(){
        return this._cep
    }
    set cep(valor){
        if(typeof valor == undefined){
            this.validador.push(false);
        }
        this.validador.push(true);
        this._cep = valor;
    }
    
    

    
    cadastrar(feito, corpo){

        const cadastrar = async function(){
            if(feito){
                const cadastrar = await USER.create({
                    nome: `${corpo._nome}`,
                    sobrenome:`${corpo._sobrenome}`,
                    email:`${corpo._email}`,
                    senha:`${corpo._senha}`,
                    cpf:`${corpo._cpf}`,
                    rua:`${corpo._rua}`,
                    numero:`${corpo._numero}`,
                    cep:`${corpo._cep}`,
                    bairro:`${corpo._bairro}`,
                    cidade:`${corpo._cidade}`,
                    estado:`${corpo._estado}`
        
                }).then(()=>{
                    console.log("foi")
                    
                }).catch(()=>{
                    console.log("não foi")
                    this.confirmar = false;
                })
            }
        }
        cadastrar()
        this.confirmar = false;
        
    }
    

    verificar(body){
        
        this.validador.length = 0;
        this.nome = body.nome;
        this.sobrenome = body.sobrenome;
        this.email = body.email;
        this.senha = body.senha
        this.cpf = body.cpf;
        this.rua = body.rua;
        this.numero = body.numero;
        this.bairro = body.bairro;
        this.cidade = body.cidade;
        this.estado = body.estado;
        this.cep = body.cep;
        this.confirmar = true;
        //const verificar = async()=>{
        //     const cpfUser = this.cpf
        //     const emailUser = this.email
        //     const contador = await USER.findAll()
        //     if(cpfUser != null){
        //     for(let i = 0; i<= contador.length; i++){
        //         const visualizador = await USER.findByPk(i+1)
        //         if(visualizador.cpf == cpfUser){
        //             this.erro = mensagemErro.mensagemErroCPF
        //             this.confirmar = false;
        //             return
        //         }
        //     }}
        //     if(emailUser != null ){
        //     for(let i = 0; i<= contador.length; i++){
        //         const visualizador = await USER.findByPk(i+1)
        //         if(visualizador.email == emailUser){
        //             this.erro = mensagemErro.mensagemErroEMAIL
        //             this.confirmar = false;
        //             return
        //         }
        //     }}
        //     
        // }
        // verificar()
        for(let i =0; i< this.validador.length; i++){
            if(this.validador[i] == false){
                switch(i){
                    case 0: return this.confirmar = false, this.erro = mensagemErro.mensagemErroCadastro2; break;
                    case 1: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro3; break;
                    case 2: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro4; break;
                    case 3: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro5; break;
                    case 4: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro6; break;
                    case 5: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro7; break;
                    case 6: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro8; break;
                    case 7: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro9; break;
                    case 8: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro10; break;
                    case 9: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro11; break;
                    case 10: return this.confirmar = false, this.erro =  mensagemErro.mensagemErroCadastro12; break;
                    default: return this.confirmar = false, this. erro = mensagemErro.mensagemErroCPF;break
                }

                
            }
            
        }
        
    }
    
}

    
    



module.exports = Usuarios
