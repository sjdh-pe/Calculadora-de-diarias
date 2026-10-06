export async function salvarDiaria(dadosDaDiaria) {
    const urlDaApi = 'http://localhost:8000/calculo_diarias/registrar'; 

    try {
        const resposta = await fetch(urlDaApi, {
            method: 'POST', // Método de inserção
            headers: {
                'Content-Type': 'application/json' // Avisa a API que estamos enviando JSON
            },
            body: JSON.stringify(dadosDaDiaria) // Converte o objeto JS para texto JSON
        });

        // Verifica se a API retornou algum erro (ex: 400 Bad Request, 500 Internal Server Error)
        if (!resposta.ok) {
            throw new Error(`Erro ao salvar na API: status ${resposta.status}`);
        }

        const resultado = await resposta.json();
        console.log("Diária inserida com sucesso no SQLite:", resultado);
        return resultado;

    } catch (erro) {
        console.error("Erro de comunicação com o backend:", erro);
    }
}