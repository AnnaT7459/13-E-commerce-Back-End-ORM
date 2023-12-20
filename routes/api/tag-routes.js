const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }]
    })
    res.status(200).json(allTagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
      }],
    });
    res.status(200).json(oneTagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.findByPk(req.params.id);

    if (!updateTagData) {
      res.status(404).json({ error: 'Unable to find tag' });
      return;
    }

    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateTagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTagData = await Tag.findByPk(req.params.id);

    if (!deleteTagData) {
      res.status(404).json({ error: 'Unable to find tag' });
      return;
    }
    
    await Tag.destroy({
      where: {
        id: req.params.id,
      }
  });
    res.status(200).json(deleteTagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
