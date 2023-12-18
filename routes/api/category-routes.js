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
    res.status(200).json(allCatData)

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

// From product-routes.js - mimic?
//  Product.create(req.body)
// .then((product) => {
//   // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//   if (req.body.tagIds.length) {
//     const productTagIdArr = req.body.tagIds.map((tag_id) => {
//       return {
//         product_id: product.id,
//         tag_id,
//       };
//     });
//     return ProductTag.bulkCreate(productTagIdArr);
//   }
//   // if no product tags, just respond
//   res.status(200).json(product);
// })
// .then((productTagIds) => res.status(200).json(productTagIds))
// .catch((err) => {
//   console.log(err);
//   res.status(400).json(err);
// });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCatData = await Category.findByPk(req.params.id);

    if (!updateCatData) {
      res.status(404).json({ error: 'Unable to find category' });
      return;
    }

    await Category.update(req.body);
    res.status(200).json(updateCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Product.update(req.body, {
//   where: {
//     id: req.params.id,
//   },
// })
//   .then((product) => {
//     if (req.body.tagIds && req.body.tagIds.length) {
      
//       ProductTag.findAll({
//         where: { product_id: req.params.id }
//       }).then((productTags) => {
//         // create filtered list of new tag_ids
//         const productTagIds = productTags.map(({ tag_id }) => tag_id);
//         const newProductTags = req.body.tagIds
//         .filter((tag_id) => !productTagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });

//           // figure out which ones to remove
//         const productTagsToRemove = productTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);
//                 // run both actions
//         return Promise.all([
//           ProductTag.destroy({ where: { id: productTagsToRemove } }),
//           ProductTag.bulkCreate(newProductTags),
//         ]);
//       });
//     }

//     return res.json(product);
//   })
//   .catch((err) => {
//     // console.log(err);
//     res.status(400).json(err);
//   });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCatData = await Category.findByPk(req.params.id);

    if (!deleteCatData) {
      res.status(404).json({ error: 'Unable to find category' });
      return;
    }
    
    await Category.destroy();
    res.status(200).json(deleteCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
