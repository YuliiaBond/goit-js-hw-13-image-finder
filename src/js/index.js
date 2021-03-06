import ApiService from './apiService';
import cardTpl from '../templates/card.hbs';
import LoadMoreBtn from './load-more-btn';
// import { notification } from './notify';
import error from './error';

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
    
    apiService.query = event.currentTarget.elements.query.value.trim();

    // console.log(apiService.query);

    if (apiService.query !== ' ' && apiService.query !== '' ) {
        
    loadMoreBtn.show();
    apiService.resetPage();
    clearGalleryContainer();
    fetchGallery();
    } else {
        error();
        }
}

function fetchGallery() {
    loadMoreBtn.disable();
    apiService.fetchGallery().then(hits => {

        if (hits.length < 12) {
            console.log(hits.length);
            loadMoreBtn.hide();
            appenCardMarkup(hits);
            return;
        }
            appenCardMarkup(hits);
            loadMoreBtn.enable();
        
        if (apiService.page > 2) {
            console.log(apiService.page);
            // loadMoreBtn.refs.button.scrollIntoView({ behavior: 'smooth', block: 'end', });
            window.scrollTo({
                top: document.documentElement.offsetHeight,
                behavior: 'smooth',
            });
        }
    });
        

        
}

function appenCardMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}