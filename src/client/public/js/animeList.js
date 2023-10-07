let slideContent = document.querySelectorAll('.slide-content');
let item = document.querySelector('.item');
let items = document.querySelectorAll('.item');

let slideContentWidth = slideContent[0].offsetWidth;
let itemWidth = 135 + 10;

const parsedResultsPop = JSON.parse(resultsPopular);
const parsedResultsRecent = JSON.parse(resultsPopular);


function generateItemHTML(title, image, link) {
    return `
    <div class="item">
        <a href="${link}" target="_blank">
            <div class="image-container">
                <img src="${image}" alt="image">
            </div>
            <div class="title-container">
                <h2>${title}</h2>
            </div>
        </a>
    </div>
    `;
}

function slideID() {
    slideContent = document.querySelectorAll('.slide-content');
    // If its the first slide give it a id of 1 and so on
    slideContent.forEach((element, index) => {
        element.id = index + 1;
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
    console.log(totalSlides);
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
                slideContentId.children[i].innerHTML += generateItemHTML(items[j].title, items[j].image, items[j].link);
            }
        }
    }
    
}
function resizeSlides(items, id) {
    slideContent = document.querySelectorAll('.slide-content');
    slideContentWidth = slideContent[0].offsetWidth;
    
    // Get the slide content by id
    let slideContentId = document.getElementById(id);
    
    // Calculate the number of items that can fit in one slide
    let itemFit = Math.floor(slideContentWidth / itemWidth);
    
    // Calculate the total number of slides needed to accommodate all items
    let totalSlides = Math.ceil(items.length / itemFit);

    // If totalSlides is not a whole number, round it up to the nearest integer
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
                slideContentId.appendChild(generateItemHTML(items[j].title, items[j].image, items[j].link));
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
    
});

slideContent = document.querySelectorAll('.slide-content');
slideContentWidth.forEach(element => {
    // Inside each element, get the first slide and ad active class to it
    element.children[0].classList.add('active');
});

// Begin with the creation of the slideShow

let slideINdex = 1;

let plusSlides = (n) => {
    // if n is a negative, pass prev, if its positive pass next
    if (n < 0) {
        showSlides(slideINdex -= 1, 'prev');
    }
    if (n > 0) {
        showSlides(slideINdex += 1, 'next');
    }
}
let currentSlide = (n) => {
    showSlides(slideINdex = n, 'none');
}
let showSlides = (n, slideButton) => {
    let slides = document.querySelectorAll('.slide');
    
    // Hide all slides by default
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    if (slideButton === 'prev') {
        // Slide to the left
        slides[n - 1].classList.add('active', 'slideLeft');
    } else if (slideButton === 'next') {
        // Slide to the right
        slides[n - 1].classList.add('active', 'slideRight');
    } else {
        // No animation, just show the slide
        slides[n - 1].classList.add('active');
    }
}





