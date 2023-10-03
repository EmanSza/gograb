const listContainers = document.querySelectorAll('.list-container');

listContainers.forEach(container => {
    const items = container.querySelectorAll('.item');

    // Removing items more then 5 items for responsiveness
    if (items.length > 5) {
        for (let i = 5; i < items.length; i++) {
            container.removeChild(items[i]);
        }
    }
});

listContainers.forEach(container => {
    const items = container.querySelectorAll('.item');
    //    make the middle class larger
    const middleItem = Math.floor(items.length / 2);
    items[middleItem].classList.add('middle');
});