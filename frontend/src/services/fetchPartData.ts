export async function getPartData(setNum: number) {
  interface ApiResponseItem {
    part: Part;
    quantity: number;
  }

  interface Part {
    part_num: string;
    name: string;
    part_img_url: string;
  }

  const url = "https://rebrickable.com/api/v3/lego/sets/" + setNum + "-1/parts/?ordering=results";
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

    const apiData = (await response.json()).results;
    const partData = apiData.map((item: ApiResponseItem) => {
      return {
        partName: item.part.name,
        partId: item.part.part_num,
        targetQty: item.quantity,
        currQty: 0,
        imgUrl: item.part.part_img_url,
      };
    });
    return partData;
  } catch (error) {
    console.error("Error fetching parts:", error);
  }
}