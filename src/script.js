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

    li.classList.add(
        "rounded-2xl",
        "bg-card",
        "p-4",
        "ring-1",
        "ring-line"
    );

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
    boutonAbsent.dataset.action = "absent";

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
    boutonNote.dataset.action = "note";

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

    // Vérifier les absences
    if (eleve.absences >= 3) {

        li.classList.add("ring-2", "ring-red-500");

        const badge = document.createElement("span");
        badge.textContent = "Prévenir les parents";

        badge.classList.add(
            "rounded-full",
            "bg-red-100",
            "px-3",
            "py-1",
            "text-red-700",
            "text-sm"
        );

        li.appendChild(badge);
    }

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


function filtrer() {
    const texte = recherche.value.toLowerCase().trim();
    const groupeChoisi = filterGroup.value;
    const tri = document.getElementById("tri");
    
    const elevesFiltrer = eleves.filter(function (eleve) {

        if ( eleve.prenom.toLowerCase().includes(texte) || eleve.nom.toLowerCase().includes(texte)) {
            if (groupeChoisi === "" || eleve.groupeId === Number(groupeChoisi)) {
                return true; 
            } 
            else { return false;
            }
        } 
        else {return false;
        }

    });


    const choixTri = tri.value;

    if (choixTri === "nom") {
    elevesFiltrer.sort(function (a, b) {
        return a.nom.localeCompare(b.nom);
    });
    }
    else if (choixTri === "moyenne") {
    elevesFiltrer.sort(function (a, b) {
        return calculerMoyenne(b.notes) - calculerMoyenne(a.notes);
    });
    }


    afficherEleves(elevesFiltrer);
}

recherche.addEventListener("input", filtrer);
filterGroup.addEventListener("change", filtrer);
tri.addEventListener("change", filtrer);


const liste = document.getElementById("liste-eleves");

liste.addEventListener("click", function (event) {

    const bouton = event.target.closest("button[data-action]");

    if (!bouton || !liste.contains(bouton)) {
        return;
    }

    const id = bouton.dataset.id;

    const eleve = eleves.find(function (eleve) {
        return eleve.id === Number(id);
    });

    const ancienneLigne = bouton.closest("li");

    if (bouton.dataset.action === "absent") {

        eleve.absences++;

    } else if (bouton.dataset.action === "note") {

        const noteV = prompt("Entrez la note de l'élève :");

        if (noteV === null || noteV.trim() === "") {
            return;
        }

        const note = Number(noteV);

        if (isNaN(note) || note < 0 || note > 20) {
            alert("Veuillez entrer une note entre 0 et 20");
            return;
        }

        eleve.notes.push(note);
    }

    const nouvelleLigne = creerLigne(eleve);
    ancienneLigne.replaceWith(nouvelleLigne);

});