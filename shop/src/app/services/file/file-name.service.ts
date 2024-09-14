import { Injectable } from '@angular/core';
import { DataService } from '../manage/data.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FileNameService {
  constructor(private data: DataService) {}

  checkModifiedFileName(
    filesOriginal: File[],
    filesModified: File[],
    fileSelect: File
  ) {
    const fileNameSelect = fileSelect.name;
    const fileNameSelectNoSurname = fileNameSelect.substring(
      0,
      fileNameSelect.lastIndexOf('.')
    );
    let numberDuplicate = 0;

    //ยังไม่เคยมีข้อมูลไฟล์เก็บไว้
    // ดังนั้นใช้ setFileName (แก้ให้แสดงให้เหมาะสมไม่ตกขอบ + อัปเดตข้อมูลของ filesOriginal และ filesModified)
    if (filesOriginal.length === 0 || filesModified.length === 0)
      return this.setFileName(fileSelect, fileNameSelect);

    /*เช็กซ้ำไหมและซ้ำเท่าไหร่
    0:ไม่ซ้ำ , 1:ซ้ำหนึ่ง ...*/
    for (const fileOriginal of filesOriginal)
      if (
        //สนชื่อซ้ำ นามสกุลไม่ซ้ำก็เปลี่ยน
        fileOriginal.name.substring(0, fileOriginal.name.lastIndexOf('.')) ===
        fileNameSelectNoSurname
      )
        numberDuplicate++;

    //เช็กว่าลบไฟล์ตัวแรกไปมั้ย (ไฟล์ที่เป็นชื่อไฟล์เพียว ๆ ไม่ได้ต่อเติมวงเล็บกับตัวเลขให้น่ะ)
    //ปกติถ้าซ้ำ จะใส่ ซ้า (1) , ซ้ำ (2) อันนี้กันเช็กว่าลบตัว ซ้ำ เฉย ๆ ไปยัง
    let foundManuscript = false;
    for (let fileModified of filesModified) {
      if (
        //ถ้ามันตรงกันแปลว่าตัวแรกสุดที่ยังไม่เกิดการซ้ำจนดัดแปลงเพิ่ม (1) ยังมีตัวตนอยู่ (ยังไม่ถูกลบ)
        fileModified.name.substring(0, fileModified.name.lastIndexOf('.')) ===
        fileNameSelectNoSurname
      )
        foundManuscript = true;
    }
    //แปลว่าคนลบตัวต้น (ชื่อเฉย ๆ ที่ไม่มี (ตัวเลข))
    //จริง ๆ มันเป็นเคสให้ทำงานในกรณีที่ลบตัวต้นแล้ว หรือชื่อนี้มาใหม่ครั้งแรกอะนะ (สั้น ๆ มันจะได้ชื่อที่ไม่ซ้ำน่ะ)
    if (!foundManuscript || numberDuplicate === 0)
      return this.setFileName(fileSelect, fileNameSelect);

    //เช็กดูว่าตามข้อมูลที่เก็บในประวัติตรงกับปัจจุบันมั้ย
    //numberDuplicate ซ้ำไปกี่รอบ
    for (let index = 1; index < numberDuplicate; index++) {
      let found = false;
      for (let file of filesModified) {
        if (
          //เอาชื่อไฟล์ที่แก้เรียบร้อยแล้ว มาเช็กกับชื่อใหม่ที่รับเข้ามา (ใส่เลขจำนวนซ้ำให้)
          //ต้องการเช็กว่าพวก ซ้ำ (1) , ซ้ำ (2) มีตัวไหนถูกลบไปมั้ย จะได้สร้างขึ้นถูกน่ะ
          file.name.substring(0, file.name.lastIndexOf('.')) ===
          `${fileNameSelectNoSurname} (${index})`
        ) {
          found = true;
        }
      }
      // มีการลบตัวที่ซ้ำ (ตัวซ้ำ เช่น ซ้ำ (1), ซ้ำ (2))ไป
      if (!found) {
        //ตัวที่ถูกลบ index ใส่ใน numberDuplicate (ข้างล่างจะเอาไปสร้างเป็น ซ้ำ (ตัวเลขที่หายไป) อีกที)
        numberDuplicate = index;
        break;
      }
      // ถ้าไม่มีการลบตัวซ้ำ ก็จะใช้ numberDuplicate ที่เป็นตัวปัจจุบันไปสร้างอะแหละ
    }

    const surnameFile = fileNameSelect.substring(
      fileNameSelect.lastIndexOf('.')
    );
    const newName = `${fileNameSelectNoSurname} (${numberDuplicate})${surnameFile}`;
    return this.setFileName(fileSelect, newName);
  }

  //อัปเดต File ใหม่เข้าไปใน filesModified,filesOriginal รวมทั้งจัดการให้ชื่อไฟล์เหมาะสมสำหรับการแสดงผล
  setFileName(file: File, newName: string) {
    //ปกติถ้าเป็นประโยคยาว ๆ ที่ไม่มีเว้นวรรคจะทำให้มันไม่ขยับข้อความให้เลื่อนตกลงจนมันตกขอบได้
    // เป็นตัวเลขให้กำหนดว่าถ้าชื่อ file ไม่มีเว้นวรรค (มีแต่อักขระติดกัน) เกินกี่ตัวจึงจะสร้างเว้นวรรคขึ้นมาเอง
    // (เพื่อให้มันขึ้นบรรทัดใหม่ได้ จะได้ไม่ตกขอบ)
    const number = environment.lettersJoined;
    // ให้ได้ชื่อใหม่ที่เอาไว้ใช้ (แก้ปัญหาเวลาชื่อยาวเกินไปแล้วมันตกขอบอะนะ)
    newName = this.fileNameToolongforDisplay(newName, number);
    // newName = this.displayFileName.changeNamelongforDisplay(newName, 13);
    const newFile = new File([file], newName, { type: file.type });
    return { modified: newFile, original: file };
  }

  //ย่อมาจากคำว่าชื่อไฟล์ยาวไปเลยจะแก้เพื่อใช้แสดงผล (ตัดคำไปเยอะ)
  fileNameToolongforDisplay(fileName: string, lenTooLong: number) {
    const surname = fileName.substring(fileName.lastIndexOf('.'));
    const name = fileName.substring(0, fileName.lastIndexOf('.'));

    //จัดการชื่อไฟล์เรียบร้อย
    const newName = this.data.joinedLettersAddingSpaces(name, lenTooLong);
    return newName + surname;
  }
}
