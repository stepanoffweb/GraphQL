import { gql } from 'apollo-boost'

export const moviesQuery = gql`
    query moviesQuery($name: String) {
        movies(name: $name) {
            id
            name
            genre
            rate
            isWatched
            director {
                id
                name
            }
        }
    }
`
