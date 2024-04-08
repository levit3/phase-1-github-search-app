const form = document.getElementById("github-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = form.search.value;
  fetch(`https://api.github.com/search/users?q=${user}`)
    .then((res) => res.json())
    .then((data) => showUserInfo(data.items[0]));
});

function showUserInfo(data) {
  const container = document.getElementById("user-list");
  const list = document.createElement("li");
  list.innerHTML = `
  <p>UserName: ${data.login}</p>
  <img src=${data.avatar_url} alt="avatar"/>
  `;
  container.appendChild(list);
  getRepoData(data);
}

function getRepoData(data) {
  fetch(`https://api.github.com/users/${data.login}/repos`)
    .then((res) => res.json())
    .then((repo) => repoRedirect(repo));
}

function repoRedirect(repo) {
  const container = document.getElementById("repos-list");
  repo.forEach((repos) => {
    const list = document.createElement("li");
    list.innerHTML = `
    <p>Repository Name : ${repos.name}</p>
    <p>Repo URL: <a href=${repos.html_url}>${repos.name}</a></p>
    <p>Repository Forks: <a href=${repos.forks_url}>Forks</a></p>
    <br>
    `;
    container.appendChild(list);
  });
}
