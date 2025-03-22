import { Set } from "../types/types";

export async function getSetData(setNum: number): Promise<Set | undefined> {

  const url = "https://rebrickable.com/api/v3/lego/sets/" + setNum + "-1/";
  const apiKey = import.meta.env.VITE_REBRICKABLE_API_KEY;

  try {
    if (!setNum || isNaN(setNum)) {
      throw new Error("Invalid set number");
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `key ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const apiData = await response.json();
    const setData = {
      number: setNum,
      name: apiData.name,
      year: apiData.year,
      numParts: apiData.num_parts,
      setImgUrl: apiData.set_img_url,
    };
    return setData;
  } catch (error) {
    console.error("Error fetching set:", error);
  }
}