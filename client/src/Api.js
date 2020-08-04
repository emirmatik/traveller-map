const url = "https://travel-map-backend.herokuapp.com/entries";

export const getLogs = async () => {
  const result = await fetch(url);
  return result.json();
};

export const createNewLog = async (entry) => {
  const result = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(entry),
  });
  return result.json();
};
