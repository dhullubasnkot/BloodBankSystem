export default async function GetAllRequestedBlood() {
  try {
    const response = await fetch("http://localhost:3000/bloodrequest", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Blood Request");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching Donors", error.message);
    throw error;
  }
}
