export const getBackendApi = (path: string) => {
  return `${process.env.BACKEND_API_URL}${path}`;
};
