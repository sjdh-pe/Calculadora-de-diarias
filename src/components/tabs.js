export function iniciarTabs() {
    const botoes = Array.from(document.querySelectorAll('.tab-btn'));
    const conteudos = document.querySelectorAll('.tab-content');

    function ativar(botao) {
        conteudos.forEach(c => c.classList.remove('active'));
        botoes.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            b.tabIndex = -1;
        });

        const abaAlvo = botao.getAttribute('data-target');
        const painel = document.getElementById(abaAlvo);

        botao.classList.add('active');
        botao.setAttribute('aria-selected', 'true');
        botao.tabIndex = 0;
        if (painel) painel.classList.add('active');
    }

    botoes.forEach((botao, indice) => {
        botao.addEventListener('click', (evento) => {
            ativar(evento.currentTarget);
            evento.currentTarget.focus();
        });

        botao.addEventListener('keydown', (evento) => {
            let alvo = null;

            switch (evento.key) {
                case 'ArrowRight':
                    alvo = botoes[(indice + 1) % botoes.length];
                    break;
                case 'ArrowLeft':
                    alvo = botoes[(indice - 1 + botoes.length) % botoes.length];
                    break;
                case 'Home':
                    alvo = botoes[0];
                    break;
                case 'End':
                    alvo = botoes[botoes.length - 1];
                    break;
                default:
                    return;
            }

            evento.preventDefault();
            ativar(alvo);
            alvo.focus();
        });
    });
}
