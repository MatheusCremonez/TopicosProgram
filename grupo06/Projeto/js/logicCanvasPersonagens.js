/*
    Leonardo Rodrigues Guissi               RA: 15251275
    Leonardo Borges Bergamo                 RA: 15108244
	Matheus Augusto Cremonez Guimarães		RA: 15004336
*/

//Variáveis

var i, j;

var canvas;                 //o elemento canvas sobre o qual desenharemos
var ctx;                    //o "contexto" da canvas que será utilizado (2D ou 3D)
var dy = 0.0083;            //a taxa de variação (velocidade) vertical do personagem
var dxProjetil = 0.005;         // taxa de variacao do projetil
var x = 0.8903;             //posição horizontal do personagem (valor inicial)
var y = 0.0917;             //posição vertical do personagem (valor inicial)

var spawn = 4;              //variavel controle de intervalo de spawn de inimigos
var dxInimigo = 0.001;      //variavel controle de distancia viajada pelos inimigos a cada frame                    

var posicao = 0;            //Indicador da posição atual do personagem
var NUM_POSICOES = 8;      //Quantidade de imagens que compõem o movimento (neste caso possuem todos os movimentos, mas nem todos são usados)
var personagem = "Morty";   //Personagem inicial
var posicaoBloqueados = [];

var xProjetil = [];                     //posição horizontal do projetil 
var yProjetil = [];                     //posição vertical do projetil

var contadorFrameInimigos = [];     //contador para esperar mudança de imagem dos inimigos
var contadorJogavel = 0;            // contador para esperar mudança de imagem do personagem jogavel  

var xInimigo = [];              //posição horizontal do inimigo 
var yInimigo = [];              //posição vertical do inimigo
var personagemInimigo = [];     //Personagens inimigos que serão gerados
var vidaInimigo = [];           //Vida inimigo
var posicaoInimigo = [];        //Indicador da posição atual da imagem do inimigo

var tile1 = new Image();    //Imagem que será carregada e desenhada na canvas (Personagem Principal)
var tile2 = new Image();    //Imagem que será carregada e desenhada na canvas (Cenário)
var tile3 = new Image();    //Imagem que será carregada e desenhada na canvas (Projetil)
tile3.src = "images/projetil0.png";
var tile4 = [];     //Imagem que será carregada e desenhada na canvas (Inimigos)
var tile5 = [];     //Imagem que será carregada e desenhada na canvas (Barra de vidas)

var flagLibera = [];

tile6 = [];

for(i = 0; i < 4; i++){
	tile6.push(new Image);
	posicaoBloqueados.push(0);
	flagLibera.push(0);
}

tile6[0].src = "images/SummerJogavel.png";
tile6[1].src = "images/JaguarJogavel.png";
tile6[2].src = "images/WizardJogavel.png";
tile6[3].src = "images/PickleJogavel.png";




//Tempo
var intervalo;
var s = 1;
var m = 0;
var auxSegundos = 0;

//Kills
var kills = 0;
var verificador = s;

//Vida
var contGameOver = 0;
var posicaoVida = 3;

//Funções

function KeyDown(evt) {
    switch (evt.keyCode) {
        case 38:  /*seta para cima*/
            if (y - dy > 0.083) {
                contadorJogavel++;
                if (posicao > 4 && posicao < NUM_POSICOES) {
                    if (contadorJogavel >= 2) {

                        contadorJogavel = 0;
                        y -= dy;
                        posicao--;

                        if (posicao == NUM_POSICOES)
                            posicao = 7;
                    }
                }
                else {
                    y -= dy;
                    posicao = 7;
                }
            }
            break;

        case 40:  /*seta para baixo*/
            if (y + dy < 0.8) {
                contadorJogavel++;
                if (posicao > -1 && posicao < 5) {
                    if (contadorJogavel >= 2) {

                        contadorJogavel = 0;
                        y += dy;
                        posicao++;

                        if (posicao == 4)
                            posicao = 0;
                    }
                }
                else {
                    y += dy;
                    posicao = 0;
                }
            }
            break;
    }
}

function KeyUp(evt) {

    posicao = 8;
    ctx.drawImage(tile1,posicao*79,0,79,109, (x * canvas.width) , (canvas.height * y), (canvas.width * 0.074), (canvas.height * 0.1816));
    switch (evt.keyCode) {
        case 32: /* barra de espaço */
            xProjetil.push(x - 0.004);
            yProjetil.push(y + 0.067);
            break;
    
    }
}

