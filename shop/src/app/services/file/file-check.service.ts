import { ElementRef, Injectable, QueryList } from '@angular/core';
import { FileManageService } from './file-manage.service';

@Injectable({
  providedIn: 'root',
})
export class FileCheckService {
  // fileInputs
  constructor(private fileManange: FileManageService) {}

  // ต้องเป็นนามสกุล jpeg,png และขนาดแต่ละไฟล์ไม่เกิน 5MB
  checkFile(files: FileList | null, fileInput: QueryList<ElementRef>) {
    let filePass = true;
    // คงที่ไว้ก่อน เด่วแก้
    let fileLen = 1;
    if (files) {
      for (let file of Array.from(files as FileList)) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          filePass = this.defaultFalseFilePass(fileInput);
          alert('The image file upload failed!');
          // ['Please upload only files with the extensions jpg and png.'],
          break;
        } else if (file.size > 5 * 1024 * 1024) {
          // อันนี้กันไฟล์ใหญ่เกินไปน่ะ (ไม่เกิน 5 MB)
          filePass = this.defaultFalseFilePass(fileInput);
          alert('The image file upload failed!');
          // ['Please upload a file no larger than 5 MB.'],
          break;
        } else if (fileLen > 10) {
          // อันนี้กันไฟล์ใหญ่เกินไปน่ะ (ไม่เกิน 5 MB)
          filePass = this.defaultFalseFilePass(fileInput);
          alert('The image file upload failed!');
          // ['Cannot upload more than 10 images.'],
          break;
        }
      }
    }
    //ถ้า files มันเป็น null ก็ถือว่า filePass ไม่ผ่าน
    else return false;
    return filePass;
  }

  //รวมคำสั่งสำหรับกรณีที่ fileCheck แล้วมันไม่ผ่านน่ะนะ
  defaultFalseFilePass(fileInput: QueryList<ElementRef>) {
    this.fileManange.resetFile(fileInput);
    //มันไว้ปิดพวก loading
    // this.closeDisplay();
    return false;
  }
}
