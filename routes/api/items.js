// apis a consultar
// /api/items?q= :query -> https://api.mercadolibre.com/sites/MLA/search?q= :query
// /api/items/ :id ->      https://api.mercadolibre.com/items/ :id
//                         https://api.mercadolibre.com/items/ :id /description

const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_URL = 'https://api.mercadolibre.com';
const ITEMS = '/items';
const SITES = '/sites';

const parseItem = data => {
  return {
    author: {
      name: 'name',
      lastname: 'lastname'
    },
    item: {
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: data.price,
        decimals: '???'
      },
      picture: data.pictures[0].url,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
      permalink: data.permalink,
      description: ''
    }
  };
};

const parseItemList = data => {
  let itemList = {
    author: {
      name: 'name',
      lastname: 'lastname'
    },
    categories: [],
    items: []
  };

  if (data.filters.length && data.filters[0].values.length) {
    const categories = data.filters[0].values[0].path_from_root;
    categories.map(cat => {
      itemList.categories.push(cat.name);
    });
  }

  data.results.map(i => {
    itemList.items.push({
      id: i.id,
      title: i.title,
      price: {
        currency: i.currency_id,
        amount: i.price,
        decimals: '???'
      },
      picture: i.thumbnail,
      condition: i.condition,
      free_shipping: i.shipping.free_shipping,
      location: i.address.state_name
    });
  });

  return itemList;
};

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return axios
    .get(`${API_URL}${ITEMS}/${id}`)
    .then(response => {
      return Promise.resolve({
        data: parseItem(response.data)
      });
    })
    .then(response => {
      axios
        .get(`${API_URL}${ITEMS}/${id}/description`)
        .then(description => {
          response.data.item.description = description.data.plain_text;
          res.json(response);
        })
        .catch(error => {
          console.log(error.message);
        });
    })
    .catch(error => {
      console.log(error.message);
    });
});

router.get('/', (req, res) => {
  const query = req.query.q;
  return axios
    //.get(`${API_URL}${SITES}/MLA/search?q=${query}?offset=5&limit=4`)
    .get(`${API_URL}${SITES}/MLA/search?q=${query}`)
    .then(response => {
      res.json(parseItemList(response.data));
    })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = router;