function VerificaTiroCerto() {

    //Funcao que verifica se o tiro acertou no inimigo.
    //Comparamos a posicao em x da bola com a posicao em x do inimigo, levando em consideração, todo o corpo
    //do inimigo (Parte do Y).

    var k = 0;
    var l = 0;

    for (k = 0; k < xProjetil.length; k++) {
        for (l = 0; l < xInimigo.length; l++) {
            if (xProjetil[k] <= xInimigo[l] + 0.0702 && (yProjetil[k] >= yInimigo[l] && yProjetil[k] <= yInimigo[l] + 0.1816)) {
                xProjetil.splice(k, 1);
                yProjetil.splice(k, 1);

                vidaInimigo[l]--;
                if (vidaInimigo[l] == 0) {
                    //Se a vida do inimigo chega a zero, o inimigo desaparece e conta pontos.

                    kills++;
                    xInimigo.splice(l, 1);
                    yInimigo.splice(l, 1);
                    personagemInimigo.splice(l, 1);
                    vidaInimigo.splice(l, 1);
                    posicaoInimigo.splice(l, 1);
                    tile4.splice(l, 1);
                    tile5.splice(l, 1);
                    l--;
                    k--;
                }
                document.getElementById("pontosNum").innerHTML = kills;
            }
        }
    }

}

//Libera o personagem principal(troca a imagem do botão) quando chega a certa quantidade de pontos
function LiberaPersonagem(kills) {
    if (kills == 10 && flagLibera[0] == 0){
		alert("Summer liberada");
        posicaoBloqueados[0] = 1;
		flagLibera[0] = 1;
	}
    if (kills == 30 && flagLibera[1] == 0){
		alert("Jaguar liberado");
		flagLibera[1] = 1;
        posicaoBloqueados[1] = 1;
	}
    if (kills == 50 && flagLibera[2] == 0){
		alert("Wizard Morty liberado");
		flagLibera[2] = 1;
        posicaoBloqueados[2] = 1;
	}
    if (kills == 100 && flagLibera[3] == 0){
		alert("Pickle Rick liberado");
		flagLibera[3] = 1;
        posicaoBloqueados[3] = 1;
	}
}

//Troca o personagem principal quando chega a certa quantidade de pontos e o botão é clicado
function trocaPersonagem(nome, pos) {

    if (nome == 'Morty') {
        dy = 0.0083;
        dxProjetil = 0.0083;
        personagem = nome;
        tile3.src = "images/projetil" + pos + ".png";
        tile1.src = "images/Morty.png";
    }
    else if (kills >= 10 && nome == 'Summer') {
        personagem = nome;
        dy = 0.0117;
        tile3.src = "images/projetil" + pos + ".png";
        tile1.src = "images/Summer.png";
        
    }
    else if (kills >= 30 && nome == 'Jaguar') {
        dy = 0.015;
        personagem = nome;
        tile3.src = "images/projetil" + pos + ".png";
        tile1.src = "images/Jaguar.png";
        
    }
    else if (kills >= 50 && nome == 'Wizard') {
        dy = 0.0117;
        dxProjetil = 0.0065;
        personagem = nome;
        tile3.src = "images/projetil" + pos + ".png";
        tile1.src = "images/Wizard.png";
        
    }
    else if (kills >= 100 && nome == 'Pickle') {
        var rickSpeak = new Audio("musics/pickle_rick.mp3");
        rickSpeak.play();

        dy = 0.015;
        dxProjetil = 0.0084;
        personagem = nome;
        tile3.src = "images/projetil" + pos + ".png";
        tile1.src = "images/Pickle.png";
        
    }
}

function tempo() {
    //a função setInterval executa uma função (primeiro parametro) a cada determinado intervalo de tempo em ms (segundo parâmetro)
    //pelo segundo parmetro ser 1000ms, ou seja, 1s, temos a sensação de que é o tempo "correndo"
    intervalo = window.setInterval(function () {
        if (s == 60) { m++; s = 0; }
        if (s < 10) document.getElementById("segundo").innerHTML = "0" + s + "s"; else document.getElementById("segundo").innerHTML = s + "s";
        if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + "m"; else document.getElementById("minuto").innerHTML = m + "m";
        s++;
        auxSegundos++;
        if ((auxSegundos % 60) == 0 && contGameOver > 0) {
            contGameOver--;
            posicaoVida++;
            document.getElementById("vida" + posicaoVida).style.backgroundImage = "url('images/vida.png')";
            document.getElementById("vida" + posicaoVida).style.backgroundSize = "2vw 2vw";

        }
    }, 1000);
}

