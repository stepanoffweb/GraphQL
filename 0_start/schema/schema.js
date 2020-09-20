const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql // ???

const movies = [
    {id:'1', name: 'Snatch', genre: 'Crime Comedy', directorId: 2},
    {id:2, name: '1984', genre: 'Si-Fi', directorId: 1},
    {id:'3', name: 'Pulp Fiction', genre: 'Crime', directorId: 4},
    {id:4, name: 'V for vendetta', genre: 'Si-Fi Thriller', directorId: 3},
    {id:'5', name: 'Reservour Dogs', genre: 'Crime', directorId: 4},
    {id:6, name: 'The Hateful Eight', genre: 'Crime', directorId: 4},
    {id:'7', name: 'Inglorious Basterds', genre: 'Crime', directorId: 4},
    {id:8, name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime comedy', directorId: 2},
]
const directors = [
    {id:1, name: 'Michael Redford', age: 72},
    {id:'2', name: 'Guy Ritchie', age: 50},
    {id:3, name: 'James McTeique', age: 51},
    {id:'4', name: 'Quentin Tarantino', age: 55},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return directors.find(director => director.id == parent.directorId)
            }
        }
    }),
})
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.filter(movie => movie.directorId == parent.id)
            }
        }
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return movies.find(movie => movie.id == args.id) // при работе с ID сравнение НЕстрогое!
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => director.id == args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors
            }
        }
    }
})

module.exports =  new GraphQLSchema({
    query: Query
})

