const proposer = document.getElementById("analyser");

//rentrée

let salaire = document.getElementById("salaire");

//charge fixe
let loyer = document.getElementById("loyer");
let elec_gaz = document.getElementById("electricite_gaz");
let assu_habitation = document.getElementById("assurance_habitation");
let assu_voiture = document.getElementById("assurance_voiture");
let abonnement = document.getElementById("abonnement");

//charge extensible
let course = document.getElementById("course_alimentaire");
let loisir = document.getElementById("loisir");

//array contient toute les entrées

proposer.addEventListener("click", (e) => {
    e.stopPropagation();
    let arrayClient = [];
    arrayClient.push(
        { name: salaire.id, price: salaire.value },
        { name: loyer.id, price: loyer.value },
        { name: elec_gaz.id, price: elec_gaz.value },
        { name: elec_gaz.id, price: elec_gaz.value },
        { name: assu_voiture.id, price: assu_voiture.value },
        { name: abonnement.id, price: abonnement.value },
        { name: course.id, price: course.value },
        { name: loisir.id, price: loisir.value }
    );
    console.log(arrayClient);
});