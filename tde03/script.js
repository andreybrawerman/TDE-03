const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsContainer = document.getElementById('posts-container');
const errorMsg = document.getElementById('error-msg');
const postResult = document.getElementById('post-result');

async function buscarPosts() {
    try {
        errorMsg.style.display = 'none';
        postsContainer.innerHTML = 'Carregando...';

        const response = await fetch(API_URL + '?_limit=5');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        renderizarPosts(data);

    } catch (error) {
        console.error('Falha ao buscar:', error);
        postsContainer.innerHTML = '';
        errorMsg.innerText = 'Erro ao buscar dados: ' + error.message;
        errorMsg.style.display = 'block';
    }
}

async function criarPost() {
    const titleInput = document.getElementById('post-title').value;

    if(!titleInput) {
        alert("Digite um título!");
        return;
    }

    const novoPost = {
        title: titleInput,
        body: 'Conteúdo de exemplo criado via Javascript',
        userId: 1,
    };

    try {
        postResult.innerText = 'Enviando...';

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(novoPost),
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar: ${response.status}`);
        }

        const data = await response.json();
        
        postResult.className = 'success';
        postResult.innerText = `Sucesso! Post ID ${data.id} criado com título: "${data.title}"`;

    } catch (error) {
        postResult.className = '';
        postResult.style.color = 'red';
        postResult.innerText = 'Erro ao criar post.';
        console.error(error);
    }
}

function renderizarPosts(posts) {
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = '<h4>' + post.title + '</h4><p>' + post.body + '</p>';
        postsContainer.appendChild(div);
    });
}