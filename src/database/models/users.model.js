const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserModel extends Model {
        static associate(model) {
            UserModel.hasMany(model.TaskModel, { foreignKey: 'userId', as: 'tasks' });
        }
    }

    UserModel.init(
        {
            role: {
                type: DataTypes.ENUM('USER', 'ADMIN'),
                defaultValue: 'USER',
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
        },
        {
            sequelize,
            modelName: UserModel.name,
            tableName: 'Users',
            paranoid: true,
            timestamps: true,
        },
    );

    return UserModel;
};
