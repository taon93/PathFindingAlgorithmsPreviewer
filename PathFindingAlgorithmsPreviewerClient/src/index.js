import './style/main.scss';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import {SortingAlgorithmVisualisation} from "./SortingAlgorithmVisualisation";
import {BubblesortVisualiser} from "./BubblesortVisualiser";
import {QuicksortVisualiser} from "./QuicksortVisualiser";
import {MergesortVisualiser} from "./MergesortVisualiser";
import * as utils from "./utils";


const apiPath = 'http://localhost:8080/';
let algorithmVisualisation;
let algorithmHandler;

document.querySelector('#sorting-modal')
    .querySelector('.presets-form')
    .addEventListener('submit', event => processSubmitOfSortingRequest(event))

function checkInputBoundaries(form) {
    const lowerBound = form.querySelector('#lower-bound');
    const upperBound = form.querySelector('#upper-bound')
    if(parseInt(utils.getDataFromForm(form, "#lower-bound"))
        > parseInt(utils.getDataFromForm(form, '#upper-bound'))) {
        lowerBound.setCustomValidity("Invalid");
        upperBound.setCustomValidity("Invalid");
    } else {
        lowerBound.setCustomValidity("");
        upperBound.setCustomValidity("");
    }
}

function applyDisabledLookOnMenu(submenuId) {
    let findingPathLink = document.querySelector(submenuId);
    findingPathLink.setAttribute("aria-disabled", "true");
    findingPathLink.classList.add("disabled");
}
function applyActiveLookOnMenu(submenuId) {
    let sorting = document.querySelector(submenuId);
    sorting.setAttribute("aria-current", "page");
    sorting.classList.add("active");
}

function processSubmitOfSortingRequest(event) {
    event.preventDefault();
    checkInputBoundaries(event.target);
    if(!event.target.checkValidity()) {
        event.stopPropagation();
    }
    else {
        algorithmVisualisation = new SortingAlgorithmVisualisation(event.target);
        revealNavbarAdditionalMenus();
        fillAlgorithmDropdownAndAddListeners(
            ["bubblesort", "quicksort", "mergesort", "heapsort"]);
        bootstrap.Modal.getInstance(document.querySelector('#sorting-modal')).hide();
    }
    event.target.classList.add('was-validated');
    applyDisabledLookOnMenu("#finding-path");
    applyActiveLookOnMenu("#sorting");
}

function unmarkNavbarMenus(child) {
    child.setAttribute("aria-disabled", "false");
    child.setAttribute("aria-current", "false");
    child.classList.remove("active");
    child.classList.remove("disabled");
}

function resetAlgorithm() {
    document.querySelectorAll(".additional-menu").forEach(menu => menu.style.display = "none");
    document.querySelectorAll(".primary-item")
        .forEach(elem => unmarkNavbarMenus(elem.firstElementChild));
    document.querySelectorAll(".dropdown-item").forEach(elem => elem.outerHTML = "");
    algorithmVisualisation.clearCanvas();
    algorithmVisualisation = null;
}

function revealNavbarAdditionalMenus() {
    document.querySelectorAll(".additional-menu").forEach(menu => menu.style.display = "inline");
    document.querySelector(".change-data").addEventListener("click",
        () => bootstrap.Modal.getInstance(document.querySelector('#sorting-modal')).show());
    document.querySelector(".reset-alg").addEventListener("click", () => resetAlgorithm());
}

function fillAlgorithmDropdownAndAddListeners(algorithmsArray) {
    const dropdown = document.querySelector(".algorithms-dropdown");
    algorithmsArray.forEach(elem => {
        const a = document.createElement('a');
        a.classList.add("dropdown-item")
        a.classList.add(elem)
        a.setAttribute("href", "#");
        a.textContent = elem;
        dropdown.appendChild(a);
        a.addEventListener('click', event => {
            createAlgorithmHandler(event.target.textContent);
            sendRequestToServer( algorithmHandler.getEndpoint(), algorithmVisualisation.getCollection());
        })
    });
}
function createAlgorithmHandler(algorithmName) {
    switch(algorithmName) {
        case "bubblesort" : algorithmHandler = new BubblesortVisualiser(apiPath);
            break;
        case "quicksort" : algorithmHandler = new QuicksortVisualiser(apiPath);
            break;
        case "mergesort" : algorithmHandler = new MergesortVisualiser(apiPath);
        // TODO: "merge-sort", "heapsort"
    }
}
function sendRequestToServer(endpoint, collection) {
    axios.post(endpoint, collection).then(
        res => algorithmVisualisation.visualiseAlgorithm(res, algorithmHandler.getProcessIterationStep()));
}