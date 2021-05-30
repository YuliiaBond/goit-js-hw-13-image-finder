import ApiService from './apiService';
import cardTpl from '../templates/card.hbs';
import LoadMoreBtn from './load-more-btn';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

// const debounce = require('lodash.debounce');

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(event) {
    event.preventDefault();
    
    apiService.query = event.currentTarget.elements.query.value;

    if (apiService.query === '') {
        return alert('Repeat your request!')
    }

    loadMoreBtn.show();
    apiService.resetPage();
    clearGalleryContainer();
    fetchGallery();
}

function fetchGallery() {
    loadMoreBtn.disable();
    apiService.fetchGallery().then(hits => {
        appenCardMarkup(hits);
        loadMoreBtn.enable();
    });
}

function appenCardMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}