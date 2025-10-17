

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: ` Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDQzYzZkY2UwYTEzZTg2NDI2YTJlMDY2MWRiNGQwNSIsIm5iZiI6MTc2MDQ0OTA1Mi42ODMsInN1YiI6IjY4ZWU1MjFjZTg2MTkwZmZhNTc4NTYwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6IirtN4pGzDnvp_Xi9plGKlKGe-Pj5GHGRxEtx6L0rk`,
  },
});

export default api;