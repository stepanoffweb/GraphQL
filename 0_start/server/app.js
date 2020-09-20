const express = require('express')
const {graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema')

const PORT = 3005
const app = express()

app.use('/graphql', graphqlHTTP({ // {"errors":[{"message":"GraphQL middleware options must contain a schema."}]}
    schema,
    graphiql: true, // {"errors":[{"message":"Must provide query string."}]}
}))

app.listen(PORT, err => {
    err ? console.log(err): console.log('Server started!!!')
})
