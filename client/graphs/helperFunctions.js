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
