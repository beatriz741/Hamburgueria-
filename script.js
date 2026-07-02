const botao = document.getElementById("carregarBtn");
const lista = document.getElementById("listaPromocoes");

botao.addEventListener("click", carregarPromocoes);

async function carregarPromocoes() {
    // 1. Desativa o botão e muda o texto para o usuário saber que está carregando
    botao.disabled = true;
    botao.textContent = "Carregando...";
    lista.innerHTML = "<li>Carregando promoções...</li>";

    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar promoções");
        }

        const dados = await resposta.json();

        // Limpa o texto de "Carregando..."
        lista.innerHTML = "";

        // Renderiza os 5 primeiros itens
        dados.slice(0, 5).forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.title; // Dica: mude a URL da API depois para uma que traga lanches reais!
            lista.appendChild(li);
        });

    } catch (erro) {
        console.error(erro);
        // CORREÇÃO HTML: Inserindo o texto de erro obrigatoriamente dentro de uma tag <li>
        lista.innerHTML = "<li>Não foi possível carregar as promoções. Tente novamente.</li>";
    } finally {
        // 2. Reativa o botão original independentemente de ter dado certo ou errado
        botao.disabled = false;
        botao.textContent = "Carregar Promoções";
    }
}
