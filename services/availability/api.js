export default function(router) {
  router.get('/availability', (req, res) => {
    res.json({ services });
  });
}

const services = [
  {
    "id": "1",
    "name": "Books",
    "path": "/books/",
    "online": true
  },
  {
    "id": "2",
    "name": "Colors",
    "path": "/colors/",
    "online": true
  }
];
