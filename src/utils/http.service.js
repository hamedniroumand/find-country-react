import axios from 'axios';

export default function HttpService({
  onRequestStarted = () => {},
  onRequestFailed = () => {},
  onResponseReceived = () => {},
  onResponseFailed = () => {},
}) {
  const httpInstance = axios.create({
    baseURL: 'https://restcountries.com/v2',
  });

  httpInstance.interceptors.request.use((config) => {
    onRequestStarted(config);
    return config;
  }, (err) => {
    onRequestFailed(err);
    throw err;
  });

  httpInstance.interceptors.response.use((response) => {
    onResponseReceived(response);
    return response;
  }, (err) => {
    onResponseFailed(err);
    throw err;
  });

  const get = (url, config) => httpInstance.get(url, config);

  return {
    http: {
      get,
    },
  };
}
