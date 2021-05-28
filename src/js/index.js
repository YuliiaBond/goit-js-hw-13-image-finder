import ApiService from './apiService';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
};

const apiService = new ApiService()
refs.searchForm.addEventListener('submit', onSearch);


function onSearch(event) {
    event.preventDefault();
    
    apiService.query = event.currentTarget.elements.query.value;

    apiService.fetchGallery()
}