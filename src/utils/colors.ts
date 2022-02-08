export const colors = {
  0: '#ef476f',
  1: '#f9c46b',
  2: '#06d6a0',
  3: '#118ab2',
  4: '#073b4c',
  5: '#7209b7',
  6: '#5e503f',
  7: '#ff6150',
};

export const randomColor = (colors: any) => {
  const keys = Object.keys(colors);
  return colors[keys[(keys.length * Math.random()) << 0]];
};
