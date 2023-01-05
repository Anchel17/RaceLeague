const modalEquipe = document.querySelector(".container-modal");
const tbody = document.querySelector("tbody");
const teamName = document.querySelector("#modal-team-name");
const teamHome = document.querySelector("#modal-team-home");
const teamBudget = document.querySelector("#modal-team-budget");
const saveTeamBtn = document.querySelector("#salvar");

//armazena as equipes do banco localstorage
let teams;

//armazena os indices para fazer as ações de edição
let id;

const getEquipesBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setEquipesBD = () => localStorage.setItem('dbfunc', JSON.stringify(teams));

function loadTeams(){
    teams = getEquipesBD();
    tbody.innerHTML = '';

    teams.forEach((team, index) => {
        insertTeam(team, index);
    })
}

loadTeams();

function openModal(){
    modalEquipe.classList.add('active');

    modalEquipe.onclick = e =>{
        if(e.target.className.indexOf('container-modal') != -1){
            modalEquipe.classList.remove('active');
        }
    }

    teamName.value = '';
    teamHome.value = '';
    teamBudget.value = '';
}

function insertTeam(team, index){
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${team.name}</td>
        <td>${team.home}</td>
        <td>${team.budget}</td>
        <td class="acao">
            <button onclick="editTeam(${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="excludeTeam(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `

    tbody.appendChild(tr);
}

function editTeam(index){
    modalEquipe.classList.add('active');

    modalEquipe.onclick = e =>{
        if(e.target.className.indexOf('container-modal') != -1){
            modalEquipe.classList.remove('active');
        }
    }

    teamName.value = teams[index].name;
    teamHome.value = teams[index].home;
    teamBudget.value = teams[index].budget;
    id = index;
}

function excludeTeam(index){
    teams.splice(index, 1);
    
    setEquipesBD();
    loadTeams();
}

saveTeamBtn.onclick = e => {
    if(teamName == '' || teamHome == '' || teamBudget == ''){
        return;
    }

    e.preventDefault();

    if(id != undefined){
        teams[id].name = teamName.value;
        teams[id].home = teamHome.value;
        teams[id].budget = teamBudget.value;
    }
    else{
        teams.push({'name': teamName.value, 'home': teamHome.value, 'budget': teamBudget.value});
    }

    setEquipesBD();

    modalEquipe.classList.remove('active');

    loadTeams();
    id = undefined;
}