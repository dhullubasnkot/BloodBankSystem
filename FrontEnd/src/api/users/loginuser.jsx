const API_URL = import.meta.env.VITE_API_URL;
import { getOrCreateDeviceId } from "../../utils/deviceId";

const LoginUser = async (formData) => {
  const getDevicesId = getOrCreateDeviceId();
  const response = await fetch(`${API_URL}user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData, getDevicesId),
    credentials: "include",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Signup failed");
  }
  const user = result.user;

  localStorage.setItem("id", user.id);
  localStorage.setItem("userId", user.id);
  localStorage.setItem("username", user.name);
  localStorage.setItem("email", user.email);

  return result;
};

export default LoginUser;
