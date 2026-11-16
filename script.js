// 1. Array de objetos com 12 palavras e suas respectivas dicas
const listaPalavras = [
    { palavra: "javascript", dica: "Linguagem de programação que dá vida às páginas web." },
    { palavra: "html", dica: "Linguagem de marcação usada para estruturar páginas." },
    { palavra: "css", dica: "Folhas de estilo usadas para definir o visual de um site." },
    { palavra: "internet", dica: "Rede mundial que conecta milhões de computadores." },
    { palavra: "navegador", dica: "Programa usado para acessar sites, como Chrome ou Firefox." },
    { palavra: "programacao", dica: "Ato de escrever instruções para um computador executar." },
    { palavra: "computador", dica: "Máquina eletrônica capaz de processar dados." },
    { palavra: "algoritmo", dica: "Sequência finita de passos para resolver um problema." },
    { palavra: "variavel", dica: "Espaço na memória usado para guardar um valor." },
    { palavra: "teclado", dica: "Periférico de entrada usado para digitar textos." },
    { palavra: "servidor", dica: "Computador que fornece recursos ou páginas para outros." },
    { palavra: "github", dica: "Plataforma usada para hospedar códigos e controlar versões." }
  ];
  
  // 2. Variáveis de estado do jogo
  let palavraSecreta = "";
  let dicaAtual = "";
  let letrasCorretas = [];
  let letrasUsadas = [];
  let tentativas = 6;
  let jogoAtivo = true;
  let vitorias = 0;
  let derrotas = 0;
  
  // 3. Referências aos elementos do DOM
  const elementoDica = document.getElementById("dica");
  const elementoPalavra = document.getElementById("palavra");
  const elementoTentativas = document.getElementById("tentativas");
  const inputLetra = document.getElementById("letra");
  const botaoTentar = document.getElementById("btn-tentar");
  const mensagem = document.getElementById("mensagem");
  const elementoLetrasUsadas = document.getElementById("letras-usadas");
  const elementoVitorias = document.getElementById("vitorias");
  const elementoDerrotas = document.getElementById("derrotas");
  const botaoReiniciar = document.getElementById("btn-reiniciar");
  
  // 4. Função para iniciar ou reiniciar a partida
  function iniciarJogo() {
    const indice = Math.floor(Math.random() * listaPalavras.length);
    palavraSecreta = listaPalavras[indice].palavra;
    dicaAtual = listaPalavras[indice].dica;
  
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoAtivo = true;
  
    // Atualiza a interface
    elementoDica.textContent = "Dica: " + dicaAtual;
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "Nenhuma";
    mensagem.textContent = "Boa sorte! Digite uma letra.";
    mensagem.className = "mensagem";
  
    inputLetra.disabled = false;
    botaoTentar.disabled = false;
    inputLetra.value = "";
    inputLetra.focus();
  
    atualizarPalavra();
  }
  
  // 5. Função para desenhar os traços e letras descobertas
  function atualizarPalavra() {
    let exibicao = "";
  
    for (let i = 0; i < palavraSecreta.length; i++) {
      const letra = palavraSecreta[i];
      if (letrasCorretas.includes(letra)) {
        exibicao += letra + " ";
      } else {
        exibicao += "_ ";
      }
    }
  
    elementoPalavra.textContent = exibicao.trim();
  }
  
  // 6. Função para verificar se todas as letras foram descobertas
  function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
      const letra = palavraSecreta[i];
      if (!letrasCorretas.includes(letra)) {
        return false;
      }
    }
    return true;
  }
  
  // 7. Função para encerrar a partida
  function finalizarJogo(ganhou) {
    jogoAtivo = false;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
  
    if (ganhou) {
      vitorias++;
      elementoVitorias.textContent = vitorias;
      mensagem.textContent = "Parabéns! Você venceu!";
      mensagem.className = "mensagem acerto";
    } else {
      derrotas++;
      elementoDerrotas.textContent = derrotas;
      mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta.toUpperCase();
      mensagem.className = "mensagem erro";
    }
  }
  
  // 8. Função principal que processa cada tentativa
  function verificarLetra() {
    if (!jogoAtivo) return;
  
    const letra = inputLetra.value.toLowerCase().trim();
    inputLetra.value = "";
    inputLetra.focus();
  
    // Validação: verifica se é uma letra válida de A a Z
    if (letra === "" || !/^[a-z]$/.test(letra)) {
      mensagem.textContent = "Por favor, digite uma letra válida (A-Z).";
      mensagem.className = "mensagem erro";
      return;
    }
  
    // Bloqueio de letras repetidas
    if (letrasUsadas.includes(letra)) {
      mensagem.textContent = "Você já tentou a letra '" + letra.toUpperCase() + "'.";
      mensagem.className = "mensagem erro";
      return;
    }
  
    letrasUsadas.push(letra);
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ").toUpperCase();
  
    // Verifica acerto ou erro
    if (palavraSecreta.includes(letra)) {
      letrasCorretas.push(letra);
      mensagem.textContent = "Você acertou a letra '" + letra.toUpperCase() + "'!";
      mensagem.className = "mensagem acerto";
    } else {
      tentativas--;
      elementoTentativas.textContent = tentativas;
      mensagem.textContent = "A letra '" + letra.toUpperCase() + "' não existe na palavra.";
      mensagem.className = "mensagem erro";
    }
  
    atualizarPalavra();
  
    // Checa condições de fim de jogo
    if (venceu()) {
      finalizarJogo(true);
    } else if (tentativas === 0) {
      finalizarJogo(false);
    }
  }
  
  // 9. Eventos de clique e teclado
  botaoTentar.addEventListener("click", verificarLetra);
  botaoReiniciar.addEventListener("click", iniciarJogo);
  
  inputLetra.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      verificarLetra();
    }
  });
  
  // 10. Inicia o jogo ao abrir a página
  iniciarJogo();
  