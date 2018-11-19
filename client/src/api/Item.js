import axios from 'axios';

export const getItemsByQuery = (query) => {
    return axios
      .get(`/api/items?q=${query}`);
};

export const getItemById = (id) => {
    return axios
      .get(`/api/items/${id}`);
};
