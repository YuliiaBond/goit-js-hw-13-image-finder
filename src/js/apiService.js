export default class ApiService {

    constructor() {
        this.searchQuery = '';
    }
    
    fetchGallery() {
        // console.log(this);
    const key = '21813787-5b33d57d4a7410a6824d2f569';
    
    fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=1&per_page=12&key=${key}`)
        .then(response => response.json())
        .then(console.log)
        .catch(error => {
            console.log(error);
        });
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}