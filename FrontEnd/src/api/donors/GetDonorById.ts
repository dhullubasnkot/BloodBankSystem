export default async function GetDonorByIds() {
  const id = localStorage.getItem("Donor_id");
  try {
    const response = await fetch(`http://localhost:3000/donor/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Donors");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching Donors:", error.message);
    throw error;
  }
}
