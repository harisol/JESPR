const { Sequelize, DataTypes, Model } = require('sequelize');

class Role extends Model {
    // define table columns here
    static attr = {
        rolename: DataTypes.STRING,
    }

    /**
     * init model
     * @param {Sequelize} sequelizeInstace sequelize instance.
     */
    static init(sequelizeInstace) {
        return super.init(this.attr, {
            // Other model options go here
            sequelize: sequelizeInstace, // We need to pass the connection instance
            tableName: 'roles',
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
        this.hasMany(models.User, {
            foreignKey: 'role_id',
            as: 'Users',
        });
    }

    // define queries here
    static getById(id) {
        return this.findOne({
            where: { id },
        });
    }
}

module.exports = Role;
