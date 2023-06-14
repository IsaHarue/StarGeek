const mensagem = document.querySelector(".mensagem");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("mynome");
const email = document.getElementById("mymail");
const senha = document.getElementById("mysenha");
const csenha = document.getElementById("csenha");
const btnCad = document.querySelector("#bt1");
var cadastro = document.getElementById("cadastro");
const btnL = document.querySelector("#btl");
const btnLo = document.querySelector("#btlo");
const btnLog = document.querySelector("#bt2");
var login = document.getElementById("login");
const mensageml = document.querySelector(".mensageml");
const formulariol = document.getElementById("formulariol");
const nomel = document.getElementById("mynomel");
const senhal = document.getElementById("mysenhal");

var emaillogado;
femaillogado();


btnCad.addEventListener("click", () => {
    cadastro.style.display = "grid";
})

btnLog.addEventListener("click", () => {
    login.style.display = "grid";
})

formulario.onsubmit = (evento) =>{
    if(nome.value == ""){
        evento.preventDefault();
        mensagem.innerHTML = "<p> Digite seu nome! <p>"
        nome.focus();
        return null;
    }

    if(email.value == ""){
        evento.preventDefault();
        mensagem.innerHTML = "<p> Digite seu email! <p>"
        email.focus();
        return null;
    }

    if(senha.value == ""){
        evento.preventDefault();
        mensagem.innerHTML = "<p> Digite sua senha! <p>"
        senha.focus();
        return null;
    }

    if(csenha.value != senha.value){
        evento.preventDefault();
        mensagem.innerHTML = "<p>corrija a senha! <p>"
        csenha.focus();
        return null;
    }

    let dados = JSON.parse(localStorage.getItem("dados")) || [];
    dados.push({
        nome : nome.value,
        email : email.value,
        senha : senha.value,
        csenha : csenha.value
    })

    localStorage.setItem("dados", JSON.stringify(dados));
    evento.preventDefault();
    mensagem.innerHTML = ""
    login.style.display = "grid";

}
formulariol.onsubmit = (eventol) =>{
    let dados = JSON.parse(localStorage.getItem("dados"));
    let logado;
   
    
    dados.forEach((elemento) => {
        if (elemento.nome === nomel.value && elemento.senha === senhal.value) {
            eventol.preventDefault();
            let dados = JSON.parse(sessionStorage.getItem("logado")) || [];
            dados.push(
                {
                    email : email.value
                }
            )
            sessionStorage.setItem("logado", JSON.stringify(dados) )
            window.location.assign("principal.html");
            return true;
        } else {
            mensageml.innerHTML = "<p>Senha ou E-mail incorreto<p>"
            eventol.preventDefault();
        }
    });
}

function femaillogado(){
    let dados = JSON.parse(sessionStorage.getItem("logado"));
    if(dados == null){
        window.location.assign("landpage.html");
    } else{
        emaillogado = dados[0].email;
    }

}




    


