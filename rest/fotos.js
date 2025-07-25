var express = require('express');
var router = express.Router();

const { Sequelize, Op} = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

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


router.get("/findById/:id/json", function (req, res, next) {
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

router.post("/save", function (req, res, next) {
    let { titulo, descripcion, calificacion, ruta } = req.body;

    Foto.create({
        titulo: titulo,
        descripcion: descripcion,
        calificacion: parseFloat(calificacion),
        ruta: ruta,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
        .then((foto) => {
            res.status(201).json(foto);
        })
        .catch((error) => res.status(400).send(error));
});

router.put("/update", function (req, res, next) {
     let { id, titulo, descripcion, calificacion, ruta } = req.body;

    Foto.update(
        {
            titulo: titulo,
            descripcion: descripcion,
            calificacion: parseFloat(calificacion),
            ruta: ruta,
            updatedAt: new Date(),
        },
        {
            where: { id: parseInt(id) }
        }
    )
        .then((resultado) => {
            if (resultado[0] === 0) {
                return res.status(404).json({ error: "Foto no encontrada" });
            }
            res.json({ message: "Foto actualizada con éxito" });
        })
        .catch((error) => res.status(400).send(error));
});

router.delete("/delete/:id", function (req, res, next) {
  const id = parseInt(req.params.id);

  Foto.destroy({
    where: { id: id }
  })
    .then((respuesta) => {
      res.json(respuesta);
    })
    .catch(error => res.status(400).send(error));
});

module.exports = router;