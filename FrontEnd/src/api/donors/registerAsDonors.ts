const CreateDonors = async (formData) => {
  const response = await fetch("http://localhost:3000/donor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  localStorage.setItem("isDonor", "true");

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create donor");
  }

  return result;
};

export default CreateDonors;
