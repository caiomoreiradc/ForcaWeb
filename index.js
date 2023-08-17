const palavrasJogo = ["ABACATE", "ABACAXI","ACEROLA","AÇAÍ","ARAÇA","ABACATE","BACABA","BACURI","BANANA","CAJÁ","CAJÚ", "CARAMBOLA", "CUPUAÇU", "GRAVIOLA", "GOIABA", "JABUTICABA",
 "JENIPAPO","MAÇÃ","MANGABA", "MANGA","MARACUJÁ","MURICI","PEQUI","PITANGA","PITAYA","SAPOTI","TANGERINA","UMBU","UVA","UVAIA"];

const palavraSecreta = palavrasJogo [Math.floor(Math.random() * palavrasJogo.length)];
const letrasErradas = [];
const letrasCorretas = [];
var erros = 0;
var forca = document.getElementById("forca-game");


document.addEventListener("keydown", (evento) => 
{
      const letra = evento.key.toUpperCase();

      if (letrasErradas.includes(letra)) 
      {
        alert("Essa letra já foi!");
      } 
      else 
      {
        if (palavraSecreta.includes(letra)) 
        {
          letrasCorretas.push(letra);
        } 
        else 
        {
          letrasErradas.push(letra);
          erros += 1;
        }
      }

      desenharForca();
      mostrarErros();
      mostrarAcertos();
      verificarStatusJogo();;
  });

  function desenharForca() 
  {
    if (erros >= 0 && erros <= 5)
    {
        forca.src = `Resources/${erros + 1}.png`;
    }
  }

  function mostrarAcertos() 
  {
    const divPalavraSecreta = document.querySelector(".palavra-secreta");
    divPalavraSecreta.innerHTML = "";
    
    palavraSecreta.split("").forEach((letra) => 
    {
      if (letrasCorretas.includes(letra)) 
      {
        divPalavraSecreta.innerHTML += `${letra}`;
      } 
      else 
      {
        divPalavraSecreta.innerHTML += `*`;
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
      forca.src = "Resources/7.png";

    }
  
    if (palavraSecreta === divPalavraSecreta.innerText) 
    {
      mensagem = "Parabéns! Você ganhou!";
      document.querySelector(".popup").style.backgroundColor = 'rgba(0, 255, 30, 0.5)';
    }
  
    if (mensagem) 
    {
        document.querySelector(".popup-texto").innerHTML = mensagem;
        document.querySelector(".popup").style.visibility = "visible";
    }
  }

 function reiniciarJogo()
 {
    window.location.reload()
 }