const API_URL = import.meta.env.VITE_API_URL;
const signupUser = async (formData) => {
  const response = await fetch(`${API_URL}user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  console.log("Signup response:", result);

  if (!response.ok) {
    throw new Error(result.message || "Signup failed");
  }

  // IMPORTANT: user data is inside result.user
  // const user = result.user;

  // localStorage.setItem("id", user.id);
  // localStorage.setItem("userId", user.id);
  // localStorage.setItem("username", user.name);
  // localStorage.setItem("email", user.email);

  return result;
};

export default signupUser;
