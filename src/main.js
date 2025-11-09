import { fetchImages } from "./js/pixaay-api.js";
import { createGalleryMarkup, clearGallery, renderGallery } from "./js/render-functions.js";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector("#load-more");
const loader = document.querySelector(".loader");

let currentQuery = "";
let page = 1;
const PER_PAGE = 150;
let totalHits = 0;

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "data-caption",
  captionDelay: 250,
});

hideLoadMore();
hideLoader();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = form.elements.query.value.trim();

  if (query === "") {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query",
      position: "topRight",
    });
    return;
  }

  currentQuery = query;
  page = 1;
  clearGallery(gallery);
  hideLoadMore();

  showLoader();

  try {
    const data = await fetchImages(currentQuery, page, PER_PAGE);
    hideLoader();

    totalHits = data.totalHits || 0;

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        title: "No results",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    const markup = createGalleryMarkup(data.hits);
    renderGallery(gallery, markup);

    lightbox.refresh();

    if (page * PER_PAGE < totalHits) {
      showLoadMore();
    } else {
      hideLoadMore();
      iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (err) {
    hideLoader();
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  hideLoadMore();
  showLoader();

  try {
    const data = await fetchImages(currentQuery, page, PER_PAGE);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        title: "No more",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
      hideLoadMore();
      return;
    }

    const markup = createGalleryMarkup(data.hits);
    renderGallery(gallery, markup);

    lightbox.refresh();

    smoothScrollAfterAppend();

    if (page * PER_PAGE < data.totalHits) {
      showLoadMore();
    } else {
      hideLoadMore();
      iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (err) {
    hideLoader();
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
  }
});

function showLoader() {
  if (!loader) return;
  loader.classList.remove("hidden");
}

function hideLoader() {
  if (!loader) return;
  loader.classList.add("hidden");
}

function showLoadMore() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove("hidden");
}

function hideLoadMore() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add("hidden");
}

function smoothScrollAfterAppend() {
  const firstCard = gallery.querySelector(".photo-card");
  if (!firstCard) return;

  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    left: 0,
    behavior: "smooth",
  });
}
