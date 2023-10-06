let slideContent = document.querySelectorAll('.slide-content');
let item = document.querySelector('.item');
let items = document.querySelectorAll('.item');

let slideContentWidth = slideContent[0].offsetWidth;
let itemWidth = item.offsetWidth;


const itemContent = 
`
<div class="item">
<a href="google.com" target="_blank">
    <div class="image-container">
        <img src="https://cdn.myanimelist.net/images/anime/5/87048.jpg?s=4d9f9a7a4a4e4f2a4a4a4a4a4a4a4a4a" alt="image">
    </div>
    <div class="title-container">
        <h2>Wether With you</h2>
    </div>
</a>
</div>
`
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

    // if the amount of items in the array is less than the amount of items that can fit
    
    itemsLength.forEach((element, index) => {
        if (element < itemFit) {
            // add items to the element
            for (let i = 0; i < itemFit - element; i++) {
                slideContent[index].innerHTML += itemContent;
            }
        } else if (element > itemFit) {
            // remove items from the element
            for (let i = 0; i < element - itemFit; i++) {
                slideContent[index].lastChild.remove();
            }
        }
    });
}

// On resize, check to see if items need to be removed or added
window.addEventListener('resize', () => {
    checkWidths();
});

// On load, check to see if items need to be removed or added
window.addEventListener('load', () => {
    checkWidths();
});