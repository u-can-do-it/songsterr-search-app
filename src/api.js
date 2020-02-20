export const search = async query => {
  const response = await fetch(
    `https://www.songsterr.com/a/ra/songs.json?pattern=${query.trim()}`
  );
  if (response.status !== 200) throw new Error("Something went wrong.");
  const data = await response.json();
  if (data.length === 0) throw new Error("No results.");
  return data;
};
