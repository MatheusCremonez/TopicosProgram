/*
    Leonardo Rodrigues Guissi               RA: 15251275
    Leonardo Borges Bergamo                 RA: 15108244
	Matheus Augusto Cremonez Guimarães		RA: 15004336

*/

//Retorna para o jogo se quiser jogar novamente
function menuJogo(){
    window.location.href="game.html";
}

//Pega a pontuação realizada no jogo e printa na tela
function fimJogo()
{
	var pontos = sessionStorage.getItem('pontuacao');
    document.getElementById("pontos").innerHTML = pontos;
    
    //Verificação para caso tenha desligado a musica no começo do jogo
    var desliga = sessionStorage.getItem('music');
    if(desliga == 1){
        var audio = document.getElementById("music");
        audio.pause();
    } 
}