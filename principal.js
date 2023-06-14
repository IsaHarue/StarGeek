
const mais = document.querySelector(".mais");
const add = document.querySelector(".add");
const maisinho = document.querySelector(".cont");



//do cadastro




//-----------------------------------------------------------------------------------------------------------------------------------

const cardfilme = document.getElementById("cardfilme");
const cardserie = document.getElementById("cardserie");
const cardlivro = document.getElementById("cardlivro");
const cardjogo = document.getElementById("cardjogo");
const formulario = document.querySelector(".edit");//
const nome = document.getElementById("texto");//
const descricao = document.getElementById("itxtt");//
const foto = document.getElementById("foto");//
const botaocadastrar = document.querySelector(".check");//
const idelemento = document.getElementById("idalterar");
var tipom;
var veditar;

function abrir(tipo){
    formulario.style.display = "flex";
    tipom = tipo;
}

function fechar(){
    formulario.style.display = "none";
}

var emaillogado;

botaocadastrar.onclick = (evento)=>{
    formulario.style.display = "none";
    if (veditar){
        editarenvio(evento);
    }
    else{
    evento.preventDefault();
    fenvio()
    .then(result =>{
                     if(result){
                        let dados = JSON.parse(localStorage.getItem("catalogo"))||[];
                        dados.push(
                                      {
                                         nome: nome.value,
                                        descricao: descricao.value,
                                        foto: nomeArq,
                                        email: emaillogado,
                                        tipo: tipom
                                        }
                                     )
                        localStorage.setItem("catalogo", JSON.stringify(dados));
                        
                     }else{
                        alert("Houve erro no envio do arquivo");
                     }

                    });
                }
                
}

function carregarCatalogo(){
    veditar = false;
    let dados = JSON.parse(localStorage.getItem("catalogo"));

    dados.forEach((elemento, indice) => {
      if(elemento.email == emaillogado){
        let divcard = document.createElement("div");
        divcard.innerHTML = `<div class="cardimagem"> <img src="imgcard/${elemento.foto}"> </div> <div class="cardnome">${elemento.nome} <p>${elemento.descricao}</p></div> <div class="cardinfo">
        <div class="editar"><i class="bi bi-pencil-fill" onclick="editar(${indice},${elemento.tipo})"></i></div>
        <div class="excluir"><i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i></div>
        </div>`;

        if(elemento.tipo== 1){
            cardfilme.appendChild(divcard);
        }
        if(elemento.tipo== 2){
            cardserie.appendChild(divcard);
        }
        if(elemento.tipo== 3){
            cardlivro.appendChild(divcard);
        }
        if(elemento.tipo== 4){
            cardjogo.appendChild(divcard);
        }

        
      }
    });

} 

carregarCatalogo();

function editar(indice, tipo){
    nome.value = "";
    descricao.value = "";
    foto.files[0] = null;
    formulario.style.display = "flex";
    
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    nome.value = dados[indice].nome;
    descricao.value = dados[indice].descricao;
    //foto.files[0] = dados[indice].foto;
    idelemento.value = indice;
    fotoa = dados[indice].foto;
    veditar = true;
    tipom =tipo;
}
var fotoa;

function editarenvio(evento){
    if ((fotoa != foto.value)&&(foto.value != "")){
    evento.preventDefault();
    fenvio()
    .then(result =>{
                     if(result){
                        salvaEdicao(nomeArq);
                        }
                    });
    }
    else
    {
        salvaEdicao(fotoa);
    } 
}
function salvaEdicao(pfoto){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[idelemento.value].nome = nome.value;
    dados[idelemento.value].descricao = descricao.value;
    dados[idelemento.value].foto = pfoto;
    dados[idelemento.value].email = emaillogado;
    dados[idelemento.value].tipo = tipom;
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.reload();

}

function excluir(indice){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    if(dados.length == 1)
    {localStorage.clear("catalogo");}
    else{
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    }
    window.location.reload();
}

var nomeArq;
async function fenvio() { 
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData));
    try{
         
         var resp = await fetch(url, {
                                       method: 'POST',
                                       body: formData,
                                     }
                               ) 
         if (resp.ok){
           let respText = await resp.text();
           nomeArq = respText;
           return true;
         }
         else{
              return false;
         }
       }
    catch (error) {
        console.error(error);
        return false;
      }
}