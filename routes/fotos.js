var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

/* GET home page. */
router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: {attributes: []}
    }],
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(error => res.status(400).send(error))

});

router.get('/findAll/view', function(req, res, next) {
  Foto.findAll({  
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: {attributes: []}
    }],
  }) 
  .then(fotos => {
    res.render('fotos', { title: 'Fotos', arrFotos: fotos });
  })
  .catch(error => res.status(400).send(error));
});

router.get("/findById/json/:id", function (req, res, next) {
  const id = req.params.id;

  Foto.findByPk(id, {
    attributes: { exclude: ["updatedAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
  })
    .then((foto) => {
      if (!foto) {
        return res.status(404).json({ error: "Foto no encontrada" });
      }
      res.json(foto);
    })
    .catch((error) => res.status(400).send(error));
});

router.get("/findById/view/:id", function (req, res, next) {
  const id = req.params.id;

  Foto.findByPk(id, {
    attributes: { exclude: ["updatedAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
  })
    .then((foto) => {
      if (!foto) {
        return res.status(404).send("Foto no encontrada");
      }
      res.render("fotoConsultaId", { title: "Detalle de Foto", foto: foto });
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;