const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//Get all Routes
router.get('/', (req, res) => {

  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [{ model: Product }],
    attributes: ["id", "product_name", "price", "stock", "category_id"],
    through: ProductTag,
    as: "products",
  })

  .then((dbtagData) => res.json(dbtagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

//Get one Route
  router.get('/:id', (req, res) => {

    Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      through: ProductTag,
      as:"products",
    })
  })
    .then((dbtagData) => {
      if (!dbtagData) {
        res
          .status(404)
          .json({ message: "No Category Found" });
        return;
      }
      res.json(dbtagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Post Route
router.post('/', (req, res) => {

  Tag.create({
    category_name: req.body.category_name,
  })
    .then((dbtagData) => res.json(dbtagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Put Route
router.put('/:id', (req, res) => {
Tag.update({
    category_name: req.body.category_name,
    where: {
      id: req.params.id,
    },
  })
    .then((dbtagData) => {
      if (!dbTagData) {
        return;
      }
      res.json(dbtagData);
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete Route
router.delete('/:id', (req, res) => {

 Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbtagData) => {
      if (!dbtagData) {
        res.status(404).json({ message: "No category found" });
        return;

      }

      res.json(dbtagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
