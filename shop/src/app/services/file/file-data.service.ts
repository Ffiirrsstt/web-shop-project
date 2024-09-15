import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileDataService {
  constructor() {}

  defaultValuePreviewImgProduct(Title: string, AllImg: string[]) {
    return {
      Id: 0,
      Title,
      ImgCover: '',
      AllImg,
      Price: 0,
      Inventory: 0,
      Quantity: 0,
      Select: false,
    };
  }
}
