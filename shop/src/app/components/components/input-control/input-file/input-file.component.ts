import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FileCheckService } from '../../../../services/file/file-check.service';
import { FileManageService } from '../../../../services/file/file-manage.service';
import { FileNameService } from '../../../../services/file/file-name.service';
import {
  ProductImgType,
  ProductType,
} from '../../../../../assets/Model/product-type';
import { FileDataService } from '../../../../services/file/file-data.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.css',
})
export class InputFileComponent {
  //รีเซ็ต input file ให้สามารถกดเพิ่มไฟล์ซ้ำได้
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;
  productImgPreview!: ProductType;
  // productImgPreview: ProductImgType = { Title: '', AllImg: [] };

  filesOriginal: File[] = [];
  filesModified: File[] = [];

  constructor(
    private fileCheck: FileCheckService,
    private fileManage: FileManageService,
    private fileName: FileNameService,
    private fileData: FileDataService
  ) {
    this.productImgPreview = this.fileData.defaultValuePreviewImgProduct(
      '',
      []
    );
  }

  async onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    let filePass = await this.fileCheck.checkFile(files, this.fileInputs);

    //จากการตรวจพบว่าไม่ผ่าน อาจเพราะไม่มีไฟล์ , สกุลไฟล์ไม่ถูกต้อง หรือไฟล์ขนาดใหญ่ไป
    if (!filePass) return;

    // this.setStatusFile(title, true);
    // if (!this.deletefilesLoad[title]) {
    //   this.deletefilesLoad[title] = [];
    //   this.deletefadeOut[title] = [];
    //   this.progress[title] = [];
    // }

    // จัดการชื่อไฟล์ (ซ้ำ หรือไม่ซ้ำ และเว้นวรรคชื่อไฟล์ให้เรียบร้อยรองรับการมาแสดงผลแบบไม่ตกขอบ)
    // จริง ๆ ข้างบนเช็ดแล้วว่า files ไม่เป็น null น่ะ
    this.filterFileName(files as FileList);

    //   //อัปโหลดไฟล์
    //   this.uploadFile(environment.folderFile.folderTmp, id, title);

    // จะจัดการให้แสดงรูปภาพน่ะ
    Array.from(files as FileList).forEach((fileSelect) => {
      // สร้างตัวแปร reader ซึ่งเป็นอินสแตนซ์ของ FileReader
      const reader = new FileReader();

      // เมื่อ reader.readAsDataURL() อ่านไฟล์เสร็จ จะทำให้ฟังก์ชัน onload ทำงาน
      // จากการอ่านไฟล์ ข้อมูลถูกเก็บใน reader.result
      reader.onload = (e) => {
        // ถ้าใช้แต่ push เหมือนมันจะทำให้ใน components มันแยกการเปลี่ยนแปลงไม่ได้
        // (ต้องแยกได้ จึงจะประมวลผลเพื่อแสดงรูปภาพอย่างเหมาะสม)
        // this.productImgPreview = {
        //   Title: this.productImgPreview.Title,
        //   AllImg: this.productImgPreview.AllImg,
        // };

        this.productImgPreview = this.fileData.defaultValuePreviewImgProduct(
          this.productImgPreview.Title,
          this.productImgPreview.AllImg
        );

        // url ที่มีขอมูล Base64
        const base64String = reader.result as string; // เก็บผลลัพธ์ Base64 ไว้
        this.productImgPreview.AllImg.push(base64String);
      };

      //อ่านไฟล์ fileSelect แล้วแปลงไฟล์ให้เป็น Base64 URL.
      reader.readAsDataURL(fileSelect); // อ่านไฟล์เป็น Base64
    });

    this.productImgPreview = this.fileData.defaultValuePreviewImgProduct(
      this.productImgPreview.Title,
      this.productImgPreview.AllImg
    );

    //   รีเซ็ต input file ให้สามารถกดเพิ่มไฟล์ซ้ำได้
    this.fileManage.resetFile(this.fileInputs);
  }

  //บรรดาไฟล์ของเดิม กับ ไฟล์ที่เลือกน่ะ
  filterFileName(filesSelect: FileList): any {
    Array.from(filesSelect).map((fileSelect) => {
      //เช็กชื่อซ้ำมั้ย ถ้าซ้ำก็แก้
      const { modified, original } = this.fileName.checkModifiedFileName(
        this.filesOriginal,
        this.filesModified,
        fileSelect
      );
      this.filesModified.push(modified);
      this.filesOriginal.push(original);
    });
  }

  // async uploadFile(folderMain: string, id: string, title: string) {
  //   this.displayloaddingSave = true;
  //   const form = new FormData();
  //   if (this.status === 'Draft') folderMain = environment.folderFile.folderApp;
  //   for (let i = 0; i < this.fileData[title].length; i++) {
  //     form.append('files[]', this.fileData[title][i]);
  //   }
  //   form.append('MainFolder', folderMain);
  //   form.append('Folder', title);
  //   // // เช็กว่า Appid ไม่ว่าง
  //   // await this.checkAppiDDisplayLoadding();
  //   form.append('AppID', this.AppID);
  //   //อัปโหลดรูปภาพไปเก็บชั่วคราว
  //   if (this.modeDev) {
  //     await new Promise<void>((resolve, reject) => {
  //       this.fileServices.apiUploadImgUploadFilePostForm(form).subscribe({
  //         next: (res) => {
  //           (this.displayloaddingSave = false), resolve();
  //         },
  //         error: (err) => {
  //           this.callUploadFileError(err, id), reject(err);
  //         },
  //       });
  //     });
  //   } else {
  //     const { url, token } = this.dataManage.returnDataSend(
  //       `${this.basePath}/UploadImg/UploadFile`,
  //       this.token
  //     );
  //     await new Promise<void>((resolve, reject) => {
  //       this.proxy.apiPostProxyUpload(url, token, form).subscribe({
  //         next: (res) => {
  //           (this.displayloaddingSave = false), resolve();
  //         },
  //         error: (err) => {
  //           this.callUploadFileError(err, id), reject(err);
  //         },
  //       });
  //     });
  //   }
  // }
  // callUploadFileError(err: any, id: string) {
  //   if (err && err.status === 400) {
  //     this.closeDisplay();
  //     this.alertError.alertError(
  //       'Image upload failed!',
  //       [
  //         'I apologize, there is a system issue causing the image upload to fail.',
  //       ],
  //       [id]
  //     );
  //   } else if (this.routerLink.checkDefault(err))
  //     this.routerLink.ErrorDefault(err);
  //   else
  //     this.routerLink.responseErrorFix(
  //       'An error has occurred during the image upload!'
  //     );
  //   this.displayloaddingSave = false;
  // }

  // //ลบไฟล์ที่เลือก
  // async removeFile(title: string, index: number, id: string) {
  //   if (this.status !== 'Draft') {
  //     await this.removeFileCombineUI(title, index, id);
  //   } else {
  //     this.closeDisplay();
  //     (this.savetmp['title'] = title),
  //       (this.savetmp['index'] = index),
  //       (this.savetmp['id'] = id),
  //       this.alertConfirm.alertConfirm(
  //         'Are you sure?',
  //         "You want to delete it. You won't be able to recover the data afterward.",
  //         'delete it!'
  //       );
  //   }
  // }
  // listDelete: { title: string[]; index: number[]; id: string[] } = {
  //   title: [],
  //   index: [],
  //   id: [],
  // };
}
