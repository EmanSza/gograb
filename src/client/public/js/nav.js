const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');

let svgIcon = `
<g>
   <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
       s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
       S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
       S381.9,104.65,381.9,203.25z"/>
</g>
`
let loadingIcon = `
<i class="fa fa-circle-o-notch fa-spin">
`
function addSVGIcon() {
    let searchIcon = document.getElementById('search-button');
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'viewBox', '0 0 512 512');
    svg.setAttributeNS(null, 'width', '20px');
    svg.setAttributeNS(null, 'height', '20px');
    svg.setAttributeNS(null, 'fill', '#dacbdf');
    svg.classList.add('search-icon1');
    svg.innerHTML = svgIcon;
    searchIcon.appendChild(svg);


}

window.addEventListener('load', addSVGIcon)

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchInputValue = searchInput.value;
    if (searchInputValue) {
        window.location.href = `/search?search=${encodeURIComponent(searchInputValue)}`;

        searchForm.submit();
    } else {
        alert('Please enter a search term.');
    }
});
// When the user is inside the search input, display results.container
// When the user is outside the search input, hide results.container

searchInput.addEventListener('focus', () => {
    const results = document.querySelector('.results-container');
    if (results.innerHTML.trim() === '') {
        results.style.display = 'none';
    } else {
        results.style.display = 'block';
    }
});

searchInput.addEventListener('blur', () => {
    const results = document.querySelector('.results-container');
    results.style.display = 'none';
});



let typingTimer;
const doneTypingInterval = 1000;
searchForm.addEventListener('input', (e) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(sendPostRequest, doneTypingInterval);
});
let searchIconI = (element) => {
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
function sendPostRequest() {
    let searchIcon = document.getElementById('search-button')
    searchIconI(searchIcon);

    let input = document.getElementById("searchInput").value;

    let resultsContainer = document.querySelector('.results-container');
    resultsContainer.innerHTML = '';

    fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input: input.toString()
        }),
    })
    .then(response => response.json())
    .then(data => {
        let searchIcon = document.getElementById('search-button')
        searchIcon.innerHTML = '';
        addSVGIcon();
        resultsContainer = document.querySelector('.results-container');

        const items = data.scrappedResults;
        if (items.length > 7) {
            items.splice(7);
        }
        
        items.forEach(element => {
            const anchor = document.createElement('a');
            anchor.href = element.webLink;

            const image = document.createElement('img');
            image.src = element.image;
            image.alt = element.title;

            const title = document.createElement('h2');
            title.innerText = element.title;

            anchor.appendChild(image);
            anchor.appendChild(title);

            resultsContainer.appendChild(anchor);
        });

        if (resultsContainer.innerHTML.trim() === '') {
            resultsContainer.style.display = 'none';
        } else {
            resultsContainer.style.display = 'block';
        }
    })
    .catch(error => {
        console.error(error);
    });    
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        window.history.back();
    } else if (e.key === 'ArrowRight') {
        window.history.forward();
    }
});