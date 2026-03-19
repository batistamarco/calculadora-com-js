const display = document.querySelector('#display');

function insertToDisplay(valor) {
    const operadores = ['+', '-', '*', '/'];
    const displayValue = display.value;
    
    if (operadores.includes(valor)) {
        for (let op of operadores) {
            if (displayValue.includes(op)) {
                alert('Só uma operação por vez!');
                return;
            }
        }
        
        if (displayValue === '') {
            alert('Digite um número primeiro');
            return;
        }
    }
    
    display.value += valor;
}

function clean(){
    display.value = '';
}

function back(){
    display.value = display.value.slice(0, -1);
}

const operacoes = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => b === 0 ? 'Erro' : a / b
};

function calcular(operador, a, b) {
    const operacao = operacoes[operador];
    if (!operacao) return 'Operação inválida';
    return operacao(a, b);
}

function result() {
    const expression = display.value;
    const operadores = Object.keys(operacoes);
    let operadorEncontrado = null;
    let posicao = -1;

    for (let op of operadores) {
        posicao = expression.indexOf(op);
        if (posicao !== -1) {
            operadorEncontrado = op;
            break;
        }
    }    

    if (!operadorEncontrado) {
        display.value = 'Erro';
        return;
    }
    
    const a = parseFloat(expression.substring(0, posicao));
    const b = parseFloat(expression.substring(posicao + 1));

    if (isNaN(a) || isNaN(b)) {
        display.value = 'Erro';
        return;
    }

    const resultado = calcular(operadorEncontrado, a, b);
    display.value = resultado;
}

function toggleTheme() {
    const body = document.body;
    const btn = document.querySelector('#theme-button');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        btn.innerText = '☀️ Modo Claro';
    } else {
        btn.innerText = '🌙 Modo Escuro';
    }
}

document.querySelectorAll('.btn-op').forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.getAttribute('data-value');
        insertToDisplay(valor);
    });
});

document.querySelectorAll('.btn-num').forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.getAttribute('data-value');
        insertToDisplay(valor);
    });
});

document.querySelector('.btn-clear').addEventListener('click', clean);
document.querySelector('.btn-back').addEventListener('click', back);
document.querySelector('.btn-dot').addEventListener('click', () => insertToDisplay('.'));
document.querySelector('.bt-igual').addEventListener('click', result);