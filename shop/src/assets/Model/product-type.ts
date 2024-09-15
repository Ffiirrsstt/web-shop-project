export interface ProductType {
  Id: number;
  Title: string;
  ImgCover: string;
  AllImg: string[];
  Price: number;
  Inventory: number;
  Quantity: number;
  Select: boolean;
}
export interface ProductImgType {
  Title: string;
  AllImg: string[];
}
