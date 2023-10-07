let slideContent = document.querySelectorAll('.slide-content');
let item = document.querySelector('.item');
let items = document.querySelectorAll('.item');

let slideContentWidth = slideContent[0].offsetWidth;
let itemWidth = item.offsetWidth;




// On resize, check to see if items need to be removed or added
// Each item is 135px wide. so based on the width of the slideContent and
// the width of itemWidth. if we can fit more do so

function checkWidths () {
    // Check current length 
    slideContent = document.querySelectorAll('.slide-content');
    item = document.querySelector('.item');
    items = document.querySelectorAll('.item');

    slideContentWidth = slideContent[0].offsetWidth;
    itemWidth = item.offsetWidth;
    // Add the items margin to the width for the left and right side
    let itemWidthWithMargin = 135 + 10;
    let itemFit = Math.floor(slideContentWidth / itemWidthWithMargin);
    let itemsLength = []
    // For each child of slideContent, add the amount of items in it to the array
    slideContent.forEach(element => {
        itemsLength.push(element.childElementCount);
    });

    console.log(itemsLength);
}

// On resize, check to see if items need to be removed or added
window.addEventListener('resize', () => {
    checkWidths();
});

// On load, check to see if items need to be removed or added
window.addEventListener('load', () => {
    checkWidths();
});