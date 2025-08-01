const API_URL = import.meta.env.VITE_API_URL;
export default async function LogoutUser() {
  const response = await fetch("http://localhost:3000/user/logout", {
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
  localStorage.removeItem("Donor_id");

  return { message: "Logout successful" };
}
