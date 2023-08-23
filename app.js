const addBtn = document.getElementById('add');
const tacheInput = document.getElementById('tache');
const todoList = document.querySelector('ul');

const taches = JSON.parse(localStorage.getItem('taches')) || []; //récupérer le tableau tache ou on a stocker les anciennes taches

//Afficher tt les taches qu'on a stocké
function afficherTaches() {
  todoList.innerHTML = ''; //supprimer les anciennes taches de notre code html pour qu'on ai pas de doublons
  taches.forEach((tache, index) => { //on va afficher chaque tache du tableau taches a notre ecran
    const li = document.createElement('li');
    let backgroundColor //on va alterner entre deux couleur de fond pout=r chaque tache
   if (index%2===0){
     backgroundColor="rgb(251, 34, 34) "
   }else{
     backgroundColor=" rgb(245, 245, 220)"
   }
    li.style.backgroundColor = backgroundColor;
    li.innerHTML = `
      <p id="nomTache">${tache}</p>
      <input type="button" value="DELETE"  id = "delete"class="delete" data-index="${index}">
      <input type="button" value="EDIT" id = "edit" class="edit" data-index="${index}">
    `;
    todoList.appendChild(li);
  });
}

// ajouter une  tache
function ajouterTache() {
  if (tacheInput.value.trim() !== '') { //verifier que la tache n'est pas vide
    taches.push(tacheInput.value); //ajouter la nouvelle tache a notre tabeau taches
    localStorage.setItem('taches', JSON.stringify(taches)); //stocker le tableau taches puique on la modifié
    afficherTaches(); // afficher le nouveau tableau tache
    tacheInput.value = '';//remmetre à blanc
  }
}

// supprimer une tache
function suprimerTache(index) {
  taches.splice(index, 1); //supprimer la tache de notre tableau tache
  localStorage.setItem('taches', JSON.stringify(taches));
  afficherTaches();
}

// Edit tache
function modifierTache(index) {
  const newtache = prompt('Edit tache:', taches[index]); //demander a l'utilisateur d'introduire le nouveau nom de la tache
  if (newtache !== null) {
    taches[index] = newtache;//modifier le nom de la tache dans notre tableau taches
    localStorage.setItem('taches', JSON.stringify(taches));
    afficherTaches();
  }
}

// Add event listeners
addBtn.addEventListener('click', ajouterTache);
todoList.addEventListener('click', (event) => {//utiliser un seul event listener pur modifier et supprimer une tache
  if (event.target.classList.contains('delete')) {
    suprimerTache(event.target.getAttribute('data-index'));
  }
  if (event.target.classList.contains('edit')) {
    modifierTache(event.target.getAttribute('data-index'));
  }
});

// afficher les anciennes taches
afficherTaches(); 
