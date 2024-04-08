// Sélection des éléments HTML nécessaires
let nouvelleTacheInput = document.getElementById("nouvelle-tache");
let listeTaches = document.getElementById("liste-taches");
let calendrier = document.getElementById("calendrier");
let priorite = document.getElementById("priorite");
let image = document.querySelector(".image"); // Sélection de l'élément de l'image

// Fonction pour ajouter une tâche
function ajouter() {
  // Récupération des valeurs des champs de saisie
  let task = nouvelleTacheInput.value.trim();
  let calendrierContent = calendrier.value.trim();
  let prioriteContent = priorite.value.trim();

  // Vérification si le champ de saisie est vide
  if (!task) {
    alert("Merci de taper quelque chose");
    console.log("Ok");
    return;
  }

  // Création de l'objet tâche avec les informations saisies
  let taskObj = {
    task: task,
    calendrier: calendrierContent,
    priorite: prioriteContent,
  };

  // Ajout de la tâche à la liste
  ajouterTacheToListe(taskObj);

  // Réinitialisation des champs de saisie
  nouvelleTacheInput.value = "";
  calendrier.value = "";
  priorite.value = "";

  // Cacher l'image si la liste des tâches n'est pas vide
  if (listeTaches.children.length > 0) {
    image.style.display = "none"; // Cacher l'image
  } else {
    image.style.display = "block"; // Afficher l'image
  }
}

// Fonction pour ajouter une tâche à la liste
function ajouterTacheToListe(taskObj) {
  let li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span class="task-text">${taskObj.task}</span>
      <span class="task-text">${taskObj.calendrier}</span>
      <span class="task-text">${taskObj.priorite}</span>
    </label>
    <button class="supprimer-btn">Supprimer</button>
  `;

  // Ajout de l'élément li à la liste des tâches
  listeTaches.appendChild(li);

  // Attacher un gestionnaire d'événements pour le bouton de suppression
  let supprimerBtn = li.querySelector(".supprimer-btn");
  supprimerBtn.addEventListener("click", function () {
    // Supprimer l'élément parent (li) de la liste
    li.remove();
    // Afficher l'image si la liste des tâches est vide après suppression
    if (listeTaches.children.length === 0) {
      image.style.display = "block"; // Afficher l'image
    }
  });

  // Attacher un gestionnaire d'événements pour la case à cocher
  let checkbox = li.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      li.classList.add("task-checked");
    } else {
      li.classList.remove("task-checked");
    }
  });
}

// Gestionnaire d'événement pour ajouter une tâche en appuyant sur la touche "Enter"
if (nouvelleTacheInput) {
  nouvelleTacheInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      ajouter();
    }
  });
}

// Charger les tâches existantes depuis le stockage local lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Ajouter chaque tâche sauvegardée à la liste des tâches
  savedTasks.forEach(function (taskObj) {
    ajouterTacheToListe(taskObj);
  });

  // Cacher l'image si la liste des tâches n'est pas vide après le chargement
  if (listeTaches.children.length > 0) {
    image.style.display = "none"; // Cacher l'image
  }
});

// Fonction pour sauvegarder les tâches dans le stockage local
function sauvegarderTaches() {
  let taches = [];
  let listeTachesItems = listeTaches.querySelectorAll("li");

  // Parcourir chaque élément de la liste des tâches et sauvegarder les informations
  listeTachesItems.forEach(function (item) {
    let task = item.querySelector("span:nth-child(1)").textContent;
    let calendrier = item.querySelector("span:nth-child(2)").textContent;
    let priorite = item.querySelector("span:nth-child(3)").textContent;

    // Ajouter les informations de la tâche à l'objet taches
    taches.push({
      task: task,
      calendrier: calendrier,
      priorite: priorite,
    });
  });

  // Sauvegarder l'objet taches dans le stockage local au format JSON
  localStorage.setItem("tasks", JSON.stringify(taches));
}

// Ajouter un gestionnaire d'événements pour la sauvegarde des tâches lors de la fermeture de la page ou du rechargement
window.addEventListener("beforeunload", sauvegarderTaches);
