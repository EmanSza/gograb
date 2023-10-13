let searchButton = document.getElementById('search-button-all');

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

let addItemtoSearch = (results) => {
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
// When searching, when they hit enter we do not want to redirect the page


let sendSearchRequest = async () => {
    let input = document.getElementById('searchInputPage').value
    console.log(input);   
    fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.scrappedResults);
        let searchContainer = document.querySelector('.search-content');
        searchContainer.innerHTML = '';
        data.scrappedResults.forEach(item => {
            console.log(item);
            addItemtoSearch(item);
        })
    })
}

let searchFormPage = document.getElementById('searchFormPage');
searchFormPage.addEventListener('submit', (e) => {
    console.log('submitting');
    e.preventDefault();
    sendSearchRequest();
})
let searchButtonAll = document.getElementById('search-button-all');
searchButtonAll.addEventListener('click', (e) => {
    e.preventDefault();
    sendSearchRequest();
})

const anmResults = JSON.parse(results);
console.log(window.location.href);
console.log(anmResults);
