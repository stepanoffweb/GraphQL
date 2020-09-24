import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo'

import { styles } from './styles';
import { moviesQuery} from '../MoviesTable/queries'
import { directorsQuery } from './queries'
import { updateMovieMutation, addMovieMutation } from './mutations'

const withGraphQL = compose(
    graphql(updateMovieMutation, {
        props: ({ mutate }) => ({
            updateMovie: movie => mutate({
                variables: movie,
                refetchQueries: [{
                     query: moviesQuery,
                     variables: { name: '' }
                 }]
            })
        })
    }),
    graphql(addMovieMutation, {
        props: ({ mutate }) => ({
            addMovie: movie => mutate({
                variables: movie,
                refetchQueries: [{
                    query: moviesQuery,
                     variables: { name: '' }
                 }]
            })
        })
    }),
    graphql(directorsQuery, {
        options: ({ name = '' }) => ({
            variables: { name },
        })
    }),
)

export default compose(withStyles(styles), withGraphQL);
