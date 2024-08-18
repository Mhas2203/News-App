const apiKey = "6b3300187c944add92c83224edaf5bce";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch news based on a query
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

// Function to display blogs
function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'default-image-url.jpg'; // Fallback if image URL is missing
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 
            ? article.title.slice(0, 30) + "..." 
            : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120 
            ? article.description.slice(0, 120) + "..." 
            : article.description;
        description.textContent = truncatedDes || 'No description available';

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

// Event listener for the search button
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim(); // Correct property to get the value
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

// Fetch and display random news on initial load
(async () => {
    try {
        const articles = await fetchNewsQuery(''); // Default to empty query for initial load
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
