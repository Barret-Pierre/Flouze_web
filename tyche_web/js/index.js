const proposer = document.getElementById("analyser");
const inputSlide = document.querySelectorAll(".container-item>input");

// variables
let arrayClient = [];
let salaire = 0;
let economie;
let arrayDepenseEconomie = [];

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


// Variable Dom graphique
const message = document.getElementById('message');
const optimiser = document.getElementById('optimiser');
const canvasHistogram = document.getElementById('histogram').getContext('2d');
const canvasDonut = document.getElementById('donuts').getContext('2d');

let Optim = [];
let priceOld = [];


// Constante offres
let assHab = {
    name: assu_habitation.id,
    price: 15
}
let telAb = {
    name: abonnement.id,
    price: 20
}
let assVoi = {
    name: assu_voiture.id,
    price: 37
}
let elecGaz = {
    name: elec_gaz.id,
    price: 71
}
// On pourra Rajouter plus tard un système de comparaison avec les course et les loisirs
// let courAli = {
//     name: course.id,
//     price: 200
// }
// let loiDiv = {
//     name: loisir.id,
//     price: 55
// }

// constante tableau regroupant l'ensemble de nos offres
let nosOffres = [assHab, telAb, assVoi, elecGaz];


// crée un tableau qui contient l'ensemble des inputs si tout les input sont rempli et si le salaire est suppérieur ou égale aux dépenses
function createTableauInput() {
    if (verifInput() == true) {
        if (verifSalaire() == true) {
            arrayClient = [];
            arrayClient.push(
                { name: salaireInput.id, price: salaireInput.value },
                { name: loyer.id, price: loyer.value },
                { name: elec_gaz.id, price: elec_gaz.value },
                { name: assu_habitation.id, price: assu_habitation.value },
                { name: assu_voiture.id, price: assu_voiture.value },
                { name: abonnement.id, price: abonnement.value },
                { name: course.id, price: course.value },
                { name: loisir.id, price: loisir.value }
            );
            console.log(arrayClient);
            return true
        } else {
            alert("Votre salaire est inférieur à vos dépenses");
        }
    } else {
        alert("Une de vos données est négative ou n'est pas valide");
    }
}

// vérifie si chaque input rentré est bien un nombre positif
function verifInput() {
    let masque = /^[\d]+$/;
    let compteur = 0;
    for (let input of inputSlide) {
        if (masque.test(input.value)) {
            compteur++;
        }
    }
    if (compteur == inputSlide.length) {
        return true;
    } else {
        return false;
    }
}

// verifie si le salaire est bien supéreiur à l'ensemble des charges 

function verifSalaire() {
    let somme = 0;
    arrayDepenseEconomie = [];
    for (let input of inputSlide) {
        if (input.id == "salaire") {
            salaire = parseInt(input.value, 10);
        } else {
            // sépare les dépense du salaire et les range dans le tableau arrayDepenseEconomie
            somme += parseInt(input.value, 10);
            arrayDepenseEconomie.push(parseInt(input.value, 10));
        }
    }
    // calcule la variable economie et la pousse dans le tableau arrayDepenseEconomie
    economie = salaire - somme;
    arrayDepenseEconomie.push(economie);
    console.log(economie);

    // indique si le signe est positif ou négatif
    if (Math.sign(economie) == -1) {
        return false;
    } else {
        return true;
    }
}


let benefPossibleMensuel = 0;

//calcul le bénefice mensuel et annuel possible de nos offres par rapport aux offres du client
function calculBenef() {
    benefPossibleMensuel = 0;
    for (let i = 0; i < Optim.length; i++) {
        benefPossibleMensuel = benefPossibleMensuel + (Optim[i].priceold - Optim[i].pricenew);
    }

    let benefPossibleAnnuel = benefPossibleMensuel * 12;
    if (Math.sign(benefPossibleMensuel) >= 0) {
        message.innerHTML = "Nous avons trouvé un certain nombres d'offres suscebtible de vous faire économiser " + benefPossibleMensuel + "€ par mois, cela équivaudrait à une économie de " + benefPossibleAnnuel + '€ à l\'année';
    } else {
        message.innerHTML = "Vous bénéficiez déjà des meilleurs offres"

    }
};