//Desenha o projetil
function DesenharProjetil() {
    ctx.drawImage(tile3, xProjetil[i] * canvas.width, yProjetil[i] * canvas.height, canvas.width * 0.0121, canvas.height * 0.0217);

    xProjetil[i] = xProjetil[i] - dxProjetil;

    //Se o projetil chegar ao final da tela, ela some
    if (xProjetil[i] <= 0) {
        xProjetil.splice(i, 1);
        yProjetil.splice(i, 1);
    }
}

//Desenha o Personagem principal
function Desenhar() {
    ctx.drawImage(tile1,posicao*79,0,79,109, (x * canvas.width), (canvas.height * y), (canvas.width * 0.074), (canvas.height * 0.1816));
}

//Gera aleatoriamente inimigos pelo canvas do jogo
function geraInimigo() {
    xInimigo.push(0.0187);
    var auxiliar = ((Math.floor(Math.random() * canvas.height * 0.675)) + canvas.height * 0.0917);

    yInimigo.push(auxiliar / canvas.height);

    //Utilizamos o JSON para pegar as informações dos inimigos, como nome e vida
    var f = JSON.parse(inimigos);
    var indice = Math.floor((Math.random() * 11));
    personagemInimigo.push(f[indice].nome);
    vidaInimigo.push(f[indice].vida);

    posicaoInimigo.push(0);
    contadorFrameInimigos.push(0);
    tile4.push(new Image);
    tile4[tile4.length-1].src = "images/"+f[indice].nome+".png";
    tile5.push(new Image);
    tile5[tile5.length - 1].src = "images/fullHealth.png";
}

//Desenha o inimigo
function DesenharInimigos(inimigos) {
    /*tile4[j].src = "images/" + inimigos + posicaoInimigo[j] + ".png";*/

    if (inimigos === "Bola" || inimigos === "CoisaRosa" || inimigos === "MortyRosa" || inimigos === "Tinkles") {
        if (vidaInimigo[j] != 2)
            tile5[j].src = "images/" + vidaInimigo[j] + "2Health.png";
    }
    if (inimigos == "Concerto" || inimigos == "MortyZumbi") {
        if (vidaInimigo[j] != 3)
            tile5[j].src = "images/" + vidaInimigo[j] + "3Health.png";
    }
    if (inimigos == "Rick") {
        if (vidaInimigo[j] != 4)
            tile5[j].src = "images/" + vidaInimigo[j] + "4Health.png";
    }

    ctx.drawImage(tile5[j], xInimigo[j] * canvas.width, (yInimigo[j] - 0.0167) * canvas.height, 0.0693 * canvas.width, 0.0116 * canvas.height);
    ctx.drawImage(tile4[j],posicaoInimigo[j]*79,0,79,109,xInimigo[j] * canvas.width, canvas.height * yInimigo[j],canvas.width * 0.074,canvas.height * 0.1816);
    xInimigo[j] = xInimigo[j] + dxInimigo;

    //Utiliza o contador para fazer com que os inimigos troquem as imagens a cada 5 frames
    if (contadorFrameInimigos[j] == 5) {
        posicaoInimigo[j]++;
        contadorFrameInimigos[j] = 0;
    }

    //Como são 4 imagens diferentes para o inimigo, fica em um loop circular para a sensação de estar andando
    if (posicaoInimigo[j] > 3) {
        posicaoInimigo[j] = 0;
    }
    //Se o inimigo ultrapassa a linha vertical do personagem principal, ele some e conta como uma perda de vida   
    if (xInimigo[j] >= 0.8903) {
        xInimigo.splice(j, 1);
        yInimigo.splice(j, 1);
        personagemInimigo.splice(j, 1);
        posicaoInimigo.splice(j, 1);
        tile4.splice(j, 1);
        tile5.splice(j, 1);
        vidaInimigo.splice(j, 1);

        contGameOver++;

        document.getElementById("vida" + posicaoVida).style.backgroundImage = "url('images/semvida.png')";
        document.getElementById("vida" + posicaoVida).style.backgroundSize = "2vw 2vw";
        posicaoVida--;

        //Se caso passarem 3 inimigos, acaba o jogo e vai para a tela do game over
        if (contGameOver == 3) {
            window.location.href = "gameOver.html";
            sessionStorage.setItem('pontuacao', (kills * auxSegundos));
        }
    }
    contadorFrameInimigos[j]++;
}

//Limpa tela
function LimparTela() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
    ctx.closePath();
    ctx.fill();
    ctx.drawImage(tile2, 0, 0, canvas.width, canvas.height);
}

