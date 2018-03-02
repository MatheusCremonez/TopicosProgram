/*
    Leonardo Rodrigues Guissi               RA: 15251275
    Leonardo Borges Bergamo                 RA: 15108244
	Matheus Augusto Cremonez Guimarães		RA: 15004336

*/

//Função que chama uma página do Twitter para compartilhar o resultado
function compartilharResultado(){
    var url = "https://twitter.com/intent/tweet";
    var text = "Eu fiz ";
    var text2 = " pontos!";
    var hashtags = "RickAndMorty, ProblemasComParasitas";
    var pontos = sessionStorage.getItem('pontuacao');

    window.open(url+"?text="+text+pontos+text2+";hashtags="+hashtags,"","width=500, height=300");
}