export const errorHandlerFunctionCatchBlock = async (data) => {
  //  network error
  if (!data.response) {
    if (data?.code === "ERR_CANCELED") {
      return {
        success: false,
        code: data?.code,
      };
    } else {
      return {
        success: false,
        message: data?.response?.data?.message || data?.message,
      };
    }
  }
  // server error
  if (data.response && data.response.data) {
    return {
      success: false,
      message: data?.response?.data?.message || data?.message,
    };
  }
};
