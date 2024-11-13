
async function botaoPesquisar(){

    const timesNBA = await listarTimesNBA();
    const timeProcurado = document.getElementById('team-search');  
    if (timeProcurado.value.length > 3){   // Só realiza a pesquisa a partir de 4 letras
        pesquisarTime(timeProcurado.value, timesNBA);
    } else{                                // Caso pesquisa envolva menos de 4 letras ele imprime a tabela toda com a funcao criarTabela
        alert("Time não encontrado, pode consultar todos os times da liga na tabela a seguir!");
        criarTabela(timesNBA);
    }
    timeProcurado.value = ""; // Apaga o texto do input após retornar o resultado da pesquisa
}

async function filtrarTimesNBA(idBotao){

    //Verificar qual Botao foi acionado para pesquisar os times ou filtrar por categorias
    const buttonFiltrar = document.getElementById(idBotao);
    const timesNBA = await listarTimesNBA();

    if(buttonFiltrar.className == 'filtrar-conferencia'){
        const timesFiltrados = await timesNBA.filter((team) => team.conference.toLowerCase() == buttonFiltrar.id.toLowerCase())
        criarTabela(timesFiltrados);

    }else if(buttonFiltrar.className == 'filtrar-divisao'){
        const timesFiltrados = await timesNBA.filter((team) => team.division.toLowerCase() == buttonFiltrar.id.toLowerCase())
        criarTabela(timesFiltrados);
        
    }else{
        criarTabela(timesNBA);
    }
        
    }

async function listarTimesNBA(){ //Filtro para selecionar os times apenas da liga NBA

    const autorizacaoAPI = 'f90800cf-63be-46ab-9817-2c09ebbcfc7b'
    const enderecoTimes = 'https://api.balldontlie.io/v1/teams/' 
                
        try{
            const times = await fetch(enderecoTimes, {
                method: 'GET',
                headers: {
                    "Authorization": autorizacaoAPI
                }
            });
            
            const timesJson = await times.json(); //Contém times fora da NBA
        
            const listaTimes = timesJson.data.filter((team) => team.conference !== '    ') // Seleciona apenas os times NBA
            return listaTimes;

        } catch(error){
            console.log(error);
            }
    
}

async function criarTabela(timesNBA){

    const anuncioResultado = document.getElementById('anuncio-resultado');
    const tabela = document.getElementById('tabela-times');
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const cardTeamContent = document.getElementById('team-content');
    
    anuncioResultado.innerText = "Informações sobre os times encontrados:"
    tabelaCorpo.innerHTML ="";
    cardTeamContent.style.display = 'none'; // Apagar o display com informações de 1 unico time

    timesNBA.forEach((team) => {   //Recebe o Array com os times a serem impressos na tabela

        tabela.style.display ='block';
        const linhaDadosTime = document.createElement('tr');
        
        const tabelaNome = document.createElement('td');
        tabelaNome.innerText = team.full_name;

        const tabelaConferencia = document.createElement('td');
        tabelaConferencia.innerText = traduzirConferencia(team.conference);
        
        const tabelaDivisao = document.createElement('td');
        tabelaDivisao.innerText = traduzirDivisao(team.division);
        
        const tabelaCidade = document.createElement('td');
        tabelaCidade.innerText = team.city;
        
        tabela.appendChild(tabelaCorpo);
        tabelaCorpo.appendChild(linhaDadosTime);
        linhaDadosTime.appendChild(tabelaNome);
        linhaDadosTime.appendChild(tabelaConferencia);
        linhaDadosTime.appendChild(tabelaDivisao);
        linhaDadosTime.appendChild(tabelaCidade)
    })

        const containerDados = document.getElementById('container-dados');
        containerDados.style.display = 'flex';
}
            
function pesquisarTime(timeProcurado, timesNBA){
        
    const tabela = document.getElementById('tabela-times');
    const cardTeamContent = document.getElementById('team-content');

    const timeEncontrado = timesNBA.filter((team) => team.full_name.toLowerCase().includes(timeProcurado.toLowerCase()))

    if(timeEncontrado.length < 1){ // Caso filtro não retorne nenhum valor ele imprime a tabela toda chamando a funcao criarTabela
        alert("Time não encontrado, pode consultar todos os times da liga na tabela a seguir!");
        criarTabela(timesNBA);
    } else{
        
        const anuncioResultado = document.getElementById('anuncio-resultado');
        anuncioResultado.innerText = "Informações sobre o time encontrado:"

        tabela.style.display = 'none';

        // IMPRIME APENAS O CARD com as informacoes do time encontrado
        timeEncontrado.forEach((team) => {
            
            const cardNome = document.getElementById('nome');
            const cardConferencia = document.getElementById('conferencia');
            const cardDivisao = document.getElementById('divisao');
            const cardCidade = document.getElementById('cidade');
            
            cardNome.innerText = team.full_name;
            cardConferencia.innerText = traduzirConferencia(team.conference);
            cardDivisao.innerText = traduzirDivisao(team.division);
            cardCidade.innerText = team.city;
            cardTeamContent.style.display = 'flex';
        })

        const containerDados = document.getElementById('container-dados');
        containerDados.style.display = 'flex';
    }
}

function traduzirConferencia(conferencia){
    const nomesConferencia = {
        East: "Leste",
        West: "Oeste"
    }
    return nomesConferencia[conferencia]          
}

function traduzirDivisao(divisao){
    const nomesDivisao = {
        Atlantic: "Atlântico",
        Central: "Central",
        Northwest: "Noroeste",
        Pacific: "Pacífico",
        Southeast: "Sudeste",
        Southwest: "Sudoeste"
    }
    return nomesDivisao[divisao]          
}
                    

            

           


        