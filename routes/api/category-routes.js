const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {

    const allCatData = await Category.findAll({

      include: [{ model: Product }],
    });

    res.status(200).json(allCatData);
  } catch (err) {

    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCatData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(oneCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCatData = await Category.create(req.body);
    res.status(200).json(newCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCatData = await Category.findByPk(req.params.id);

    if (!updateCatData) {
      res.status(400).json(err);
      // return;?
    }

    await Category.update(req.body);
    res.status(200).json(updateCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCatData = await Category.findByPk(req.params.id);

    if (!deleteCatData) {
      res.status(400).json(err);
      // return;? 
    }
    
    await Category.delete();
    res.status(200).json(updateCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
