module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            await queryInterface.createTable('Users', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.BIGINT,
                },
                role: {
                    type: Sequelize.ENUM('USER', 'ADMIN'),
                    defaultValue: 'USER',
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                email: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                status: {
                    type: Sequelize.ENUM('active', 'inactive'),
                    defaultValue: 'active',
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                deletedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            }),
        ]);
    },

    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('Users');
    },
};
