import axios from "axios";

const cancelTokens = {};

export const getCancelToken = (endpoint) => {
  if (cancelTokens[endpoint]) {
    cancelTokens[endpoint].cancel(
      `Operation canceled due to a new request for ${endpoint}.`
    );
  }

  cancelTokens[endpoint] = axios.CancelToken.source();
  return cancelTokens[endpoint].token;
};
