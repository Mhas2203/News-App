// API Key for Currents API
const apiKey = 'w7XvnxTz3CIUh0mWebAXXjrdRJFxyJcSk7JZLfMGnYOxIR1f';

// DOM Elements
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch the latest news from Currents API
async function fetchLatestNews() {
    try {
        // Construct the API URL for fetching the latest news
        const apiUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&pageSize=10`;
        console.log("Fetching URL for latest news:", apiUrl);

        // Make a fetch request to the API
        const response = await fetch(apiUrl);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // Parse the response JSON
        const data = await response.json();
        console.log("Fetched Latest News Data:", data);

        // Return the news articles from the response
        return data.news || [];
    } catch (error) {
        // Log and handle any errors
        console.error("Error fetching latest news:", error);
        return [];
    }
}

// Function to fetch news based on a search query
async function fetchSearchNews(query) {
    try {
        // Construct the API URL for searching news
        const apiUrl = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${encodeURIComponent(query)}&pageSize=10`;
        console.log("Fetching URL for search news:", apiUrl);

        // Make a fetch request to the API
        const response = await fetch(apiUrl);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // Parse the response JSON
        const data = await response.json();
        console.log("Fetched Search News Data:", data);

        // Return the news articles from the response
        return data.news || [];
    } catch (error) {
        // Log and handle any errors
        console.error("Error fetching news by query:", error);
        return [];
    }
}

// Function to display news articles in the UI
function displayBlogs(articles) {
    // Clear the existing content in the blog container
    blogContainer.innerHTML = "";

    // Check if there are no articles
    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles found.</p>";
        return;
    }

    // Iterate over each article and create HTML elements
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        // Create and configure the image element
        const img = document.createElement("img");
        img.src = article.image || 'default-image-url.jpg'; // Use a default image if none is provided
        img.alt = article.title || 'Image not available';

        // Create and configure the title element
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 
            ? article.title.slice(0, 30) + "..." 
            : article.title;
        title.textContent = truncatedTitle;

        // Create and configure the description element
        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120 
            ? article.description.slice(0, 120) + "..." 
            : article.description;
        description.textContent = truncatedDes || 'No description available';

        // Append elements to the blog card
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        // Add click event to open the article URL in a new tab
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        // Append the blog card to the blog container
        blogContainer.appendChild(blogCard);
    });
}

// Event listener for the search button
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            // Fetch news based on the search query
            const articles = await fetchSearchNews(query);
            // Display the fetched articles
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news by query", error);
        }
    } else {
        // Optional: Fetch and display the latest news if the search query is empty
        try {
            const articles = await fetchLatestNews();
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching latest news", error);
        }
    }
});

// Fetch and display the latest news on initial page load
(async () => {
    try {
        const articles = await fetchLatestNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching latest news on initial load", error);
    }
})();
