const proposer = document.getElementById("analyser");
const inputSlide = document.querySelectorAll(".container-item>input");

// variables
let arrayClient = [];
let salaire = 0;
let economie;
let arrayDepense = [];

//rentrée

let salaireInput = document.getElementById("salaire");

//charge fixe
let loyer = document.getElementById("loyer");
let elec_gaz = document.getElementById("electricite_gaz");
let assu_habitation = document.getElementById("assurance_habitation");
let assu_voiture = document.getElementById("assurance_voiture");
let abonnement = document.getElementById("abonnement");

//charge extensible
let course = document.getElementById("course_alimentaire");
let loisir = document.getElementById("loisir");

// crée un tableau qui contient l'ensemble des inputs si tout les input sont rempli et si le salaire est suppérieur ou égale aux dépenses
function createTableauInput() {
    if(verifInput() == true) {
        if(verifSalaire() == true){
            arrayClient=[];
            arrayClient.push(
                {name: salaireInput.id, price: salaireInput.value},
                {name: loyer.id, price: loyer.value},
                {name: elec_gaz.id, price: elec_gaz.value},
                {name: elec_gaz.id, price: elec_gaz.value},
                {name: assu_voiture.id, price: assu_voiture.value},
                {name: abonnement.id, price: abonnement.value},
                {name: course.id, price: course.value},
                {name: loisir.id, price: loisir.value}
            );
            console.log(arrayClient);
        }else{
            alert("Votre salaire est inférieur à vos dépenses");
        }
    }else{
        alert("Une de vos données est négative ou n'est pas valide");
    }
}

// vérifie si chaque input rentré est bien un nombre positif
function verifInput() {
    let masque = /^[\d]+$/;
    let compteur = 0;
    for (let input of inputSlide){
        if(masque.test(input.value)){
            compteur++; 
        }  
    }
    if(compteur == inputSlide.length){
        return true;
    } else {
        return false;
    }
}

// verifie si le salaire est bien supéreiur à l'ensemble des charges et met à jour la variable economie
function verifSalaire() {
    let somme = 0;
    for (let input of inputSlide){
        if(input.id == "salaire"){
            salaire = parseInt(input.value, 10);
        } else {
            somme += parseInt(input.value, 10);
            arrayDepense.push(parseInt(input.value, 10));
        }
    }
    economie = salaire - somme;
    arrayDepense.push(economie);
    console.log(economie);
    if(Math.sign(economie) == -1){
        return false;
    } else {
        return true;
    }
}


//array contient toute les entrées

proposer.addEventListener("click", (e) => {
    e.stopPropagation();
    createTableauInput();
});