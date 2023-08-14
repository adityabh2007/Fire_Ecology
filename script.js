const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const contentBoxes = document.querySelectorAll('.content-box');

searchButton.addEventListener('click', () => {
    const searchText = searchInput.value.trim().toLowerCase();
    if (searchText === '') {
        contentBoxes.forEach(box => {
            box.innerHTML = box.innerHTML.replace(/<mark>(.*?)<\/mark>/g, '$1');
        });
        return;
    }

    let results = '';

    contentBoxes.forEach(box => {
        const content = box.textContent.toLowerCase();
        const regex = new RegExp(searchText, 'gi');
        if (content.match(regex)) {
            const highlightedContent = content.replace(regex, '<mark>$&</mark>');
            box.innerHTML = highlightedContent;
            results += `<p>Found in: ${box.querySelector('.content-heading').textContent}</p>`;
        } else {
            box.innerHTML = box.innerHTML.replace(/<mark>(.*?)<\/mark>/g, '$1');
        }
    });

    if (results === "") {
        results = '<p>No matches found.</p>';
    }

    document.getElementById('searchResults').innerHTML = results;
});