//Gerenciador do Jogo
function Atualizar() {

    //Questão de responsividade, toda vez que há uma mudança de tamanho de tela, nosso canvas acompanha
    //este tamanho.
    canvas.width = window.innerWidth * 0.7811;
    canvas.height = window.innerHeight * 0.9419;

    LimparTela();

    //Desenha todos os inimigos presentes no vetor
    for (j = 0; j < xInimigo.length; j++) {
        if (yInimigo[j] < y)
            DesenharInimigos(personagemInimigo[j]);
    }

    //Desenha o personagem principal
    Desenhar();

    //Desenha o Projetil
    for (i = 0; i < xProjetil.length; i++)
        DesenharProjetil();

    //Aumento de velocidade dos inimigos a cada 30 segundos, além da quantidade de inimigos que nascem    
    if (s % 30 == 0) {
        if (spawn > 0.5) {
            spawn = spawn - 0.5;
            dxInimigo += 0.00005;
        }
    }

    //Controlador de Tempo para gerar inimigos
    if (auxSegundos - verificador > spawn) {
        geraInimigo();
        verificador = auxSegundos;
    }

    //Desenha Inimigo (Apenas para questão de profundidade)
    for (j = 0; j < xInimigo.length; j++) {
        if (yInimigo[j] >= y)
            DesenharInimigos(personagemInimigo[j]);
    }

    //Verifica o tiro
    VerificaTiroCerto();
	
	LiberaPersonagem(kills);


	var teste = 0.355;
	
	
	for(j = 0; j < 4; j++){
		ctx.drawImage(tile6[j],posicaoBloqueados[j]*90,0,90,90, (canvas.width*teste), (canvas.height*0.013), (canvas.width*0.0537), (canvas.width*0.0537));
		teste = teste + 0.076;

	}
    
	
    //Loop de atualização
    window.requestAnimationFrame(Atualizar);
}

function Iniciar(){

    tile1.src = "images/Morty.png";
    tile2.src = "images/cenario.png";
    
    var clima;

    /* Cidades para testes:
    Recife: https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Recife%2C%20SP%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    São Paulo: https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Sao%20Paulo%2C%20SP%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    Florianópolis: https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Florianopolis%2C%20SP%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    Macapá: https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Macapa%2C%20AP%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    Houston - Texas: https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22houston%2C%20US%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    Paris - França: https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22paris%2C%20%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    Oslo - Noruega: https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22oslo%2C%20%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    */

    //API do weather yahoo, onde recuperamos o clima de Campinas
    $.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22campinas%2C%20%20SP%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function (data) {

        clima = data.query.results.channel.item.condition.text;

        //Dependendo do clima, tera um cenário especifico
        if (clima === "Sunny" || clima === "Mostly Sunny" || clima === "Partly Sunny") {
            console.log("Sunny1: " + clima);
            tile2.src = "images/cenarioSunny.png";
        } else if (clima === "Cloudy" || clima === "Mostly Cloudy" || clima === "Partly Cloudy") {
            console.log("Cloudy1: " + clima);
            tile2.src = "images/cenarioCloudy.png";
        } else if (clima === "Rain" || clima === "Mostly Rain" || clima === "Partly Rain") {
            console.log("Rain1: " + clima);
            tile2.src = "images/cenarioRain.png";
        } else if (clima === "Thunderstorms" || clima === "Scattered Thunderstorms") {
            console.log("Thunderstorms1: " + clima);
            tile2.src = "images/cenarioThunderstorms.png";
        } else if (clima === "Rain And Snow") {
            console.log("Rain And Snow1: " + clima);
            tile2.src = "images/cenarioRainAndSnow.png";
        } else if (clima === "Snow") {
            console.log("Rain And Snow1: " + clima);
            tile2.src = "images/cenarioSnow.png";
        } else {
            console.log("cenario normal");
            tile2.src = "images/cenario.png";
        }
    });



    window.addEventListener('keydown', KeyDown);
    window.addEventListener('keyup', KeyUp);

    window.onload = tempo();

    //Verificador da musica
    var desliga = sessionStorage.getItem('music');
    if (desliga == 1) {
        var audio = document.getElementById("music");
        audio.pause();
    }

    //Recupera os contextos do Canvas
    canvas = document.getElementById("canvasJogo");
    ctx = canvas.getContext("2d");

    ctx.drawImage(tile1,5*79,0,79,109, (x * canvas.width) , (canvas.height * y), (canvas.width * 0.074), (canvas.height * 0.1816));
	
	for(j = 0; j < 4; j++){
		console.log(j);
		ctx.drawImage(tile6[j],posicaoBloqueados[j]*90,0,90,90, (canvas.width*0.3), (canvas.width*0.3), (canvas.width*0.0537), (canvas.height*0.0916));
	}
    
    //Chama o atualizar pela primeira vez
    window.requestAnimationFrame(Atualizar);
}
