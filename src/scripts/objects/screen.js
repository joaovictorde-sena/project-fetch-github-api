const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                            <img src = "${
                              user.avatarUrl
                            }" alt"foto do perfil do usuário" /> 
                            <div class="data">
                                <h1>${
                                  user.name ?? "Não possui nome cadastrado 😥"
                                }</h1>
                                <p>${
                                  user.bio ?? "Não possui bio cadastrada 😥"
                                }</p>
                                <p>Seguidores: ${user.followers}</p> 
                                <p>Seguindo: ${user.following}</p> 
                            </div>
                        </div>`;

    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li> <a href="${repo.html_url}" target="_blank"><p class="name">${repo.name}</p><div class="all-infos"> <p class="infos">🍴${repo.forks}</p> 
                                                     <p class="infos">⭐${repo.stargazers_count}</p> <p class="infos">👀${repo.watchers_count}</p> <p class="infos">💻${repo.language}<p/></div></a>
                                                 </li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                                            <h2>Repositórios</h2>
                                                            <ul>${repositoriesItens}</ul>
                                                            </div>`;
    }

    let eventsItens = ""
        user.events.forEach((event => {
            if(event.type === 'CreateEvent'){ 
                eventsItens += `<li><span>${event.repo.name}</span> - Sem mensagem de commit</li>`
            } else if (event.type === 'PushEvent') { 
                eventsItens += `<li><span>${event.repo.name}</span> - ${event.payload.commits[0].message}</li>`
            } else{ 
                eventsItens += `<li>${event.repo.name}`
            }
        }) )

        if(user.events.length > 0){ 
            this.userProfile.innerHTML += `<div class="events">
                                                                <h2>Eventos</h2>
                                                                <ul class="event-list">${eventsItens}</ul>`
        }
    },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
