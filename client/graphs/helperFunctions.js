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

export function adviceBreakdown1 (advice) {
  return (advice.length === 0) ? null : `Here is the breakdown of your database, in preparation for GraphQL. We generated ${advice[0].Amount} Queries and ${advice[1].Amount} Mutations for you. Click on the pie chart to view further information on each.`
} 

export const adviceBreakdown2 = `The graph on the right is a diagram of your PSQL Relational database. Currently, all tables of your database can be queried via the generated schema/resolvers below.`