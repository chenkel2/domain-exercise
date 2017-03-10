function getDomains() {
  return fetch(`api/domains`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

function getDomainById(id) {
  return fetch(`api/domains/${id}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const error = new Error(`HTTP Error ${res.statusText}`);
  error.status = res.statusText;
  error.response = res;
  return Promise.reject(error);
}

function parseJSON(res) {
  return res.json();
}

const Client = {
  getDomains,
  getDomainById
};
export default Client;
