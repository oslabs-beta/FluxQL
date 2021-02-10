const { makeExecutableSchema } = require('graphql-tools');
const { Pool } = require('pg');
const PG_URI = 'postgres://rviqlbrx:EAr3zdbJKfuruitHjFLKg5EItc_1wMfK@ziggy.db.elephantsql.com:5432/rviqlbrx';

const pool = new Pool({
  connectionString: PG_URI
});

const db = {};
db.query = (text,params, callback) => {
  console.log('executed query:', text)
  return pool.query(text, params, callback) 
};


const typeDefs = `
  type Query {
    books: [Book!]!
    book(id: Int!): Book!
    authors: [Author!]!
    author(id: Int!): Author!
    product: [Product!]!
    productByID(product_id: Int!): Product!
    bill: [Bill!]!
    billByID(bill_id: Int!): Bill!
    person: [Person!]!
    personByID(id: Int!): Person!
    orders: [Order!]!
    order(id: Int!): Order!
  }

  type Mutation {
    createBook(
      title: String!,
      primary_author: String,
      author_id: Int,
    ): Book!

    updateBook(
      title: String!,
      primary_author: String,
      id: Int!,
      author_id: Int,
    ): Book!

    deleteBook(id: ID!): Book!

    createAuthor(
      name: String!,
      book_id: Int,
    ): Author!

    updateAuthor(
      name: String!,
      book_id: Int,
      id: Int!,
    ): Author!

    deleteAuthor(id: ID!): Author!

    createProduct(
      product: String!,
      price: Int!,
    ): Product!

    updateProduct(
      product: String!,
      product_id: Int!,
      price: Int!,
    ): Product!

    deleteProduct(product_id: ID!): Product!

    createBill(
      bill: String!,
      billdate: String!,
    ): Bill!

    updateBill(
      bill: String!,
      bill_id: Int!,
      billdate: String!,
    ): Bill!

    deleteBill(bill_id: ID!): Bill!

    createPerson(
      email: String!,
      order_id: Int,
      name: String!,
    ): Person!

    updatePerson(
      email: String!,
      id: Int!,
      order_id: Int,
      name: String!,
    ): Person!

    deletePerson(id: ID!): Person!

    createOrder(
      items: String!,
    ): Order!

    updateOrder(
      items: String!,
      id: Int!,
    ): Order!

    deleteOrder(id: ID!): Order!
  }

  type Book {
    id: Int!
    title: String!
    primary_author: String
    author: Author
    authors: [Author]
  }

  type Author {
    id: Int!
    name: String!
    book: Book
    books: [Book]
  }

  type Product {
    product_id: Int!
    product: String!
    price: Int
    bill: [Bill]
  }

  type Bill {
    bill_id: Int!
    bill: String!
    billdate: String
    product: [Product]
  }

  type Person {
    id: Int!
    email: String!
    name: String!
    orders: [Order]
  }

  type Order {
    id: Int!
    items: String!
    person: [Person]
  }

`;



  const resolvers = {
    Query: {      

      book: (parent, args) => {
        const query = 'SELECT * FROM books WHERE id = $1';
        const values = [args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      books: () => {
        const query = 'SELECT * FROM books';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },

      author: (parent, args) => {
        const query = 'SELECT * FROM authors WHERE id = $1';
        const values = [args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      authors: () => {
        const query = 'SELECT * FROM authors';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },

      productByID: (parent, args) => {
        const query = 'SELECT * FROM product WHERE product_id = $1';
        const values = [args.product_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      product: () => {
        const query = 'SELECT * FROM product';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },

      billByID: (parent, args) => {
        const query = 'SELECT * FROM bill WHERE bill_id = $1';
        const values = [args.bill_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      bill: () => {
        const query = 'SELECT * FROM bill';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },

      personByID: (parent, args) => {
        const query = 'SELECT * FROM person WHERE id = $1';
        const values = [args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      person: () => {
        const query = 'SELECT * FROM person';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },

      order: (parent, args) => {
        const query = 'SELECT * FROM orders WHERE id = $1';
        const values = [args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      orders: () => {
        const query = 'SELECT * FROM orders';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },
    },

    Mutation: {
      
      createBook: (parent, args) => {
        const query = 'INSERT INTO books(title, primary_author, author_id) VALUES($1, $2, $3) RETURNING *';
        const values = [args.title, args.primary_author, args.author_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updateBook: (parent, args) => {
        const query = 'UPDATE books SET title=$1, primary_author=$2, author_id=$3 WHERE id = $4 RETURNING *';
        const values = [args.title, args.primary_author, args.author_id, args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deleteBook: (parent, args) => {
        const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
        const values = [args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      createAuthor: (parent, args) => {
        const query = 'INSERT INTO authors(name, book_id) VALUES($1, $2) RETURNING *';
        const values = [args.name, args.book_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updateAuthor: (parent, args) => {
        const query = 'UPDATE authors SET name=$1, book_id=$2 WHERE id = $3 RETURNING *';
        const values = [args.name, args.book_id, args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deleteAuthor: (parent, args) => {
        const query = 'DELETE FROM authors WHERE id = $1 RETURNING *';
        const values = [args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      createProduct: (parent, args) => {
        const query = 'INSERT INTO product(product, price) VALUES($1, $2) RETURNING *';
        const values = [args.product, args.price];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updateProduct: (parent, args) => {
        const query = 'UPDATE product SET product=$1, price=$2 WHERE product_id = $3 RETURNING *';
        const values = [args.product, args.price, args.product_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deleteProduct: (parent, args) => {
        const query = 'DELETE FROM product WHERE product_id = $1 RETURNING *';
        const values = [args.product_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      createBill: (parent, args) => {
        const query = 'INSERT INTO bill(bill, billdate) VALUES($1, $2) RETURNING *';
        const values = [args.bill, args.billdate];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updateBill: (parent, args) => {
        const query = 'UPDATE bill SET bill=$1, billdate=$2 WHERE bill_id = $3 RETURNING *';
        const values = [args.bill, args.billdate, args.bill_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deleteBill: (parent, args) => {
        const query = 'DELETE FROM bill WHERE bill_id = $1 RETURNING *';
        const values = [args.bill_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      createPerson: (parent, args) => {
        const query = 'INSERT INTO person(email, order_id, name) VALUES($1, $2, $3) RETURNING *';
        const values = [args.email, args.order_id, args.name];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updatePerson: (parent, args) => {
        const query = 'UPDATE person SET email=$1, order_id=$2, name=$3 WHERE id = $4 RETURNING *';
        const values = [args.email, args.order_id, args.name, args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deletePerson: (parent, args) => {
        const query = 'DELETE FROM person WHERE id = $1 RETURNING *';
        const values = [args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      createOrder: (parent, args) => {
        const query = 'INSERT INTO orders(items) VALUES($1) RETURNING *';
        const values = [args.items];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updateOrder: (parent, args) => {
        const query = 'UPDATE orders SET items=$1 WHERE id = $2 RETURNING *';
        const values = [args.items, args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deleteOrder: (parent, args) => {
        const query = 'DELETE FROM orders WHERE id = $1 RETURNING *';
        const values = [args.id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

    },
      
    Book: {
      
        authors: (books) => {
          const query = 'SELECT * FROM authors WHERE book_id = $1';
          const values = [books.id];
          return db.query(query, values)
            .then(data => data.rows[0])
            .catch(err => new Error(err));
        },
    },

    Author: {
      
        books: (authors) => {
          const query = 'SELECT * FROM books WHERE author_id = $1';
          const values = [authors.id];
          return db.query(query, values)
            .then(data => data.rows[0])
            .catch(err => new Error(err));
        },
    },

    Product: {
      
        bill: (product) => {
          const query = 'SELECT * FROM bill LEFT OUTER JOIN bill_product ON bill.bill_id = bill_product.bill_id WHERE bill_product.product_id = $1';
          const values = [product.product_id];
          return db.query(query, values)
            .then(data => data.rows)
            .catch(err => new Error(err));
        }, 
    },

    Bill: {
      
        product: (bill) => {
          const query = 'SELECT * FROM product LEFT OUTER JOIN bill_product ON product.product_id = bill_product.product_id WHERE bill_product.bill_id = $1';
          const values = [bill.bill_id];
          return db.query(query, values)
            .then(data => data.rows)
            .catch(err => new Error(err));
        }, 
    },

    Order: {
      
        person: (orders) => {
          const query = 'SELECT * FROM person WHERE order_id $1';
          const values = [orders.id];
          return db.query(query, values)
            .then(data => data.rows)
            .catch(err => new Error(err));
        },
    },

  }

  const schema = makeExecutableSchema({    
    typeDefs,    
    resolvers,
    });

    module.exports = schema;