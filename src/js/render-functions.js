export function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
  <li class="gallery-item">
    <div class="photo-card">
      <a href="${largeImageURL}" data-caption="${tags}" class="img-link"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
      <ul class="image-stats">
        <li><span>Likes:</span> ${likes}</li>
        <li><span>Views:</span> ${views}</li>
        <li><span>Comments:</span> ${comments}</li>
        <li><span>Downloads:</span> ${downloads}</li>
      </ul>
    </div>
  </li>`
    )
    .join("");
}

export function clearGallery(gallery) {
  gallery.innerHTML = "";
}

export function renderGallery(gallery, markup) {
  gallery.insertAdjacentHTML("beforeend", markup);
}
