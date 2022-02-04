export const getBackendApi = (path: string) => {
  const root = process.env.BACKEND_API_URL;
  return `${root}${path}`;
};
