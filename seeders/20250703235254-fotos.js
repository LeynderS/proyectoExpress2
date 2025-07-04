'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for( let i = 1; i <= 10; i++) {
      await queryInterface.bulkInsert('fotos', [{
        titulo: `Foto ${i}`,
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        calification: (Math.random() * 10).toFixed(2),
        ruta: `public/images/foto${i}.png`,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos', null, {});
  }
};
