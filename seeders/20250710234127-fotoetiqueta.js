'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let [fotos, fotos_metadata] = await queryInterface.sequelize.query('SELECT id FROM fotos');
    let [etiquetas, etiquetas_metadata] = await queryInterface.sequelize.query('SELECT id FROM etiquetas');

    const relaciones = [];

    for (const foto of fotos) {
      let etiqueta1 = etiquetas[Math.floor(Math.random() * etiquetas.length)].id;
      let etiqueta2;
      do {
        etiqueta2 = etiquetas[Math.floor(Math.random() * etiquetas.length)].id;
      } while (etiqueta2 === etiqueta1);
      relaciones.push({
        foto_id: foto.id,
        etiqueta_id: etiqueta1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      relaciones.push({
        foto_id: foto.id,
        etiqueta_id: etiqueta2,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('fotoetiquetas', relaciones, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiquetas', null, {});
  }
};
