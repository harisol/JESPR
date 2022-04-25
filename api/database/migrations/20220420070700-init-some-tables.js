'use strict';

const Sequelize = require('sequelize');

module.exports = {
  /**
   * @param {Sequelize.QueryInterface} queryInterface singleton instance of QueryInterface class.
   * @param {Sequelize} Sequelize sequelize module.
   */
  up: (queryInterface, Sequelize) => {
    /**
     * performs multiple changes in the database,
     * using an automatically-managed transaction
     * to ensure that all instructions are successfully executed
     * or rolled back in case of failure
     */
    return queryInterface.sequelize.transaction((t) => {
      const createRolesTable = queryInterface.createTable(
        'roles',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          rolename: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING(20),
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { transaction: t }
      );

      const createUsersTable = queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          username: {
            allowNull: false,
            type: Sequelize.STRING(50),
            unique: true,
          },
          role_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: { tableName: 'roles' },
              key: 'id',
            },
            onDelete: 'RESTRICT',
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { transaction: t }
      );

      const createOutletsTable = queryInterface.createTable(
        'outlets',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(100),
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { transaction: t }
      );

      const createUsersOutletsTable = queryInterface.createTable(
        'users_outlets',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          outlet_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: { tableName: 'outlets' },
              key: 'id',
            },
          },
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: { tableName: 'users' },
              key: 'id',
            },
            onDelete: 'CASCADE',
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { 
          transaction: t,
          uniqueKeys: {
            actions_unique: {
              fields: ['outlet_id', 'user_id']
            }
          }
        }
      );
      return Promise.all([
        createUsersTable,
        createRolesTable,
        createOutletsTable,
        createUsersOutletsTable,
      ]);
    });
  },

  /**
   * @param {Sequelize.QueryInterface} queryInterface singleton instance of QueryInterface class.
   * @param {Sequelize} Sequelize sequelize module.
   */
  down: (queryInterface, Sequelize) => {
    /**
     * performs multiple changes in the database,
     * using an automatically-managed transaction
     * to ensure that all instructions are successfully executed
     * or rolled back in case of failure
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('users_outlets', { transaction: t }),
        queryInterface.dropTable('outlets', { transaction: t }),
        queryInterface.dropTable('users', { transaction: t }),
        queryInterface.dropTable('roles', { transaction: t }),
      ]);
    });
  },
};
