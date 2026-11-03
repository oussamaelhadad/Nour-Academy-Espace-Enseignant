import { eleves, groupes } from "./data.js";

import "./style.css";

function calculerMoyenne(notes) {
    if (notes.length === 0) {
        return null;
    }

    const total = notes.reduce((resultat, note) => resultat + note, 0);

    return total / notes.length;
}


function creerLigne(eleve) {

    const li = document.createElement("li");

    li.classList.add("rounded-2xl", "bg-card", "p-4", "ring-1", "ring-line");


    const nom = document.createElement("h3");

    nom.textContent = `${eleve.prenom} ${eleve.nom}`;


    const absences = document.createElement("p");

    absences.textContent = `Absences : ${eleve.absences}`;


    const moyenne = calculerMoyenne(eleve.notes);

    const moyenneElement = document.createElement("p");

    if (moyenne === null) {
        moyenneElement.textContent = "Moyenne : —";
    } else {
        moyenneElement.textContent =
            `Moyenne : ${moyenne.toFixed(1).replace(".", ",")} / 20`;
    }

const boutonAbsent = document.createElement("button");

boutonAbsent.type = "button";
boutonAbsent.textContent = "Absent";
boutonAbsent.dataset.id = eleve.id;

boutonAbsent.classList.add(
    "rounded-xl",
    "bg-brand",
    "px-4",
    "py-2",
    "text-white",
    "text-sm",
    "cursor-pointer"
);

const boutonNote = document.createElement("button");

boutonNote.type = "button";
boutonNote.textContent = "Ajouter une note";
boutonNote.dataset.id = eleve.id;

boutonNote.classList.add(
    "rounded-xl",
    "border",
    "border-line",
    "bg-card",
    "px-4",
    "py-2",
    "text-ink",
    "text-sm",
    "cursor-pointer"
);

    li.append(nom, absences, moyenneElement, boutonAbsent, boutonNote);

    return li;
}


function afficherEleves(listeEleves = eleves) {

    const liste = document.getElementById("liste-eleves");

    liste.textContent = "";

    const lignes = listeEleves.map(creerLigne);

    liste.append(...lignes);

    const compteur = document.getElementById("compteur");

    compteur.textContent = `${listeEleves.length} élèves`;
}

afficherEleves();

const recherche = document.getElementById("recherche");
const filterGroup = document.getElementById("filtre-groupe");

groupes.forEach(function (groupe) {

    const option = document.createElement("option");

    option.value = groupe.id;

    option.textContent = groupe.nom;

    filterGroup.appendChild(option);

});


const tri = document.getElementById("tri");

