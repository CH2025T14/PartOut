import { ApiResponseItem, Part } from "../types/types";

export async function getPartData(setNum: number, page: number = 1): Promise<Part[]> {

  const url = `https://rebrickable.com/api/v3/lego/sets/${setNum}-1/parts/?ordering=results&page_size=1000&page=${page}`;
  const apiKey = import.meta.env.VITE_REBRICKABLE_API_KEY;

  try {
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

    const rawData = await response.json();

    const partData = rawData.results
    .filter((item: ApiResponseItem) => !item.is_spare)
    .map((item: ApiResponseItem, index: number) => {
      return {
        partIndex: index,
        partName: item.part.name,
        partId: item.id,
        targetQty: item.quantity,
        currQty: 0,
        imgUrl: item.part.part_img_url,
      };
    });

    if (rawData.next === null) {
      return partData;
    } else {
      return partData.concat(await getPartData(setNum, page + 1));
    }
  } catch (error) {
    console.error("Error fetching parts:", error);
    return [];
  }
}