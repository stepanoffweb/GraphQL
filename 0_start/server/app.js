const express = require('express')
const {graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema')
const mongoose = require('mongoose')

const PORT = 3005
const app = express()

mongoose.connect('mongodb+srv://hugomailru:2A6UtkuHeq%5ETca3@cluster0.q2h5r.mongodb.net/cinema?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', err => console.log(`Connection error: ${err}`))
mongoose.connection.once('open', () => console.log('Connected to DB!!!'))

app.use('/graphql', graphqlHTTP({ // {"errors":[{"message":"GraphQL middleware options must contain a schema."}]}
    schema,
    graphiql: true, // {"errors":[{"message":"Must provide query string."}]}
}))

app.listen(PORT, err => {
    err ? console.log(err): console.log('Server started!!!')
})


