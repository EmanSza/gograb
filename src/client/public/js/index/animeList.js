// Get all elements with class 'list-container'
const listContainers = document.querySelectorAll('.list-container');

// Loop through each 'list-container'
listContainers.forEach(container => {
    // Get all elements with class 'item' inside the current container
    const items = container.querySelectorAll('.item');

    // Check if there are more than 5 items
    if (items.length > 5) {
        // Remove excess items (keeping the first 5)
        for (let i = 5; i < items.length; i++) {
            container.removeChild(items[i]);
        }
    }
});