//crée l tableau optim (qui contient des objets {le nom des offres avec leur ancien et nouveau pris]) et priceOld (qui chaque prix des offre du client)
function optimPriceOld() {
    priceOld = [];
    Optim = [];
    for (let i = 0; i < nosOffres.length; i++) {
        for (let j = 0; j < arrayClient.length; j++) {
            if (arrayClient[j].name == nosOffres[i].name) {
                if (arrayClient[j].price > nosOffres[i].price) {
                    Optim.push({ name: nosOffres[i].name, priceold: arrayClient[j].price, pricenew: nosOffres[i].price });
                }
                priceOld.push(arrayClient[j].price);
            }
        }
    }
}

// ******************************************* Graphic Donut *******************************************

var donutChart;
var donutIs = false;
var donutBlock = document.querySelector("#donutBlock");

// Affiche le graphique
function showDonut() {
    donutBlock.style.display = "block";
}

// Cache le graphique
function hideDonut() {
    donutBlock.style.display = "none";
}

// fonction qui crée un graphique donut

function donuts() {
    var data = {
        labels: ["Loyer",
            "Electricité et gaz",
            "Assurance habitation",
            "Assurance voiture",
            "Course alimentaire",
            "Téléphone et internet",
            "Loisirs",
            "Ce qu'il vous reste",
        ],
        datasets: [
            {
                backgroundColor: [
                    '#333333',
                    '#777777',
                    '#ebd28e',
                    '#FBE29D',
                    '#FAD775',
                    '#F9CB4D',
                    '#F8C025',
                    '#9de1c2'],
                data: arrayDepenseEconomie
            },
        ]
    }
    var config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'left',
                    align: 'center',
                    labels: {
                        usePointStyle: "true"
                    }
                }
            }
        }
    }
    document.querySelector("#donutBlock").style.display = "block";
    donutChart = new Chart(canvasDonut, config)
    donutIs = true;
}

// supprime le graph donut
function deleteDonut() {
    if (donutIs == true) {
        donutChart.destroy();
    }
}

// ******************************************* Graphic Histogram *******************************************

var histogramChart;
var histogramIs = false;
var histogramBlock = document.querySelector("#histogramBlock");

// Affiche l'histogramme
function showHistogram() {
    histogramBlock.style.display = "block";
}


// Cache l'histogtramme
function hideHistogram() {
    histogramBlock.style.display = "none";
}
// fonction qui crée un graphique histogramme

function histogram() {

    var data = {
        labels: ["Assurance habitation",
            "Téléphone et internet",
            "Assurance voiture",
            "Electricité et gaz",
            // "Course alimentaire",
            // "Loisirs"
        ],
        datasets: [
            {
                label: 'Nos offres',
                backgroundColor: '#9de1c2',
                borderColor: '#9de1c2',
                borderWidth: 2,
                borderRadius: 5,
                barThickness:20,
                borderSkipped: false,

                data: [15, 20, 37, 71]
            },

            {
                label: 'Vos offres',
                backgroundColor: '#fbd97f',
                borderColor: '#fbd97f',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
                barThickness:20,
                data: priceOld
            }
        ]
    }
    var option = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    usePointStyle: "true"
                }
            }
        },
    }

    var config = {
        type: 'bar',
        data: data,
        options: option,
    }
    histogramChart = new Chart(canvasHistogram, config)
    histogramIs = true;
}


// supprime le graph histogramme

function deleteHistogram() {
    if (histogramIs == true) {
        histogramChart.destroy();
    }
}

var optimiserBlock = document.querySelector("#optimiserBlock");

// cache le block optimisation
function hideOptimiserBlock() {
    optimiserBlock.style.display = "none";
}

// Affiche le block optimisation
function showOptimiserBlock() {
    optimiserBlock.style.display = "block";
}

// Affiche le message
function showMessage() {
    message.style.display = "block";
}

// Cache le message
function hideMessage() {
    message.style.display = "none";
}
// ******************************************* Evènement *******************************************


// Au click du boutton analyser
proposer.addEventListener("click", (e) => {
    e.stopPropagation();
    hideMessage()
    if (createTableauInput() == true) {
        deleteHistogram();
        deleteDonut();
        showDonut();
        donuts();
        showOptimiserBlock();
    } else {
        hideOptimiserBlock();
        hideHistogram();
        hideDonut();
    }
});

// Au click du boutton analyser
optimiser.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteHistogram();
    optimPriceOld();
    calculBenef();
    showMessage();
    showHistogram();
    histogram();
});


/*-------------------------------------------------------------------------------------------------------------*/




// $(document).ready(function () {
//     $(".navbar").hide();
//     $(function () {
//         $(window).scroll(function () {
//             if ($(this).scrollTop() > 140) {
//                 $('.navbar').fadeIn();
//             } else {
//                 $('.navbar').fadeOut();
//             }
//         });
//     });
// });






