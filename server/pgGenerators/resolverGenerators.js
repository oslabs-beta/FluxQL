const { singular } = require('pluralize');
const camelCase = require('camelcase');
const { pascalCase }= require('pascal-case');
const { isJoinTable } = require('./helperFunctions.js');
const resolverGenerator = {};

/* currentTable: {
  primaryKey: '___',
  foreignKeys: { foreignKeyName: { referenceTable: ____, referenceKey: ______ }, ....},
  referencedBy: {tableName: foreignKey, ...}, <--- this refers to tables that reference the current table
  columns: {
    columnName: {
      'dataType': _____,
      'columnDefault': _____,
      'charMaxLength': ______,
      'isNullable': ______,
    }
    .......
  },
}
*/

resolverGenerator.assembleQueries = (currentTable, tableData) => {
  const { primaryKey } = tableData;
  const queryByPrimaryKey = resolverGenerator.queryByPrimaryKey(
    currentTable,
    primaryKey
  );
  const queryAll = resolverGenerator.queryAll(currentTable);
  return `\n${queryByPrimaryKey}\n${queryAll}`;
};

resolverGenerator.assembleMutations = (currentTable, tableData) => {
  const { primaryKey, columns } = tableData;
  const createMutation = resolverGenerator.createMutation(
    currentTable,
    columns
  );
  const updateMutation = resolverGenerator.updateMutation(
    currentTable,
    primaryKey,
    columns
  );
  const deleteMutation = resolverGenerator.deleteMutation(
    currentTable,
    primaryKey
  );
  return `${createMutation}\n${updateMutation}\n${deleteMutation}\n`;
};

resolverGenerator.assembleCustomRelationships = (currentTable, tables) => {
  const { referencedBy } = tables[currentTable];
  if (!referencedBy) return '';
  const queryName = pascalCase(singular(currentTable));
  let relationshipTypes = '';
  relationshipTypes += resolverGenerator.determineRelationships(currentTable, tables);
  return `
    ${queryName}: {
      ${relationshipTypes}
    },\n`;
};

resolverGenerator.queryByPrimaryKey = (currentTable, primaryKey) => {
  let queryName = camelCase(singular(currentTable));
  if (currentTable === singular(currentTable)) queryName += 'ById';
  return `
      ${queryName}: (parent, args) => {
        const query = 'SELECT * FROM ${currentTable} WHERE ${primaryKey} = $1';
        const values = [args.${primaryKey}];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => throw new Error(err));
      },`;
};

resolverGenerator.queryAll = (currentTable) => {
  const queryName = camelCase(currentTable);
  return `
      ${queryName}: () => {
        const query = 'SELECT * FROM ${currentTable}';
        return db.query(query)
          .then(data => data.rows)
          .catch(err => throw new Error(err));
      },`;
};

resolverGenerator.createMutation = (currentTable, columns) => {
  const queryName = camelCase('create_' + singular(currentTable));
  const columnNames = Object.keys(columns);
  const values = columnNames.map((el, i) => `$${++i}`);

  return `
      ${queryName}: (parent, args) => {
        const query = 'INSERT INTO ${currentTable}(${columnNames
          .join(', ')}) VALUES(${values}) RETURNING *';
        const values = [${columnNames
          .map((column) => `args.${column}`)
          .join(', ')}];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => throw new Error(err));
      },`;
};

resolverGenerator.updateMutation = (currentTable, primaryKey, columns) => {
  const queryName = camelCase('update_' + singular(currentTable));
  const columnNames = Object.keys(columns);
  const queryValues = columnNames.filter((column) => column !== primaryKey);
  const conditional = queryValues.length + 1;

  return `
      ${queryName}: (parent, args) => {
        const query = 'UPDATE ${currentTable} SET ${queryValues
    .map((el, i) => `${el}=$${++i}`)
    .join(', ')} WHERE ${primaryKey} = $${conditional} RETURNING *';
        const values = [${queryValues
          .map((column) => `args.${column}`)
          .join(', ')}, args.${primaryKey}];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => throw new Error(err));
      },`;
};

resolverGenerator.deleteMutation = (currentTable, primaryKey) => {
  const queryName = camelCase('delete_' + singular(currentTable));

  return `
      ${queryName}: (parent, args) => {
        const query = 'DELETE FROM ${currentTable} WHERE ${primaryKey} = $1 RETURNING *';
        const values = [args.${primaryKey}];
        return db.query(query, values)
          .then(data => data.rows[0])
          .catch(err => throw new Error(err));
      },`;
};

resolverGenerator.determineRelationships = (currentTable, tables) => {
  const { primaryKey, referencedBy } = tables[currentTable];
  let relationships = '';

  Object.keys(referencedBy).forEach(refTable => {
    const {  
      referencedBy: foreignRefBy,
      foreignKeys: foreignFKeys,
      columns: foreignColumns
    } = tables[refTable];

    // One-to-One relationship
    if (foreignRefBy && foreignRefBy[currentTable]) {
      relationships += resolverGenerator.oneToOne(
        currentTable, 
        primaryKey, 
        refTable, 
        referencedBy[refTable]
      );
    }
    // One-to-Many relationship
    else if (!isJoinTable(foreignFKeys, foreignColumns)) {
      relationships += resolverGenerator.oneToMany(
        currentTable, 
        primaryKey, 
        refTable, 
        referencedBy[refTable]
      );
    }
    // Many-to-Many relationship
    else {
      // iterating through the foreign keys of the refTable
      // checking if currentTable does NOT equal the reference table of the foreign key
      // Do not include original table in output
      // name of table that the foreign key is referencing
      // foreign key from the current table that references the refTable
      // grabbing the foreign key from the refTable
      // grabbing the primary key from the many to many table

      relationships += resolverGenerator.manyToMany();
    }
  });
  return relationships;
};

resolverGenerator.oneToOne = (currentTable, primaryKey, refTable, refForeignKey) => {
  return `
        ${camelCase(refTable)}: (${camelCase(currentTable)}) => {
          const query = 'SELECT * FROM ${refTable} WHERE ${refForeignKey} = $1';
          const values = [${currentTable}.${primaryKey}];
          return db.query(query, values)
            .then(data => data.rows[0])
            .catch(err => throw new Error(err));
        },`;
};

resolverGenerator.oneToMany = (currentTable, primaryKey, refTable, refForeignKey) => {
  return `
        ${camelCase(refTable)}: (${camelCase(currentTable)}) => {
          const query = 'SELECT * FROM ${refTable} WHERE ${refForeignKey} $1';
          const values = [${currentTable}.${primaryKey}];
          return db.query(query, values)
            .then(data => data.rows)
            .catch(err => throw new Error(err));
        },`;
};

resolverGenerator.manyToMany = () => {
  return '';
};


module.exports = resolverGenerator;
