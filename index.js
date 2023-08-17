const palavrasJogo = ["ABACATE", "ABACAXI","ACEROLA","AÇAÍ","ARAÇA","ABACATE","BACABA","BACURI","BANANA","CAJÁ","CAJÚ", "CARAMBOLA", "CUPUAÇU", "GRAVIOLA", "GOIABA", "JABUTICABA",
 "JENIPAPO","MAÇÃ","MANGABA", "MANGA","MARACUJÁ","MURICI","PEQUI","PITANGA","PITAYA","SAPOTI","TANGERINA","UMBU","UVA","UVAIA"];

const palavraSecreta = palavrasJogo [Math.floor(Math.random() * palavrasJogo.length)];
const letrasErradas = [];
const letrasCertas = [];

var erros = 0;
var forca = document.getElementById("forca-game");
var failAudio = new Audio("Resources/Audio/fail.mp3");
var winAudio = new Audio("Resources/Audio/win.mp3");
var uhAudio = new Audio("Resources/Audio/uh.mp3");
var keyboardClick = new Audio("Resources/Audio/keyboardclick.mp3");
document.addEventListener("keydown", (evento) => 
{
      keyboardClick.play();
      const letra = evento.key.toUpperCase();

      if (letrasCertas.includes(letra) || letrasErradas.includes(letra) )  
      {
        uhAudio.play();
        alert("Essa letra já foi!");
      } 
      else 
      {
        if (palavraSecreta.includes(letra)) 
        {
          letrasCertas.push(letra);
        } 
        else 
        {
          letrasErradas.push(letra);
          erros += 1;                               //Controle dos Erros
        }
      }

      desenharForca();
      mostrarAcertos();
      mostrarErros();
      verificarStatusJogo();;
});

  function desenharForca() 
  {
    if (erros >= 0 && erros <= 5)
    {
        forca.src = `Resources/Images/${erros + 1}.png`;
    }
  }

  function mostrarAcertos() 
  {
    const divPalavraSecreta = document.querySelector(".palavra-secreta");
    divPalavraSecreta.innerHTML = "";
    
    palavraSecreta.split("").forEach((letra) => 
    {
      if (letrasCertas.includes(letra)) 
      {
        divPalavraSecreta.innerHTML += `${letra}`;
      } 
      else 
      {
        divPalavraSecreta.innerHTML += `_`;
      }
    }
    );
  }

  function mostrarErros() 
  {
    const divTentativas = document.querySelector(".erradas-letras");
    divTentativas.innerHTML = "";
    
    letrasErradas.forEach((letra) => 
    {
        divTentativas.innerHTML += `${letra}`;
    }
    );
  }

  function verificarStatusJogo() {
    let mensagem = "";
    const divPalavraSecreta = document.querySelector(".palavra-secreta");
  
    if (letrasErradas.length === 5) 
    {
      mensagem = "Fim de jogo! Você perdeu!";
      forca.src = "Resources/Images/7.png";
    }
  
    if (palavraSecreta === divPalavraSecreta.innerText) 
    {
      mensagem = "Parabéns! Você ganhou!";
      document.querySelector(".popup").style.backgroundColor = 'rgba(0, 255, 30, 0.5)';
    }
  
    if (mensagem) 
    {
        document.querySelector(".popup-texto").innerHTML = mensagem;                    //MOSTRA O POPUP
        document.querySelector(".popup").style.visibility = "visible";

        if(erros>=5)
        {
            failAudio.play();
        }
        else
        {
            winAudio.play();
        }
    }
  }

 function reiniciarJogo()
 {
    window.location.reload()
 }