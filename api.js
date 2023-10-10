let container = document.querySelector('#container')
let btn = document.querySelector('.button-search')
let input = document.querySelector('.input')
const p = document.querySelector('#descricao')
const user = document.getElementById('user')
// const img = document.querySelector('#avatar')
// const repos = document.querySelector('#repos')

btn.addEventListener("click", ()=> {
    if (input.value == "") {
        alert("Preencha corretamente")
    } else {
        container.style.display = "none"; // Esconder o contêiner inicialmente
        searchUser();
    }
});

function searchUser() {
    const input = document.querySelector('.input').value;
    const apiUrl = `https://api.github.com/users/${input}`;

    fetch(apiUrl)
        .then(response => {
            if (response.status === 404) {
                container.style.display = "none"; // Esconder o contêiner se o usuário não for encontrado
                alert('Usuário não encontrado. Por favor, insira um nome de usuário válido do GiHub!');
                throw new Error('Usuário não encontrado');
            }
            return response.json();
        })
        .then(data => {
            container.style.display = "flex"; // Mostrar o contêiner apenas se o usuário for encontrado
            const avatar = data.avatar_url;
            user.textContent = data.name;
            p.textContent = data.bio;
            const reposUrl = data.repos_url;

            document.getElementById('avatar').src = avatar;

            // Fetching repositories
            fetch(reposUrl)
                .then(response => response.json())
                .then(repos => {
                    const reposList = document.getElementById('repos');
                    reposList.innerHTML = '';
                    repos.forEach(repo => {
                        const li = document.createElement('li');
                        const repoLink = document.createElement('a');
                        repoLink.href = repo.html_url;
                        repoLink.textContent = repo.name;
                        repoLink.target = '_black';
                        li.appendChild(repoLink);
                        reposList.appendChild(li);
                    });
                })
                .catch(error => {
                    console.error('Erro ao buscar repositórios:', error);
                });
        })
        .catch(error => {
            console.error(error.message);
        });
}


