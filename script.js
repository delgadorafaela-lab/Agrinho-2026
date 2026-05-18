/* ==========================================================================
   LÓGICA DO SIMULADOR AGRO SUSTENTÁVEL
   ========================================================================== */

// Valores iniciais das barras de status (em porcentagem)
let solo = 50;
let producao = 50;
let ambiente = 50;

/**
 * Função responsável por atualizar todos os elementos visuais na tela.
 * Ela garante que os valores fiquem entre 0 e 100 e redesenha as barras.
 */
function atualizarTela() {
    // Restringe os valores para que nunca fiquem menores que 0 ou maiores que 100
    solo = Math.max(0, Math.min(100, solo));
    producao = Math.max(0, Math.min(100, producao));
    ambiente = Math.max(0, Math.min(100, ambiente));

    // Atualiza a largura (width) das barras de progresso no CSS
    document.getElementById('solo-barra').style.width = solo + '%';
    document.getElementById('producao-barra').style.width = producao + '%';
    document.getElementById('ambiente-barra').style.width = ambiente + '%';

    // Atualiza os textos com as porcentagens numéricas correspondentes
    document.getElementById('solo-txt').innerText = solo + '%';
    document.getElementById('producao-txt').innerText = producao + '%';
    document.getElementById('ambiente-txt').innerText = ambiente + '%';

    // CONDIÇÃO DE VITÓRIA: Verifica se o jogador alcançou o equilíbrio perfeito
    // Se todos os indicadores forem maiores ou iguais a 70%, o jogador vence.
    if (solo >= 70 && producao >= 70 && ambiente >= 70) {
        const painelFeedback = document.getElementById('feedback');
        painelFeedback.style.backgroundColor = "#d4edda"; // Fundo verde claro de sucesso
        painelFeedback.style.color = "#155724";           // Texto verde escuro
        painelFeedback.style.borderColor = "#c3e6cb";
        painelFeedback.innerText = "🏆 Incrível! Você alcançou o equilíbrio perfeito entre produção e sustentabilidade! O futuro do Agro está garantido.";
    }
}

/**
 * Função chamada pelos botões do HTML.
 * Altera os atributos da fazenda dependendo da escolha feita pelo usuário.
 * @param {string} tipo - O identificador da decisão tomada.
 */
function tomarDecisao(tipo) {
    let textoFeedback = "";
    const painelFeedback = document.getElementById('feedback');

    // Reseta as cores padrão do painel de feedback antes de exibir a nova mensagem
    painelFeedback.style.backgroundColor = "#f1f1f1";
    painelFeedback.style.color = "#333333";
    painelFeedback.style.borderColor = "#dcdcdc";

    // Estrutura de decisão para cada escolha do usuário
    switch (tipo) {
        // 1. MÉTODOS DE PLANTIO
        case 'direto':
            solo += 20; 
            ambiente += 10; 
            producao += 5;
            textoFeedback = "🌱 Excelente escolha! O Plantio Direto protegeu o solo contra a erosão e manteve a umidade da terra.";
            break;
        
        case 'tradicional':
            solo -= 20; 
            producao += 15; 
            ambiente -= 10;
            textoFeedback = "🚜 O arado tradicional acelerou o plantio agora, mas compactou e desgastou a estrutura do solo a longo prazo.";
            break;

        // 2. SISTEMAS DE IRRIGAÇÃO
        case 'sensores':
            ambiente += 20; 
            solo += 5;
            textoFeedback = "💧 Tecnologia pura! Sensores IoT detectaram a umidade exata das raízes e economizaram muita água.";
            break;
        
        case 'aspersao':
            ambiente -= 20; 
            producao += 10;
            textoFeedback = "💦 A irrigação por aspersão contínua desperdiçou água por evaporação e gerou poças desnecessárias.";
            break;

        // 3. CONTROLE DE PRAGAS
        case 'drone':
            ambiente += 25; 
            solo += 10; 
            producao += 10;
            textoFeedback = "🛸 Precisão! Drones mapearam os focos de pragas e você aplicou o controle biológico cirurgicamente, salvando as plantas.";
            break;
        
        case 'quimico':
            ambiente -= 30; 
            solo -= 15; 
            producao += 20;
            textoFeedback = "⚠️ Alerta! O agrotóxico eliminou as pragas rápido, mas contaminou os lençóis freáticos e enfraqueceu os microrganismos do solo.";
            break;
            
        default:
            textoFeedback = "Tome suas decisões para equilibrar a fazenda!";
    }

    // Aplica o texto da consequência no painel de feedback
    painelFeedback.innerText = textoFeedback;

    // Atualiza a tela com os novos valores calculados
    atualizarTela();
}

// Executa a função uma vez ao carregar a página para renderizar o estado inicial (50%)
atualizarTela();