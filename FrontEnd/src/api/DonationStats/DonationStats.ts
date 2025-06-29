export default async function CreateDonation({
  donorId,
  requesterId,
  requestId,
}: {
  donorId: string;
  requesterId: string;
  requestId: string;
}) {
  const response = await fetch("http://localhost:3000/donation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      donorId,
      requesterId,
      requestId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create donation");
  }

  return await response.json();
}
