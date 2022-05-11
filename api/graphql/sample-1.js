/**
 * First method of defining GraphQL Schema.
 * Data source is using local variable "users".
 * Data will be restarted as the server restarts
 */

const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const id = require('crypto').randomBytes(10).toString('hex');

let users = [{ id, name: 'brachio', email: 'brachio@email.com' }];

const schema = buildSchema(`
    type User {
        id: ID!,
        name: String!,
        email(unit: String = METER): String!
    }
    input UserInput {
        name: String,
        email: String!
    }
    type Query {
        id: ID!,
        name: String!,
        email: String!,
        listUser: [User!]!,
        getUser(id: ID!): User
    }
    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: ID!, input: UserInput): User
    }
`);

const root = {
    id: () => 1,
    name: () => {
      return "brachio";
    },
    email: () => {
      return "brachio@email.com";
    },
    listUser: () => users,
    getUser: ({id}) => {
        console.log({id});
        const user = users.find(user => user.id === id);
        if(!user) {
            throw new Error('please check the user id, we cannot find it');
        }
        return user;
    },
    createUser: ({ input }) => {
        const id = require('crypto').randomBytes(10).toString('hex');
        users.push({ id, ...input });

        return { id, ...input };
    },
    updateUser: ({ id, input }) => {
        const newUsers = users.map((user) => {
          if (user.id === id) {
            return { ...user, ...input };
          } else {
            return user;
          }
        });
        users = [...newUsers];
        return { id, ...input };
    }
};

module.exports = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
});
