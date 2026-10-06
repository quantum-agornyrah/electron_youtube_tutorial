const quoteText = document.getElementById('quote');

// Function to fetch a random quote from the API
async function fetchQuote() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();

        // Assign the fetched quote and author to the quoteText element
        quoteText.innerHTML = `"${data.quote}" - ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);

        // Display an error message if the quote fetch fails
        quoteText.innerHTML = 'Failed to fetch a quote.';
    }
}

// Fetch a quote when the page loads
window.onload = fetchQuote;

// Fetch a new quote every 5 seconds
setInterval(fetchQuote, 5000);