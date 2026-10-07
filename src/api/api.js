export async function salvarDiaria(dadosDaDiaria) {
    const urlDaApi = '/api/calculo_diarias/registrar';
    const resposta = await fetch(urlDaApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosDaDiaria)
    });

    if (!resposta.ok) {
        throw new Error(`Erro ao salvar na API: status ${resposta.status}`);
    }

    return resposta.json();
}