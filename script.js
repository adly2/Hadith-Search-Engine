document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching Hadiths:', error);
    }
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (data.hadiths.length === 0) {
        resultsDiv.innerHTML = '<p>No results found</p>';
        return;
    }

    const list = document.createElement('ul');
    data.hadiths.forEach(hadith => {
        const listItem = document.createElement('li');
        listItem.textContent = hadith.hadithEnglish; // Adjust based on your API's response structure
        list.appendChild(listItem);
    });

    resultsDiv.appendChild(list);
}
