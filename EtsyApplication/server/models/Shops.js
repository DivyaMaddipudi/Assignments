module.exports = (sequelize, DataTypes) => {
  const Shops = sequelize.define("Shops", {
    shopId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      references: {
        model: "Users",
        key: "id",
      },
    },
    shopName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Shops;
};
