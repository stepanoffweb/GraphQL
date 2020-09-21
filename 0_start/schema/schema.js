const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql // ???
const Movies = require('../models/movie')
const Directors = require('../models/director')

// const movies = [
//     {id:'1', name: 'Snatch', genre: 'Crime Comedy', directorId: 2},
//     {id:2, name: '1984', genre: 'Si-Fi', directorId: 1},
//     {id:'3', name: 'Pulp Fiction', genre: 'Crime', directorId: 4},
//     {id:4, name: 'V for vendetta', genre: 'Si-Fi Thriller', directorId: 3},
//     {id:'5', name: 'Reservour Dogs', genre: 'Crime', directorId: 4},
//     {id:6, name: 'The Hateful Eight', genre: 'Crime', directorId: 4},
//     {id:'7', name: 'Inglorious Basterds', genre: 'Crime', directorId: 4},
//     {id:8, name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime comedy', directorId: 2},
// ]
// const directors = [
//     {id:1, name: 'Michael Redford', age: 72}, // 5f674ea824d6a77f12a59e89
//     {id:'2', name: 'Guy Ritchie', age: 50}, // 5f674f2f24d6a77f12a59e8a
//     {id:3, name: 'James McTeique', age: 51},//5f674fb624d6a77f12a59e8b
//     {id:'4', name: 'Quentin Tarantino', age: 55},//5f6750a224d6a77f12a59e8c
// ]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString)},
        genre: { type: new GraphQLNonNull(GraphQLString) },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // return directors.find(director => director.id == parent.directorId)
                return Directors.findById(parent.directorId)
            }
        }
    }),
})
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies.filter(movie => movie.directorId == parent.id)
                return Movies.find({directorId: parent.id})
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: { name: {type: new GraphQLNonNull(GraphQLString)}, genre: {type: new GraphQLNonNull(GraphQLString)}, directorId: {type: GraphQLID}},
            resolve(parent, args) {
                const movie = new Movies({
                    // id: args.id,
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                })
                return movie.save()
            }
        },
        addDirector: {
            type: DirectorType,
            args: {name: {type: new GraphQLNonNull(GraphQLString)}, age: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve(parent, args) {
                const director = new Directors({
                    name: args.name,
                    age: args.age
                })
                return director.save()
            }
        },
        deleteMovie: {
            type: MovieType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return Movies.findByIdAndDelete(args.id)
            }
        },
        deleteDirector: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Directors.findByIdAndDelete(args.id)
            }
        },
        updateMovie: {
            type: MovieType,
            args: { id: {type: GraphQLID}, name: {type: new GraphQLNonNull(GraphQLString)}, genre: {type: new GraphQLNonNull(GraphQLString)}, directorId: {type: GraphQLID} },

            resolve(parent, args) {
                return Movies.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, genre: args.genre} },
                    {new: true}
                )
            }
        },
        updateDirector: {
            type: DirectorType,
            args: { id: {type: GraphQLID}, name: {type: new GraphQLNonNull(GraphQLString)}, age: {type: new GraphQLNonNull(GraphQLInt)} },

            resolve(parent, args) {
                return Directors.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, age: args.age} },
                    {new: true}
                )
            }
        },
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return movies.find(movie => movie.id == args.id) // при работе с ID сравнение НЕстрогое!
                return Movies.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return directors.find(director => director.id == args.id)
                return Directors.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies
                return Movies.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                // return directors
                return Directors.find({})
            }
        }
    }
})

module.exports =  new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

