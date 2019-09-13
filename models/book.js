'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    author: DataTypes.STRING
  }, {});
  book.associate = function(model) {
    // associations can be defined here
    book.belongsTo(model.user);
  };
  return book;
};