export interface ApiResponseItem {
  id: number;
  part: ApiPart;
  color: ApiColor;
  quantity: number;
  is_spare: boolean;
}

export interface ApiPart {
  part_num: string;
  name: string;
  part_img_url: string;
}

export interface ApiColor {
  name: string;
  rgb: string;
}

export interface Part {
  partIndex: number;
  partName: string;
  partId: string;
  colorName: string;
  colorRgb: string;
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