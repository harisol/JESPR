const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {
    // define table columns here
    static attr = {
        username: DataTypes.STRING,
        role_id: DataTypes.INTEGER,
    }

    /**
     * init model
     * @param {Sequelize} sequelizeInstace sequelize instance.
     */
    static init(sequelizeInstace) {
        return super.init(this.attr, {
            // Other model options go here
            sequelize: sequelizeInstace, // We need to pass the connection instance
            tableName: 'users',
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
        this.belongsTo(models.Role, {
            foreignKey: 'role_id'
        });
    }

    // define queries here
    static getById(id) {
        return this.findOne({
            where: { id },
        });
    }

    static findByUserName(username) {
        return this.findOne({
            where: { username }
        });
    }
}

module.exports = User;
