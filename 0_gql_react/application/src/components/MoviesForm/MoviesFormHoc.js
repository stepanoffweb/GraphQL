import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo'

import { styles } from './styles';
import { directorsQuery } from './queries'
import { moviesQuery} from '../MoviesTable/queries'
import { updateMovieMutation, addMovieMutation } from './mutations'

const withGraphQLUpdate = graphql(updateMovieMutation, {
    props: ({ mutate }) => ({
        updateMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{ query: moviesQuery }]
        })
    })
})

const withGraphQLAdd = graphql(addMovieMutation, {
    props: ({ mutate }) => ({
        addMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{ query: moviesQuery }]
        })
    })
})

export default compose(withStyles(styles), withGraphQLUpdate, withGraphQLAdd, graphql(directorsQuery));
