const searchForm = document.querySelector('.searchForm');
const searchInput = document.querySelector('.search[name="search"]');

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