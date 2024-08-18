const apiKey = 'Your API key is: 6b3300187c944add92c83224edaf5bce'

const blogContainer = document.getElementById("blog-container")

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pagesSize=10&apiKey=${apiKey}`
        const respone = await fetch(apiUrl)
        const data = await respone.json()
        console.log(data)

    } catch (error) {
        console.error("Error fetching random news", error)
        return[]
        
    }
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        console.log(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
})();