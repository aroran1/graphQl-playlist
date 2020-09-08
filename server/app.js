// import express from 'express'; install babel package

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// allow cross-origin requests
app.use(cors());

// Connect to mLab database
// use your db string and credentials
// mongoose.connect('mongodb+srv://nidhi:KrishMia1016!@gql-ninja-ar0m5.mongodb.net/test?retryWrites=true', {
// playlist is the database name which has 2 collections authors and books
mongoose.connect('mongodb+srv://nidhi:KrishMia1016!@gql-playlist-vxj43.mongodb.net/playlist?retryWrites=true', {
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen('4000', () => {
    console.log('now listening to requests on port 4000');
});