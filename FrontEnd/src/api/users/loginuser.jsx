import { getOrCreateDeviceId } from "../../utils/deviceId";

const LoginUser = async (formData) => {
  const deviceId = getOrCreateDeviceId();
  const bodyData = {
    ...formData,
    deviceId,
  };

  const response = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  const user = result.user;

  localStorage.setItem("id", user.id);
  localStorage.setItem("userId", user.id);
  localStorage.setItem("username", user.name);
  localStorage.setItem("email", user.email);

  if (result.donorId) {
    localStorage.setItem("Donor_id", result.donorId);
  } else {
    localStorage.removeItem("Donor_id");
  }

  return result;
};

export default LoginUser;
