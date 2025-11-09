import axios from "axios";

const API_KEY = "53143785-3d26ca9fafc478fbd760d25ea";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1, per_page = 15) {
  try {
    const params = {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page,
      per_page,
    };

    const { data } = await axios.get(BASE_URL, { params });
    return data;
  } catch (error) {
    throw error;
  }
}
