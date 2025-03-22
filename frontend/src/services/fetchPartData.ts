export async function getPartData(setNum: number, page: number = 1) {
  interface ApiResponseItem {
    part: Part;
    quantity: number;
  }

  interface Part {
    part_num: string;
    name: string;
    part_img_url: string;
  }

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

    const partData = rawData.results.map((item: ApiResponseItem) => {
      return {
        partName: item.part.name,
        partId: item.part.part_num,
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
  }
}