const APIURL = 'https://api.github.com/users/';
//axios is nothing but to communicate with third party and it is a javascript framework
const main = document.getElementById('main');
const form=document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username){
    try{
    const {data} = await axios(APIURL + username);
    createUserCard(data);
    getRepos(username);
}catch(err){
   if(err.response.status==404){
    createErrorCard("No profile for this user-name");
   }
}
}

async function getRepos(username){
    try {
        const {data} = await axios(APIURL+username+"/repos?sort=created");

        addReposToCard(data);
    }catch(error){
        createErrorCard('Problem in fetching the repository')
    }
    }
function createUserCard(user){
    const cardHTML = `
    <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers} <b>Followers</b></li>
            <li>${user.following}<b>Following</b></li>
            <li>${user.public_repos}<b>Respositories</b></li>
        </ul>
        <div id="repos">
           
        </div>
    </div>
</div>`
main.innerHTML = cardHTML;
}
function createErrorCard(msg){
    const cardHTML=`
    <div class="card">
    <h1>${msg}</h1>
    </div>`
    main.innerHTML = cardHTML
}
function addReposToCard(repos){
    const reposEl = document.getElementById("repos");
    repos.slice(0,5).forEach((repo)=> {
        const repoEL = document.createElement("a");
        repoEL.classList.add('repo');
        repoEL.href = repo.html_url;
        repoEL.target="_blank";
        repoEL.innerText = repo.name;
        reposEl.appendChild(reposEl);
    })
}
form.addEventListener('submit',(e)=> {
    e.preventDefault();

    const user = search.value;
    if(user){
        getUser(user);
        search.value='';
    }
})
