export default class ApiService {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchGallery() {
        console.log(this);
    const key = '21813787-5b33d57d4a7410a6824d2f569';
    
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${key}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            this.incrementPage();

            return data.hits;
        })
        .catch(error => {
            console.log(error);
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}