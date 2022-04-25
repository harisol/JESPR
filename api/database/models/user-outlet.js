const { Sequelize, DataTypes, Model } = require('sequelize');

class UserOutlet extends Model {
    // define table columns here
    static attr = {
        outlet_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
    }

    /**
     * init model
     * @param {Sequelize} sequelizeInstace sequelize instance.
     */
    static init(sequelizeInstace) {
        return super.init(this.attr, {
            // Other model options go here
            sequelize: sequelizeInstace, // We need to pass the connection instance
            tableName: 'users_outlets',
            createdAt: 'created_at',
            updatedAt: false,
            underscore: true,
        });
    }
    
    /**
     * define associations here
     * @param {Object} models initialized models in models/index.js.
     */
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        this.belongsTo(models.Outlet, {
            foreignKey: 'outlet_id'
        });
    }

    // define queries here
    static listOutletOfUser(userId, limit, offset) {
        return this.findAll({
            where: { user_id: userId },
            include: ['Outlet'],
            limit,
            offset
        });
    }
}

module.exports = UserOutlet;
