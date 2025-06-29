export default async function GetAllBloodRequestById() {
  const id = localStorage.getItem("userId");
  try {
    const response = await fetch(`http://localhost:3000/bloodrequest/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Blood Request");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error Fetching Request", error.message);
  }
}
