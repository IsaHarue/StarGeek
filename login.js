const mensagem = document.querySelector(".mensagem");
const erro = document.querySelector(".erro");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("mynome");
const senha = document.getElementById("mysenha");
const csenha = document.getElementById("csenha");

formulario.onsubmit = (evento) =>{
        if(nome.value == ""){
            evento.preventDefault();
            mensagem.innerHTML = "<p> Digite seu nome! <p>"
            nome.focus();
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

        let dados = JSON.parse(localStorage.getItem("dados"));

        dados.forEach((elemento) => {
            if (elemento.nome === nome.value && elemento.senha === senha.value && elemento.csenha === csenha.value) {
                evento.preventDefault();
                mensagem.innerHTML = "<p> Logado! </p>"
                setTimeout(() =>{
                    window.location.assign("principal.html");
                }, 1000);
                return true;
            } else {
                
                erro.innerHTML = "<p> Usuário ou senha incorreto </p>"
                evento.preventDefault();
            }
        });
    }