const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TaskModel extends Model {
        static associate(model) {
            TaskModel.belongsTo(model.UserModel, { foreignKey: 'userId', as: 'user' });
            TaskModel.belongsTo(model.UserModel, {
                foreignKey: 'assignedUserId',
                as: 'assignedUser'
            });
        }
    }

    TaskModel.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'Users',
                        key: 'id',
                    },
                },
            },
            title: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: true },
            dueDate: { type: DataTypes.DATE, allowNull: true },
            assignedUserId: { type: DataTypes.INTEGER, allowNull: true },
            completed: {type: DataTypes.BOOLEAN}
        },
        {
            sequelize,
            modelName: TaskModel.name,
            tableName: 'Tasks',
            paranoid: true,
            timestamps: true,
        },
    );

    return TaskModel;
};
