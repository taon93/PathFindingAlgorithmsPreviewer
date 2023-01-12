import './style/main.scss';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import {SortingAlgorithmVisualisation} from "./SortingAlgorithmVisualisation";
import {BubbleSortVisualiser} from "./BubbleSortVisualiser";
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
            ["bubble-sort", "quicksort", "merge-sort", "heapsort"]);
        bootstrap.Modal.getInstance(document.querySelector('#sorting-modal')).hide();
    }
    event.target.classList.add('was-validated');

}

function resetAlgorithm() {
    document.querySelectorAll(".additional-menu").forEach(menu => menu.style.display = "none");
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
        case "bubble-sort" : algorithmHandler = new BubbleSortVisualiser(apiPath);
        // TODO: "quicksort", "merge-sort", "heapsort"
    }
}
function sendRequestToServer(endpoint, collection) {
    axios.post(endpoint, collection).then(
        res => algorithmVisualisation.visualiseAlgorithm(res, algorithmHandler.getProcessIterationStep()));
}

// TODO: Add active class to nav-item when selected
