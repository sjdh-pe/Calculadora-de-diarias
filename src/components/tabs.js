export function iniciarTabs() {
    const botoes = document.querySelectorAll('.tab-btn');
    const conteudos = document.querySelectorAll('.tab-content');

    botoes.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            // Remove a classe 'active' de todos
            conteudos.forEach(c => c.classList.remove('active'));
            botoes.forEach(b => b.classList.remove('active'));

            // Pega o ID alvo no botão clicado e ativa
            const abaAlvo = evento.currentTarget.getAttribute('data-target');
            evento.currentTarget.classList.add('active');
            document.getElementById(abaAlvo).classList.add('active');
        });
    });
}