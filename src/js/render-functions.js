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
  <a class="gallery-item" href="${largeImageURL}" data-caption="${tags}">
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <ul class="image-stats">
        <li><span>Likes:</span> ${likes}</li>
        <li><span>Views:</span> ${views}</li>
        <li><span>Comments:</span> ${comments}</li>
        <li><span>Downloads:</span> ${downloads}</li>
      </ul>
    </div>
  </a>`
    )
    .join("");
}

export function clearGallery(gallery) {
  gallery.innerHTML = "";
}

export function renderGallery(gallery, markup) {
  gallery.insertAdjacentHTML("beforeend", markup);
}
