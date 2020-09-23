import { gql } from 'apollo-boost'

export const deleteDirectorMutation = gql`
    mutation deletDirectore($id: ID) {
        deleteDirector(id: $id) {
            id
        }
    }
`
