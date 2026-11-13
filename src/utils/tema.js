const CHAVE = 'tema';

function escuroAtivo() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function aplicar(tema) {
  const escuro = tema === 'escuro';

  if (escuro) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  const botao = document.getElementById('temaBtn');
  if (!botao) return;

  botao.setAttribute('aria-pressed', String(escuro));

  const rotulo = botao.querySelector('.sr-only');
  if (rotulo) {
    rotulo.textContent = escuro ? 'Alternar para tema claro' : 'Alternar para tema escuro';
  }
}

export function iniciarTema() {
  const botao = document.getElementById('temaBtn');
  if (!botao) return;

  // Reflete o estado já aplicado pelo script inline do index.html
  aplicar(escuroAtivo() ? 'escuro' : 'claro');

  botao.addEventListener('click', () => {
    const proximo = escuroAtivo() ? 'claro' : 'escuro';
    aplicar(proximo);
    try {
      localStorage.setItem(CHAVE, proximo);
    } catch (erro) {
      /* armazenamento indisponível — ignora */
    }
  });

  // Segue o sistema enquanto o usuário não escolher manualmente
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (evento) => {
      let salvo = null;
      try {
        salvo = localStorage.getItem(CHAVE);
      } catch (erro) {
        /* ignora */
      }
      if (salvo) return;
      aplicar(evento.matches ? 'escuro' : 'claro');
    });
  }
}
