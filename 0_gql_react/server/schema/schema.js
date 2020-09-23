const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql // ???
const Movies = require('../models/movie')
const Directors = require('../models/director')

const MovieType = new GraphQLObjectType({
    name: 'Movie',// ? обязано соответствовать имени mongoose.model ?
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        rate: { type: GraphQLInt },
        isWatched: { type: new GraphQLNonNull(GraphQLBoolean) },
        director: {
            type: DirectorType,
            resolve({directorId}, args) {
                return Directors.findById(directorId)
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
            resolve({id}, args) {
                return Movies.find({directorId: id})
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: { name: {type: new GraphQLNonNull(GraphQLString)}, genre: {type: new GraphQLNonNull(GraphQLString)}, directorId: {type: GraphQLID}, rate: {type: GraphQLInt}, isWatched: {type: new GraphQLNonNull(GraphQLBoolean)} },
            resolve(parent, {name, genre, directorId, rate, isWatched}) {
                const movie = new Movies({
                    name,
                    genre,
                    directorId,
                    rate,
                    isWatched,
                })
                return movie.save()
            }
        },
        addDirector: {
            type: DirectorType,
            args: {name: {type: new GraphQLNonNull(GraphQLString)}, age: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve(parent, {name, age}) {
                const director = new Directors({
                    name,
                    age
                })
                return director.save()
            }
        },
        deleteMovie: {
            type: MovieType,
            args: { id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Movies.findByIdAndDelete(id)
            }
        },
        deleteDirector: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Directors.findByIdAndDelete(id)
            }
        },
        updateMovie: {
            type: MovieType,
            args: { id: {type: GraphQLID}, name: {type: new GraphQLNonNull(GraphQLString)}, genre: {type: new GraphQLNonNull(GraphQLString)}, directorId: {type: GraphQLID}, rate: {type: GraphQLInt}, isWatched: {type: new GraphQLNonNull(GraphQLBoolean)} },

            resolve(parent, {id, name, genre, directorId, isWatched, rate}) {
                return Movies.findByIdAndUpdate(
                    id,
                    {$set: {name, genre, directorId, isWatched, rate} },
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
            resolve(parent, {id}) {
                return Movies.findById(id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Directors.findById(id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Directors.find({})
            }
        }
    }
})

module.exports =  new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

