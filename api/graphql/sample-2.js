/**
 * Second method of defining GraphQL Schema.
 * Data source is using data-anime.json, served with library json-server
 * that handle all crud operation
 */

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const axios = require('axios');

const server = 'http://localhost:3000';

const AnimeType = new GraphQLObjectType({
    name: 'Anime',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        director: { type: GraphQLString },
        year: { type: GraphQLInt },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        animes: {
            args: {
                limit: { type: GraphQLInt },
                page: { type: GraphQLInt },
            },
            type: new GraphQLList(AnimeType),
            resolve(_parentValue, args) {
                // pagination
                const params = {
                    _limit: args.limit,
                    _page: args.page,
                };

                return axios.get(`${server}/animes`, { params })
                    .then(res => res.data)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAnime: {
            type: AnimeType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                director: { type: new GraphQLNonNull(GraphQLString) },
                year: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(_parentValue, args) {
                return axios.post(`${server}/animes`, args).then(res => res.data)
            },
        },
        findAnime: {
            type: AnimeType,
            args: {
                id: { type: GraphQLInt },
            },
            resolve(_parentValue, args) {
                return axios.get(`${server}/animes/${args.id}`)
                    .then(res => res.data)
            }
        },
        updateAnime: {
            type: AnimeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                title: { type: GraphQLString },
                director: { type: GraphQLString },
                year: { type: GraphQLInt },
            },
            resolve(_parentValue, args) {
                return axios.put(`${server}/animes/${args.id}`, args)
                    .then(res => res.data)
            },
        },
        deleteAnime: {
            type: AnimeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(_parentValue, args) {
                return axios.delete(`${server}/animes/${args.id}`, args)
                    .then(res => res.data)
            },
        },
    }
});

module.exports = graphqlHTTP({
    schema: new GraphQLSchema({
        query: RootQuery,
        mutation,
    }),
    graphiql: true,
});
