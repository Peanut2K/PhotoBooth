export const getBasePath = () => {
  return process.env.NODE_ENV === "production" ? "/PhotoBooth" : "";
};

export const navigateTo = (path: string) => {
  const basePath = getBasePath();
  window.location.href = `${basePath}${path}`;
};
