import { gql } from 'apollo-boost'

export const updateMovieMutation = gql`
    mutation updateMovie($id: ID, $name: String!, $genre: String!, $isWatched: Boolean!, $rate: Int, $directorId: ID) {
        updateMovie(id: $id, name: $name, genre: $genre, isWatched: $isWatched, rate: $rate, directorId: $directorId) {
            name
        }
    }
`

export const addMovieMutation = gql`
    mutation addMovie($name: String!, $genre: String!, $isWatched: Boolean!, $rate: Int, $directorId: ID) {
        addMovie(name: $name, genre: $genre, isWatched: $isWatched, rate: $rate, directorId: $directorId) {
            name
        }
    }
`
