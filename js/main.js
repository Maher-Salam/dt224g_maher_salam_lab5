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
        font: font,
    };

    // Spara och uppdatera historiken
    history.unshift(studentCard);
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare
form.addEventListener("submit", function (event) {
   event.preventDefault();
    
   validateForm();
   displayErrors();
   createStudentCard();
  
});
// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik