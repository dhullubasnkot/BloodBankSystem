const API_URL = import.meta.env.VITE_API_URL;
export default async function LogoutUser() {
  const response = await fetch(`${API_URL}user/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
  localStorage.removeItem("id");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("deviceId");
  localStorage.removeItem("isDonor");

  return { message: "Logout successful" };
}
