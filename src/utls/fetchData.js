export const bringMovies = async (url) => {
  try {
    const res = await fetch(url);
    const dataJson = await res.json();
    const data = await dataJson;
    return data;
  } catch (err) {
    console.error("THERE WAS AN ERROR: ", err);
  }
};

export const urlGenerator = (url, extraInfo) => {
  const API_URL = "https://api.themoviedb.org/3";
  const api_key = "?api_key=69a105f4f1614e3db842531b1dbceab3";
  return API_URL + url + api_key + extraInfo;
};

export const imgUrlGenerator = (width, img) => {
  const API_URL = "https://image.tmdb.org/t/p";
  const img_width = "/w" + width;
  return API_URL + img_width + img;
};
