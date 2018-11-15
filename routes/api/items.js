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
      picture: data.thumbnail,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
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
      free_shipping: i.shipping.free_shipping
    });
  });

  return itemList;
};

router.get('/:id', (req, res) => {
  const id = req.params.id;
  axios
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
          res.send(response);
        })
        .catch(error => {
          res.send(error.message);
        });
    })
    .catch(error => {
      res.send(error.message);
    });
});

/* router.get('/:id/description', (req, res) => {
  const id = req.params.id;
  axios
    .get(`${API_URL}{ITEMS}/${id}/description`)
    .then(response => {
      console.log('response:', response.data);
      res.status(200);
      res.send(response.data);
    })
    .catch(error => {
      console.log(error.message);
      res.send(error.message);
    });
}); */

router.get('/', (req, res) => {
  const query = req.query.q;
  axios
    .get(`${API_URL}${SITES}/MLA/search?q=${query}`)
    .then(response => {
      res.send(parseItemList(response.data));
    })
    .catch(error => {
      console.log(error.message);
      res.send(error.message);
    });
});

module.exports = router;
