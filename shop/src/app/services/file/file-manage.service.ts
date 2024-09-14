import { ElementRef, Injectable, QueryList } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileManageService {
  constructor() {}

  //ไว้ reset ให้เพิ่ม file ซ้ำได้น่ะ
  resetFile(file: QueryList<ElementRef>) {
    file.forEach((input) => {
      input.nativeElement.value = '';
    });
  }
}
