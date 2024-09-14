import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  //login  คือ เช็กว่าเป็นตัว login ที่ใช้งานมั้ย
  //เพราะ login ไม่ต้องมีรหัสยืนยัน ; เอาไว้ใช้ดักไม่ให้แสดง error ตรงรหัสยืนยันน่ะ
  displayError(errorData: any, login: boolean = false) {
    const err = errorData?.error?.errors;
    let message = '';
    // if (!err) {
    //   const valueError = Object.values(errorData.error); // ได้เฉพาะ value มาแบบ ["1","2"]
    //   return valueError.join('\n');
    // }

    const dataError = Object.entries(err) as [string, string[]][];

    dataError.forEach(([key, value]: [string, string[]]) => {
      //ถ้าเป็น login แล้วมันมี error ของยืนยันรหัส ให้ข้ามไป
      if (login && key === 'PasswordConfirm') return;

      //มันไม่มีเว้นวรรค ส่งผลทำให้เกิดปัญหา reponsive ในกรณีที่จะแสดงหน้าเว็ปขนาดเล็ก (เล็กกว่า 200)
      key = key.replace('PasswordConfirm', 'Password Confirm');

      // .join มันใช้กับอาเรย์น่ะ ซึ่งบางที value มันได้ string
      const formattedValue = Array.isArray(value) ? value.join('\n') : value;
      message += `<strong>${key} :</strong>\n${formattedValue}\n`;
    });

    return message;
  }

  sumArray(array: Array<number>) {
    return array.reduce((sum, current) => sum + current, 0);
  }

  // เช่นสร้าง [false,false] : fillArray อากิวเมนแรก จำนวนสมาชิกที่ต้องการ , อากิวเมนสอง ค่าที่ต้องการสร้าง เช่น false
  fillArray(len: number, value: any) {
    return new Array(len).fill(value);
  }

  //ใช้ร่วมกับ display-number-increment-decrement.component
  // เอาไว้ใช้ลองแปลงว่าค่า data สามารถแปลงเป็นตัวเลขได้มั้ย
  // ถ้าไม่ได้จะไม่นำค่า data ไปใช้ และจะ alert บอกว่าต้องเป้นตัวเลขน่ะ
  convertNumber(data: string | number) {
    const dataNumber = Number(data);
    if (!isNaN(dataNumber)) return true;
    alert('ต้องระบุเป็นตัวเลขเท่านั้น');
    return false;
  }

  joinedLettersAddingSpaces(Letters: string, tooLong: number) {
    let count = 0;
    let Sentence = '';
    for (let ch of Letters) {
      // เจอเว้นวรรคแล้ว count = 0 ไม่เจอเพิ่ม count
      ch === ' ' ? (count = 0) : count++;
      // เพิ่ม count จนเกินค่าที่กำหนดแล้ว(ไม่เจอเว้นวรรคภายในระยะที่กำหนด) ดังนั้นแทรกเว้นวรรคให้
      if (count > tooLong) {
        ch = ' ' + ch;
        count = 0;
      }
      //เอาอักษรที่อาจเป็นอักษรต้นฉบับหรืออักษรที่แทรกเว้นวรรคเข้าไปแล้ว เข้าไปรวมกับอักษรตัวอื่น ๆ
      Sentence += ch;
    }

    return Sentence;
  }
}
