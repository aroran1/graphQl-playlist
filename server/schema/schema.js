const graphql = require('graphql');
// lodash is only used as poc with local data
const _ = require('lodash');
 // models to interact with the database collections
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;

// //Dummy Data will be replaced by MongoDB
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Romantic', id: '6', authorId: '3' }
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' },
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                // return author who wrote this book by finding its id in a Author collection
                // return _.find(authors, {id: parent.authorId}) - works with local dummy data
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        id: { type: GraphQLID },
        books: { 
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent);
                // return books written by this author by matching its id as authorId in a Book collection
                // return _.filter(books, {authorId: parent.id}) - works with local dummy data
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ) {
                // code to get data from DB / other source
                // return _.find(books, {id: args.id}); - works with local dummy data
                return Book.findById(args.id); // will return matched Book by passed id
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ) {
                // code to get data from DB / other source
                // return _.find(authors, {id: args.id}); - works with local dummy data
                return Author.findById(args.id); // will return matched Author by passed id
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books - works with local dummy data
                return Book.find({}); // pass empty object in find will return all books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors - works with local dummy data
                return Author.find({}); // pass empty object in find will return all books
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, // GraphQLNonNull makes the argument as required
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });

                return author.save(); // save is mongoose method
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save(); // save is mongoose method
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});