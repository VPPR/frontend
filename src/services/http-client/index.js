const httpClient = async (url, parameters) =>
  await fetch(`${process.env.REACT_APP_BACKEND}${url}`, parameters).then(async (response) => {
    const json = await response.json();
    return response.ok ? json : Promise.reject(json);
  });

export default httpClient;
