import { gql } from 'apollo-boost'

export const moviesQuery = gql`
    query moviesQuery {
        movies {
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
