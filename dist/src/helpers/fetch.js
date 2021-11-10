const baseUrl = "http://localhost:8080/ServletXX1";

const fetchLogin = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}?username=${data.username}&password=${data.password}`;
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};
const fetchCreate = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}?id=${data.id}&valores=${data.valores}`;
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

const fetchActualizar = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}?id=${data.id}&valores=${data.valores}`;
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

const fetchActualizarImg = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}?username=${data.id}&imgname=${data.nameimg}`;
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

const fetchDelete = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}?id=${data.id}`;
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};
const fetchList = (endpoint, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return JSON.parse(data);
    });
};

export { fetchLogin, fetchList, fetchCreate, fetchDelete, fetchActualizar, fetchActualizarImg };
