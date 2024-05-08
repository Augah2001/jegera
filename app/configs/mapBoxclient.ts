import axios from "axios";
import { accessToken } from "mapbox-gl";




export const suggestAPIclient = axios.create({
  baseURL: `https://api.mapbox.com/search/searchbox/v1/`,
  params: {
    access_token:
      "pk.eyJ1IjoiYXVnYWgiLCJhIjoiY2x0a2pidTFiMGZnbDJrb2VzcnZ6YTJ5biJ9.ulIIDJl3rnwWq8iGBzre5Q",
      session_token: '0f5dc42e-be48-4071-88f4-f09f8890d5a5',
      proximity: 'ip',
      origin: '-17.825,31.05477',
      country: 'ZW',
      // types: ["country", "region", "postcode", "district", "place", "city", "locality", "neighborhood", "street", "address", "poi"]

      
  },
});
export const retrieveAPIclient = axios.create({
  baseURL: `https://api.mapbox.com/search/searchbox/v1/`,
  params: {
    access_token:
      "pk.eyJ1IjoiYXVnYWgiLCJhIjoiY2x0a2pidTFiMGZnbDJrb2VzcnZ6YTJ5biJ9.ulIIDJl3rnwWq8iGBzre5Q",
      session_token: '0f5dc42e-be48-4071-88f4-f09f8890d5a5',      
  },
});


