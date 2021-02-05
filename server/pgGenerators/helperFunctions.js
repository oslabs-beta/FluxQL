const isJoinTable = (foreignKeys, columns) => {
  return Object.keys(columns).length === Object.keys(foreignKeys).length + 1;
};

module.exports = isJoinTable;