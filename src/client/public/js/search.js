let searchButton = document.getElementById('search-button-all');

let insertLoadingLogo = (element) => {
    let icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add('fa-circle-o-notch');
    icon.classList.add('fa-spin');
    icon.classList.add('fa-fw');
    // Make it 20x20
    icon.style.width = '20px';
    icon.style.height = '20px';
    icon.style.color = '#dacbdf';
    element.innerHTML = '';
    element.appendChild(icon);
}
let insertSearchIcon = (element, svg) => {
    element.innerHTML = '';
    let searchButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    searchButton.setAttributeNS(null, 'viewBox', '0 0 512 512');
    searchButton.setAttributeNS(null, 'width', '20px');
    searchButton.setAttributeNS(null, 'height', '20px');
    searchButton.setAttributeNS(null, 'fill', '#dacbdf');
    searchButton.classList.add('search-icon1');
    searchButton.innerHTML = svg;
    element.appendChild(searchButton);
}

window.addEventListener('load', insertSearchIcon(searchButton, svgIcon));

let addItemtoSearch = (results) => {
    let searchContainer = document.querySelector('.search-content');
    let searchItem = `
        <a href="${results.webLink}">
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
    insertLoadingLogo(searchButton);
    let input = document.getElementById('searchInputPage').value
    fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
    })
    .then(response => response.json())
    .then(data => {
        let searchContainer = document.querySelector('.search-content');
        searchContainer.innerHTML = '';
        data.scrappedResults.forEach(item => {
            addItemtoSearch(item);
        })
        insertSearchIcon(searchButton, svgIcon);
    })
}

let searchFormPage = document.getElementById('searchFormPage');
searchFormPage.addEventListener('submit', (e) => {
    e.preventDefault();
    sendSearchRequest();
})
let searchButtonAll = document.getElementById('search-button-all');
searchButtonAll.addEventListener('click', (e) => {
    e.preventDefault();
    sendSearchRequest();
})

// if results is not empty OBJECT
if (results != "false") {
    const anmResults = JSON.parse(results);
    let searchContainer = document.querySelector('.search-content');
    searchContainer.innerHTML = '';
    anmResults.forEach(item => {
        addItemtoSearch(item);
    })
}

