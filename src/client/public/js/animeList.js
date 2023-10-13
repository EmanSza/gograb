let slideContent = document.querySelectorAll('.slide-content');
let item = document.querySelector('.item');
let items = document.querySelectorAll('.item');

let slideContentWidth = slideContent[0].offsetWidth;
let itemWidth = 135 + 10;

const parsedResultsPop = JSON.parse(resultsPopular);
const parsedResultsRecent = JSON.parse(resultsRecent);

function generateItemHTML(title, image, link) {
    return `
        <a href="${link}" target="_blank">
            <div class="image-container">
                <img src="${image}" alt="image">
            </div>
            <div class="title-container">
                <h2>${title}</h2>
            </div>
        </a>
    `;
}

function slideID() {
    slideContent = document.querySelectorAll('.slide-content');
    // If its the first slide give it a id of 1 and so on
    slideContent.forEach((element, index) => {
        element.id = index + 1;
        element.parentNode.childNodes.forEach((element) => {
        })
    });
}

function createSlides(items) {
    let itemFit = Math.floor(slideContentWidth / itemWidth);
    let totalSlides = Math.ceil(items.length / itemFit);
    slideContent = document.querySelectorAll('.slide-content');
    // If totalSlides is a whole numbering that has a decialm, add 1 to it
    if (totalSlides % 1 != 0) {
        totalSlides = Math.ceil(totalSlides);
    }
    slideContent.forEach(element => {
        for (let i = 0; i < totalSlides; i++) {
            let div = document.createElement('div');
            div.classList.add('slide');
            element.appendChild(div);
        }
    });
}
function addItemstoSlides(items, slideId) {
    let slideContentId = document.getElementById(slideId);
    let itemFit = Math.floor(slideContentWidth / itemWidth);
    let totalSlides = Math.ceil(items.length / itemFit);
    let itemsInLastSlide = items.length % itemFit || itemFit;
    for (let i = 0; i < slideContentId.children.length; i++) {
        slideContentId.children[i].innerHTML = '';
        for (let j = i * itemFit; j < (i === totalSlides - 1 ? i * itemFit + itemsInLastSlide : (i + 1) * itemFit); j++) {
            if (items[j]) {
                let div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML = generateItemHTML(items[j].title, items[j].image, items[j].webLink);
                slideContentId.children[i].appendChild(div);
            }
        }
    }
    
}
function resizeSlides(items, id) {
    slideContent = document.querySelectorAll('.slide-content');
    slideContentWidth = slideContent[0].offsetWidth;
    let slideContentId = document.getElementById(id);
    let itemFit = Math.floor(slideContentWidth / itemWidth);
    let totalSlides = Math.ceil(items.length / itemFit);
    if (totalSlides % 1 !== 0) {
        totalSlides = Math.ceil(totalSlides);
    }

    // Calculate the number of items that should be in the last slide
    let itemsInLastSlide = items.length % itemFit || itemFit;

    // Check if there are too many items in the slides
    if (slideContentId.children.length > totalSlides) {
        // Remove extra slides
        while (slideContentId.children.length > totalSlides) {
            slideContentId.removeChild(slideContentId.lastChild);
        }
    } else if (slideContentId.children.length < totalSlides) {
        // Add more slides if needed
        for (let i = slideContentId.children.length; i < totalSlides; i++) {
            // Create the div element  and have the div be called slide and fade not using innerHTML
            let div = document.createElement('div');
            div.classList.add('slide');
            slideContentId.appendChild(div);
        }
    }

    // Update the items in each slide
    for (let i = 0; i < slideContentId.children.length; i++) {
        slideContentId.children[i].innerHTML = '';
        for (let j = i * itemFit; j < (i === totalSlides - 1 ? i * itemFit + itemsInLastSlide : (i + 1) * itemFit); j++) {
            if (items[j]) {
                let div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML = generateItemHTML(items[j].title, items[j].image, items[j].webLink);
                slideContentId.children[i].appendChild(div);


            }
        }
    }
}


// On resize, check to see if items need to be removed or added
window.addEventListener('resize', () => {
    resizeSlides(parsedResultsPop, 1);
    resizeSlides(parsedResultsRecent, 2);
});

// On load, check to see if items need to be removed or added
window.addEventListener('load', () => {
    slideID();
    createSlides(parsedResultsPop);

    addItemstoSlides(parsedResultsPop, 1);
    addItemstoSlides(parsedResultsRecent, 2);

    slideContent = document.querySelectorAll('.slide-content');
    slideContent.forEach(element => {
        element.children.item(0).classList.add('active')
    });
});


let slideIndex = 1;

function plusSlides(n, element ) {
    showSlides(slideIndex += n, element);
}

function currentSlide(n,element) {
  showSlides(slideIndex = n, element);
}

function showSlides(n, element) {
    let slides = element.parentNode.children[1];

    if (n > slides.children.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.children.length
    }
    for (let i = 0; i < slides.children.length; i++) {
        slides.children[i].classList.remove('active');
    }
    slides.children[slideIndex - 1].classList.add('active');

}
