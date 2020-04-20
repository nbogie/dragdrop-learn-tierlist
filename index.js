const images = ["angular-logo.png",
    "apollo-logo.png",
    "ava-logo.png",
    "backbone-logo.png",
    "bootstrap-logo.png",
    "bower-logo.png",
    "chai-logo.png",
    "commitizen-logo.png",
    "css-modules-logo.png",
    "cypress-io-logo.png",
    "electron-logo.png",
    "ember-logo.png",
    "emotion.png",
    "enzyme-logo.png",
    "eslint-logo.png",
    "figma-logo.png",
    "flow-logo.png",
    "flutter-logo.png",
    "foundation-logo.png",
    "gatsby-logo.png",
    "graphql-logo.png",
    "grunt-logo.png",
    "gulp-logo.png",
    "ionic-logo.png",
    "jasmine-logo.png",
    "jest-logo.png",
    "jss-logo.png",
    "karma-logo.png",
    "lerna-logo.png",
    "less-logo.png",
    "lint-staged-husky-logo.png",
    "material-ui-logo.png",
    "mocha-logo.png",
    "nativescript-logo.png",
    "next.png",
    "npm-logo.png",
    "parcel-logo.png",
    "postcss-logo.png",
    "preact-logo.png",
    "prettier-logo.png",
    "react-logo.png",
    "react-native-logo.png",
    "react-testing-library-logo.png",
    "redux-logo.png",
    "relay-logo.png",
    "rollup-logo.png",
    "rxjs-logo.png",
    "sass-logo.png",
    "sketch-logo.png",
    "styled-components-logo.png",
    "stylelint-logo.png",
    "svelte-logo.png",
    "svgo-logo.png",
    "tailwindcss-logo.png",
    "typescript-logo.png",
    "vue-logo.png",
    "webassembly-logo.png",
    "web-components-logo.png",
    "webpack-logo.png",
    "yarn-logo.png"];


window.addEventListener('DOMContentLoaded', () => {
    setup();
});

function removeExtension(fname) {
    return fname.split('.')[0];
}
function setup() {
    const pool = document.getElementById("pool");
    pool.addEventListener("drop", (ev) => drop_handler(ev));
    pool.addEventListener("dragover", (ev) => dragover_handler(ev));

    document.querySelectorAll(".lane").forEach(lane => {
        lane.addEventListener("drop", (ev) => drop_handler(ev));
        lane.addEventListener("dragover", (ev) => dragover_handler(ev));
    });

    let imgEls = images.map(filename => {
        let el = document.createElement("img");
        el.setAttribute("src", `imgs/${filename}`);
        el.setAttribute("id", removeExtension(filename));
        el.setAttribute("draggable", "true");
        el.classList.add("item");
        return el;
    });

    imgEls.forEach(e => {
        pool.appendChild(e)
        e.addEventListener("dragstart", dragstart_handler);
    });
    updateCounts();
}


function updateCounts() {
    $("countInPool").textContent = "" + $('pool').children.length;
    document.querySelectorAll(".lane").forEach(lane => {
        lane.querySelector(".count").textContent = "" + lane.querySelectorAll(".item").length;
    });
}

function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
    //ev.dataTransfer.dropEffect = "move";
    console.log("dragstart: ", ev.dataTransfer);
    updateCounts();
}

function dragover_handler(ev) {
    ev.preventDefault();
    //ev.dataTransfer.dropEffect = "move";
    updateCounts();
}

function drop_handler(ev) {
    //IMPORTANT: 
    //the drop event target may be the lane or pool, OR it may be an element within that container 
    //(such as another image) EVEN if you have not set up a drop handler on that smaller element (e.g. the img).
    //
    //So, if the target is not the lane or pool, we need to find the containing lane or pool.

    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");

    let destinationEl = ev.target.tagName === "IMG" ? ev.target.parentElement : ev.target;
    console.log("parent is", destinationEl)
    destinationEl.appendChild($(data));

    console.log("dropping", ev.target.tagName, data, ev);
    updateCounts();
}

function $(id) {
    return document.getElementById(id);
}
