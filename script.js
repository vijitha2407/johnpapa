document.addEventListener('DOMContentLoaded', () => {
    const repositoriesContainer = document.getElementById('repositories');
    const paginationContainer = document.getElementById('pagination');
    const loader = document.getElementById('loader');
    const searchInput = document.getElementById('search');

    let currentPage = 1;
    let perPage = 10;

    function fetchRepositories(page) {
        loader.style.display = 'block';

        // Make API call to fetch repositories based on the page and perPage values
        // Replace the API_URL with the actual GitHub API endpoint you are using
        const API_URL = `https://api.github.com/search/repositories?q=topic:YOUR_TOPIC&page=${page}&per_page=${perPage}`;
        
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                displayRepositories(data.items);
                displayPagination(data.total_count);
                loader.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching repositories:', error);
                loader.style.display = 'none';
            });
    }

    function displayRepositories(repositories) {
        repositoriesContainer.innerHTML = '';

        repositories.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repository-card');
            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description}</p>
            `;
            repositoriesContainer.appendChild(repoCard);
        });
    }

    function displayPagination(totalCount) {
        const totalPages = Math.ceil(totalCount / perPage);

        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('span');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;
            pageLink.addEventListener('click', () => {
                currentPage = i;
                fetchRepositories(currentPage);
            });
            paginationContainer.appendChild(pageLink);
        }
    }

    // Initial fetch when the page loads
    fetchRepositories(currentPage);

    // Event listener for changing the number of repositories per page
    searchInput.addEventListener('input', () => {
        // Implement search functionality here
        // You may want to debounce the input or wait for the user to press Enter
    });
});
