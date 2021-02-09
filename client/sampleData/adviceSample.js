export default [
  {
    Type: 'Queries', //! change Titles to Type
    Amount: 12,
    //! we'll give you a static description for Queries and Mutation
    Description:
      'GraphQL APIs are organized in terms of types and fields, not endpoints. Access the full capabilities of your data from a single endpoint. GraphQL uses types to ensure Apps only ask for what’s possible and provide clear and helpful errors. Apps can use types to avoid writing manual parsing code.',

    //! need to add this property in the object with the example query call as a regular string template
    Example:
      '  query: {<br>' +
      '      people {<br>' +
      '      gender,<br>' +
      '      height,<br>' +
      '      mass,<br>' +
      '      hair_color,<br>' +
      '      skin_color,<br>' +
      '      eye_color,<br>' +
      '      name,<br>' +
      '      birth_year,<br>' +
      '     <insert additional column names here><br>' +
      '    }<br>' +
      '  }',
  },
  {
    Type: 'Mutations',
    Amount: 18,
    Description: 'some fake description describing mutations',
    Example:
      '  mutation: {<br>' +
      '    deletePerson (_id: <insert value here> ) {<br>' +
      '      gender,<br>' +
      '      height,<br>' +
      '      mass,<br>' +
      '      hair_color,<br>' +
      '      skin_color,<br>' +
      '      eye_color,<br>' +
      '      name,<br>' +
      '      birth_year,<br>' +
      '     <insert additional column names here><br>' +
      '    }<br>' +
      '  }',
  },
];
