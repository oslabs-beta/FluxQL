export function diagonal(d) {
  return (
    'M' +
    project(d.x, d.y) +
    'C' +
    project(d.x, (d.y + d.parent.y) / 2) +
    ' ' +
    project(d.parent.x, (d.y + d.parent.y) / 2) +
    ' ' +
    project(d.parent.x, d.parent.y)
  );
}

export function project(x, y) {
  const angle = ((x - 90) / 180) * Math.PI;
  const radius = y;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

export function dynamicText (advice) {
  return (advice.length === 0) ? null : `Here is the breakdown of your database, in preparation for GraphQL. We generated ${advice[0].Amount} Queries and ${advice[1].Amount} Mutations for you. Click on the pie chart to view further information on each.`
} 

export const staticText = `The graph on the right is a diagram of your PSQL Relational database. Currently, all tables of your database can be queried via the generated schema/resolvers below.`

export const extraDescriptions = [
  {
    Type: 'Types',
    Amount: 5,
    Description: `The GraphQL schema defines the server's API, allowing clients to know which operations can be performed by the server. With it, you can define object types and fields to represent data that can be retrieved from the API as well as root types that define the group of operations that the API allows.
    While we can define custom types in the schema, the GraphQL specification also defines a set of built-in scalar types. They are Int, Float, Boolean, String, and ID.`,
    Example: `   type Person {
      _id: Int!
      gender: String
      height: Int
      mass: String
      hair_color: String
      skin_color: String
      eye_color: String
      name: String!
      birth_year: String
      films: [Film]
      vessels: [Vessel]
      species: [Species]
      planets: [Planet]
    }`,
  },
  {
    Type: 'Resolvers',
    Amount: 5,
    Description: `A resolver is GraphQL's execution algorithm. It is this algorithm that transforms the query from the client into the actual result. The resolver moves through every field in the schema and executes its logic to determine its result.`,
    Example: `  const resolver = {
      Query: {
        person: (parent, args) => {
          try {
            const query = 'SELECT * FROM people WHERE _id = $1';
            const values = [args._id];
            return db.query(query, values).then((res) => res.rows[0]);
          } catch (err) {
            throw new Error(err);
          }
        }`,
  },
]