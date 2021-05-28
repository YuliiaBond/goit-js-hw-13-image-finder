import ApiService from './apiService';
import cardTpl from '../templates/card.hbs';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const apiService = new ApiService()

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
    event.preventDefault();
    
    apiService.query = event.currentTarget.elements.query.value;
    apiService.resetPage();
    apiService.fetchGallery().then(appenCardMarkup);
}

function onLoadMore() {
    apiService.fetchGallery().then(appenCardMarkup);
}

function appenCardMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function clearGalleryContainer() {
    refs.galleryContainer.insertAdjacentHTML = '';
}