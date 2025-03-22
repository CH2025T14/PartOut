export interface ApiResponseItem {
  id: number;
  part: ApiPart;
  quantity: number;
  is_spare: boolean;
}

export interface ApiPart {
  part_num: string;
  name: string;
  part_img_url: string;
}

export interface Part {
  partIndex: number;
  partName: string;
  partId: string;
  targetQty: number;
  currQty: number;
  imgUrl: string;
}

export interface Set {
  number: number;
  name: string;
  year: number;
  numParts: number;
  setImgUrl: string;
}