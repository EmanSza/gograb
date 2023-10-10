let searchButton = document.getElementById('search-button-all');

console.log(searchButton);

let insertLoadingLogo = (element) => {
    let searchLogo = document.createElement('i');
    searchLogo.classList.add('fas', 'fa-search');
    element.appendChild(searchLogo);
}
let insertSearchIcon = (element, svg) => {
    let searchButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    searchButton.setAttributeNS(null, 'viewBox', '0 0 512 512');
    searchButton.setAttributeNS(null, 'width', '20px');
    searchButton.setAttributeNS(null, 'height', '20px');
    searchButton.setAttributeNS(null, 'fill', '#000000');
    searchButton.classList.add('search-icon1');
    searchButton.innerHTML = svg;
    element.appendChild(searchButton);
}

window.addEventListener('load', insertSearchIcon(searchButton, svgIcon));

let sendSearchRequest = () => {
    let searchResult = document.getElementById('search-button-all');
    searchIconI(searchResult);

}
let addItemstoSearch = (results) => {
    let searchContainer = document.querySelector('.search-content');
    console.log(searchContainer);
    let searchItem = `
        <a href="https://google.com/">
            <div class="item-container" style="background-image: url(${results.image})">
                <div class="item-content">
                    <div>
                        <h2>${results.title}</h2>
                    </div>
                </div>
            </div>
        </a>
    `
    let searchDiv = document.createElement('div');
    searchDiv.classList.add('search-item');
    searchDiv.innerHTML = searchItem;
    searchContainer.appendChild(searchDiv);

}

addItemstoSearch({
    title: 'test',
    image: 'https://cdn.myanimelist.net/images/anime/5/87048.jpg'  
})