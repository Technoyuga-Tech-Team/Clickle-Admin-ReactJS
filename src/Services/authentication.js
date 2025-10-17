import { errorHandlerFunctionCatchBlock } from "./ErrorHandler";
import { api_services } from "./httpClient";

export const login = async (data) => {
  try {
    const response = await api_services.post("/v1/admin/login", data);
    return response.data;
  } catch (error) {
    return errorHandlerFunctionCatchBlock(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await api_services.get("/admin/v1/get-profile");
    return response.data;
  } catch (error) {
    return errorHandlerFunctionCatchBlock(error);
  }
};

export const sendOtp = async (data) => {
  try {
    const response = await api_services.post("/v1/admin/forget-password", data);
    return response.data;
  } catch (error) {
    return errorHandlerFunctionCatchBlock(error);
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await api_services.post("/v1/admin/verify-otp", data);
    return response.data;
  } catch (error) {
    return errorHandlerFunctionCatchBlock(error);
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await api_services.post("/v1/admin/reset-password", data);
    return response.data;
  } catch (error) {
    return errorHandlerFunctionCatchBlock(error);
  }
};

export const changePassword = async (data) => {
  try {
    const response = await api_services.post("/admin/v1/change-password", data);
    return response.data;
  } catch (error) {
    return errorHandlerFunctionCatchBlock(error);
  }
};
