const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchInputValue = searchInput.value;

    if (searchInputValue) {
        window.location.href = `/api/search?search=${encodeURIComponent(searchTerm)}`;

        searchForm.submit();
    } else {
        alert('Please enter a search term.');
    }
});
// When the user is inside the search input, display results.container
// When the user is outside the search input, hide results.container
const results = document.querySelector('.results-container');

searchInput.addEventListener('focus', () => {
    results.style.display = 'block';
});

searchInput.addEventListener('blur', () => {
    results.style.display = 'none';
});



let typingTimer;
const doneTypingInterval = 1000;
searchForm.addEventListener('input', (e) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(sendPostRequest, doneTypingInterval);
});

function sendPostRequest() {
    let input = document.getElementById("searchInput").value;
    console.log(input);

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
        resultsContainer = document.querySelector('.results-container');

        const items = data.scrappedResults;
        let newResults = {};
        console.log(items);

        // if there are more then 7 items, remove the rest
        if (items.length > 7) {
            items.splice(7);
        }
        
        items.forEach(element => {
            const anchor = document.createElement('a');
            anchor.href = element.link;

            const image = document.createElement('img');
            image.src = element.image;
            image.alt = element.title;

            const title = document.createElement('h2');
            title.innerText = element.title;

            anchor.appendChild(image);
            anchor.appendChild(title);

            resultsContainer.appendChild(anchor);
            
        });

    })
    .catch(error => {
        console.error(error);
    });    
}
