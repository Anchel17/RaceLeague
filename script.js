const modalEquipe = document.querySelector(".container-modal");
const tbody = document.querySelector("tbody");
const teamName = document.querySelector("#modal-team-name");
const teamCity = document.querySelector("#modal-team-city");
const teamCountry = document.querySelector("#modal-team-country");
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
    teamCity.value = '';
    teamCountry.value = '';
    teamBudget.value = '';
}



function insertTeam(team, index){
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${team.name}</td>
        <td>${team.city}, ${team.country}</td>
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
    teamCity.value = teams[index].city;
    teamCountry.value = teams[index].country;
    teamBudget.value = teams[index].budget;
    id = index;
}

function excludeTeam(index){
    teams.splice(index, 1);

    setEquipesBD();
    loadTeams();
}

saveTeamBtn.onclick = e => {
    teamName.value = teamName.value.trim();
    teamCity.value = teamCity.value.trim();
    teamCountry.value = teamCountry.value.trim();
    teamBudget.value = teamBudget.value.trim();

    if(teamName.value == '' || teamCity.value == '' || teamCountry.value == '' || teamBudget.value == ''){
        return;
    }

    e.preventDefault();

    if(id != undefined){
        teams[id].name = teamName.value;
        teams[id].city = teamCity.value;
        teams[id].country = teamCountry.value;
        teams[id].budget = teamBudget.value;
    }
    else{
        teams.push({'name': teamName.value, 'city': teamCity.value, 'country': teamCountry.value, 'budget': teamBudget.value});
    }

    setEquipesBD();

    modalEquipe.classList.remove('active');

    loadTeams();
    id = undefined;
}

jQuery(
    function() {
    jQuery("#modal-team-budget").maskMoney({
	prefix:'USD ', 
	thousands:'.', 
	decimal:',',
    reverse: true
    })},
    function(){
        $input.on('keyup', function (e) {
            e = e || window.event;
            var key = e.which || e.charCode || e.keyCode,
            keyPressedChar,
            selection,
            startPos,
            endPos,
            value;
            selection = getInputSelection();
            startPos = selection.start;
            maskAndPosition(startPos + 1);
            });
    }
);

