export const getFoods = async () => {
  const res = await fetch("http://localhost:5000/api/foods");
  return res.json();
};

export const getFoodById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/foods/${id}`);
  if (!res.ok) {
    throw new Error("Food item not found");
  }
  return res.json();
};