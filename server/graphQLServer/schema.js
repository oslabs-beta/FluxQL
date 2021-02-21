const { makeExecutableSchema } = require('graphql-tools');
const { Pool } = require('pg');
const PG_URI = 'postgres://wwgaebae:B8vdUnTJzmByQxgvvqITbuxbIOvafGQJ@ziggy.db.elephantsql.com:5432/wwgaebae';

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
    users: [User!]!
    user(user_id: Int!): User!
    message: [Message!]!
    messageByID(message_id: Int!): Message!
    tasks: [Task!]!
    task(task_id: Int!): Task!
  }

  type Mutation {
    createUser(
      password: String!,
      username: String!,
      first_name: String!,
    ): User!

    updateUser(
      password: String!,
      username: String!,
      user_id: Int!,
      first_name: String!,
    ): User!

    deleteUser(user_id: ID!): User!

    createMessage(
      message: String!,
      created_at: Int,
      password: String!,
    ): Message!

    updateMessage(
      message: String!,
      message_id: Int!,
      created_at: Int,
      password: String!,
    ): Message!

    deleteMessage(message_id: ID!): Message!

    createTask(
      task: String!,
      user_id: Int,
    ): Task!

    updateTask(
      task_id: Int!,
      task: String!,
      user_id: Int,
    ): Task!

    deleteTask(task_id: ID!): Task!
  }

  type User {
    user_id: Int!
    password: String!
    username: String!
    first_name: String!
    tasks: [Task]
  }

  type Message {
    message_id: Int!
    message: String!
    created_at: Int
    password: String!
  }

  type Task {
    task_id: Int!
    task: String!
    users: [User]
  }

`;



  const resolvers = {
    Query: {      

      user: (parent, args) => {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const values = [args.user_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      users: () => {
        const query = 'SELECT * FROM users';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },

      messageByID: (parent, args) => {
        const query = 'SELECT * FROM message WHERE message_id = $1';
        const values = [args.message_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      message: () => {
        const query = 'SELECT * FROM message';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },

      task: (parent, args) => {
        const query = 'SELECT * FROM tasks WHERE task_id = $1';
        const values = [args.task_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      tasks: () => {
        const query = 'SELECT * FROM tasks';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => new Error(err));
      },
    },

    Mutation: {
      
      createUser: (parent, args) => {
        const query = 'INSERT INTO users(password, username, first_name) VALUES($1, $2, $3) RETURNING *';
        const values = [args.password, args.username, args.first_name];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updateUser: (parent, args) => {
        const query = 'UPDATE users SET password=$1, username=$2, first_name=$3 WHERE user_id = $4 RETURNING *';
        const values = [args.password, args.username, args.first_name, args.user_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deleteUser: (parent, args) => {
        const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
        const values = [args.user_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      createMessage: (parent, args) => {
        const query = 'INSERT INTO message(message, created_at, password) VALUES($1, $2, $3) RETURNING *';
        const values = [args.message, args.created_at, args.password];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updateMessage: (parent, args) => {
        const query = 'UPDATE message SET message=$1, created_at=$2, password=$3 WHERE message_id = $4 RETURNING *';
        const values = [args.message, args.created_at, args.password, args.message_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deleteMessage: (parent, args) => {
        const query = 'DELETE FROM message WHERE message_id = $1 RETURNING *';
        const values = [args.message_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      createTask: (parent, args) => {
        const query = 'INSERT INTO tasks(task, user_id) VALUES($1, $2) RETURNING *';
        const values = [args.task, args.user_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      updateTask: (parent, args) => {
        const query = 'UPDATE tasks SET task=$1, user_id=$2 WHERE task_id = $3 RETURNING *';
        const values = [args.task, args.user_id, args.task_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

      deleteTask: (parent, args) => {
        const query = 'DELETE FROM tasks WHERE task_id = $1 RETURNING *';
        const values = [args.task_id];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => new Error(err));
      },

    },
      
    User: {
      
        tasks: (users) => {
          const query = 'SELECT * FROM tasks WHERE user_id $1';
          const values = [users.user_id];
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