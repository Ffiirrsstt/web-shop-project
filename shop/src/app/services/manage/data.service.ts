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
}
