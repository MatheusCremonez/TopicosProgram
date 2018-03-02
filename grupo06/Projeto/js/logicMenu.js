/*
    Leonardo Rodrigues Guissi               RA: 15251275
    Leonardo Borges Bergamo                 RA: 15108244
	Matheus Augusto Cremonez Guimarães		RA: 15004336

*/

var desliga = 0;    //Variavel para desligar ou ligar a musica
var cont = 1;       //Variavel para ir avançando a historia da intro

//Config inicial para tirar botões que mostrarão na tela da intro
function configInicial(){

    document.getElementById("inputInicioJogo").style.visibility = "hidden";
    document.getElementById("inputContinue").style.visibility = "hidden";

}

//Inicio da intro, troca a imagem de fundo de liga alguns botões, alem de tirar outros que eram do menu
function inicioIntro(){

        //Troca da imagem
        document.getElementById("divMenu").style.backgroundImage = "url('images/intro.png')";
        document.getElementById("divMenu").style.backgroundSize =  "75vw 40vw";
        document.getElementById("divMenu").style.backgroundRepeat = "no-repeat";
        document.getElementById("divMenu").style.backgroundPosition = "center";

        //Desliga botões menu
        document.getElementById("inputJogar").style.visibility = "hidden";
        document.getElementById("musicButton").style.visibility = "hidden";
        
        //Liga botão intro
        document.getElementById("inputContinue").style.visibility = "visible";

}

//Função para avançar a história da intro, que realiza a troca da imagem
//Feito através de uma verificação com um contador global
function introContinue(){

    if(cont == 1){
        document.getElementById("divMenu").style.backgroundImage = "url('images/intro2.png')";
        document.getElementById("divMenu").style.backgroundSize =  "75vw 40vw";
        document.getElementById("divMenu").style.backgroundRepeat = "no-repeat";
        document.getElementById("divMenu").style.backgroundPosition = "center";

        cont++;
    }
    else if(cont == 2){
        document.getElementById("divMenu").style.backgroundImage = "url('images/intro3.png')";
        document.getElementById("divMenu").style.backgroundSize =  "75vw 40vw";
        document.getElementById("divMenu").style.backgroundRepeat = "no-repeat";
        document.getElementById("divMenu").style.backgroundPosition = "center";

        cont++;
    }
    else if(cont == 3){
        document.getElementById("divMenu").style.backgroundImage = "url('images/intro4.png')";
        document.getElementById("divMenu").style.backgroundSize =  "75vw 40vw";
        document.getElementById("divMenu").style.backgroundRepeat = "no-repeat";
        document.getElementById("divMenu").style.backgroundPosition = "center";

        cont++;
    }
    else if(cont == 4){
        document.getElementById("divMenu").style.backgroundImage = "url('images/intro5.png')";
        document.getElementById("divMenu").style.backgroundSize =  "75vw 40vw";
        document.getElementById("divMenu").style.backgroundRepeat = "no-repeat";
        document.getElementById("divMenu").style.backgroundPosition = "center";

        //Tira o botão "..." para colocar o botão de iniciar o jogo
        document.getElementById("inputContinue").style.visibility = "hidden";
        document.getElementById("inputInicioJogo").style.visibility = "visible";
    }
    
}

//Função para controle do som da música, liga ou desliga
function musicOption(){

    var audio = document.getElementById("music");
    var auxiliar = document.getElementById("volume");

    if(desliga == 0){
        desliga = 1;
        
        auxiliar.setAttribute('src',"images/semVolume.png");
        audio.pause();
    }
    else{
        auxiliar.setAttribute('src',"images/volume.png");
        desliga = 0;
        audio.play();
    }

}

//Troca para a página do jogo
function iniciarJogo(){

    sessionStorage.setItem('music', desliga);
    window.location.href="game.html";

}