"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Maher Salam
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {

    errors = [];
    
    // Kontrollera formulärets obligatoriska fält
    // Visa eventuella felmeddelanden
    if(fullnameInput.value.trim() === "") {
        errors.push("Fullständigt namn är obligatoriskt.");
    }
    if(emailInput.value.trim() === "" && emailInput.value.trim() !== "@") {
        errors.push("e-post är obligatoriskt.");
    }
    if(phoneInput.value.trim() === "") {
        errors.push("Telefonnummer är obligatoriskt.");
    }
   

    // Returnera resultatet (true eller false) av valideringen
    return errors.length === 0;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";
    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(error => {
        const liEl = document.createElement("li");
        const textNode = document.createTextNode(error);
        liEl.appendChild(textNode);
        errorList.appendChild(liEl);
    });

}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Uppdatera studentkortet
    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    if (validateForm() === true) {
        previewFullname.textContent += ": " + fullname;
        previewEmail.textContent += ": " + email;
        previewPhone.textContent += ": " + phone;
    }

    const card = document.querySelector(".card");
    card.style.fontFamily = document.querySelector("#font").value;
    const font = document.querySelector("#font").value;

    // Lägg till studentkortet i historiken
    const studentCard = {
        fullname: fullname,
        email: email,
        phone: phone,
        font: font
    };

    // Spara och uppdatera historiken
    if (validateForm() === true) {
    history.unshift(studentCard);
    }
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    if (validateForm() === true) {
        localStorage.setItem("history", JSON.stringify(history));
    }
    
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("history");

    // Uppdatera history
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    history.forEach(studnetCard => {
        const articleEl = document.createElement("article");
        const nameEl = document.createElement("p");
        const emailEl = document.createElement("p");
        const phoneEl = document.createElement("p");
        const fontEl = document.createElement("p");

        nameEl.textContent = "Namn: " + studnetCard.fullname;
        emailEl.textContent = "E-post: " + studnetCard.email;
        phoneEl.textContent = "Telefon: " + studnetCard.phone;
        fontEl.textContent = "Typsnitt: " + studnetCard.font;

        articleEl.appendChild(nameEl);
        articleEl.appendChild(emailEl);
        articleEl.appendChild(phoneEl);
        articleEl.appendChild(fontEl);
        historySection.appendChild(articleEl);
        articleEl.style.border = "1px solid black";
        articleEl.style.borderRadius = "5px";
        articleEl.style.padding = "5px";
        articleEl.style.marginBottom = "10px";
    })
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();
    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";
    // Rensa eventuella felmeddelanden
    errorList.innerHTML = "";
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("history");
    // Uppdatera history och visningen på sidan
    history = [];
    renderHistory();
}


// Eventlyssnare
form.addEventListener("submit", function (event) {
   event.preventDefault();
 // När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
   if(validateForm() === true) {
    displayErrors();
    createStudentCard();
    saveHistory();
    renderHistory();
    } else {
        displayErrors();
    }   
});



// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    clearForm();
});

// När användaren klickar på "Radera historik"
 deleteHistoryButton.addEventListener("click", function (event) {
    event.preventDefault();
    deleteHistory();
})

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
loadHistory();
renderHistory();