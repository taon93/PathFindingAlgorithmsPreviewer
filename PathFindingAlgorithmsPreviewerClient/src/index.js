// Import our custom CSS
import './style/main.scss';
import axios from 'axios';
const apiPath = 'http://localhost:8080/';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
const _ = require('lodash');
import gsap from 'gsap';

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
let initCanvas = (function (){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})();
const baseHeight = canvas.height / 12; // this should be global only for sorting algorithm;
let columnsArray = [];

document.querySelector('#sorting-modal')
    .querySelector('.presets-form')
    .addEventListener('submit', event => processSubmitOfSortingRequest(event))

function getDataFromForm(form, inputDescriptor){
    return form.querySelector(inputDescriptor).value;
}
function generateData_Sorting(form) {
    const elementsNo = parseInt(getDataFromForm(form, "#elements-number"));
    const lowerBound = parseInt(getDataFromForm(form, "#lower-bound"));
    const upperBound = parseInt(getDataFromForm(form, '#upper-bound'));

    return _.range(elementsNo).map(elem => (Math.random() * (upperBound - lowerBound) + lowerBound) | 0);
}

function drawBaseLine() {
    context.beginPath();
    context.moveTo(0, baseHeight);
    context.lineTo(canvas.width, baseHeight);
    context.lineWidth = 1;
    context.strokeStyle = "red";
    context.stroke();
}

function drawCanvas_Sorting(array) {
    drawBaseLine();
    const widthOfTheColumn = canvas.width / 2 / array.length;
    const delimiterWidth = 3;
    const heightOfTheColumnUnit = canvas.height * 2 / 3 / _.chain(array).max();

    let startingPoint = (function (){
        const halfOfTheElements = array.length / 2 | 0;
        const halfOfTheSpaceThatArrayOccupy = array.length % 2 === 1 ?
            halfOfTheElements * (delimiterWidth + widthOfTheColumn) + widthOfTheColumn / 2 :
            halfOfTheElements * (widthOfTheColumn + delimiterWidth) - delimiterWidth / 2;
        let x = canvas.width / 2 - halfOfTheSpaceThatArrayOccupy;
        const y = baseHeight + 1;
        return {
            getX: function(){
                let currentX = x;
                x += widthOfTheColumn + delimiterWidth;
                return currentX; },
            getY: function(){ return y; }
        }
    })();

    array.map(elem => new CanvasColumnElement(
                startingPoint.getX(),
                startingPoint.getY(),
                widthOfTheColumn,
                heightOfTheColumnUnit * elem,
                "grey"))
        .forEach(column => {
            columnsArray.push(column)
            column.draw()
        })
}

function processSubmitOfSortingRequest(event) {
    event.preventDefault();
    if(!event.target.checkValidity()) {
        event.stopPropagation();
    }
    else {
        const data = generateData_Sorting(event.target);
        drawCanvas_Sorting(data)
        revealNavbarAdditionalMenus();
        fillAlgorithmDropdownAndAddListeners(
            ["bubble-sort", "quicksort", "merge-sort", "heapsort"], data);
        bootstrap.Modal.getInstance(document.querySelector('#sorting-modal')).hide();
    }
    event.target.classList.add('was-validated');
}
function revealNavbarAdditionalMenus() {
    document.querySelector(".additional-menus").style.display = "inline";
}

function sendRequestToServer(endpoint, collection) {
    console.log(endpoint, collection);
    axios.post(apiPath + endpoint, collection).then(res => visualiseAlgorithm(res));
}

function fillAlgorithmDropdownAndAddListeners(algorithmsArray, collection) {
    const dropdown = document.querySelector(".algorithms-dropdown");
    algorithmsArray.forEach(elem => {
        const a = document.createElement('a');
        a.classList.add("dropdown-item")
        a.classList.add(elem)
        a.setAttribute("href", "#");
        a.textContent = elem;
        dropdown.appendChild(a);
        a.addEventListener('click', event => sendRequestToServer( "sort/" + event.target.textContent, collection))
    });
}
// TODO: Add active class to nav-item when selected
async function visualiseAlgorithm(responseFromServer) {
    console.log(responseFromServer.data);
    for (const iteration of responseFromServer.data) {
        await displayIteration(iteration.swapsRecord);
    }
}

async function displayIteration(swapsForIteration) {
    let idx = 0;
    for (const shouldSwap of swapsForIteration) {
        await drawColumns(shouldSwap, idx++).then(res => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBaseLine();
            columnsArray.forEach(column => {
                column.draw();
                column.setColor("grey");
            });
        });
    }
    columnsArray.forEach(c => c.draw()); // hack
}

function drawColumns(toSwap, index){
    return new Promise(resolve => setTimeout(() => {
        let color;
        if(toSwap){
            color = "red";
            let temp = columnsArray[index].getHeight();
            columnsArray[index].setHeight(columnsArray[index + 1].getHeight());
            columnsArray[index + 1].setHeight(temp);
        } else color = "blue"
        columnsArray[index].setColor(color);
        columnsArray[index + 1].setColor(color);
        resolve()
    }, 30))
}

class CanvasColumnElement {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
    }

    getHeight() {
        return this.height;
    }
    setHeight(h) {
        this.height = h;
    }
    setColor(c) {
        this.color = c;
    }
}
