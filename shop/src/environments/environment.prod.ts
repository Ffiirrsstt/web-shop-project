import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  apiBase: 'https://localhost:7220/api',
  alertDelay: 2000,
  logo: '/assets/logo.png',
  scrollSizeSlide: 100,

  // accessAssets: '/assets/',
  // // apiUrl: 'http://localhost/registration/api',
  // // mvcUrl: 'http://localhost/registration',
  // apiUrl: 'https://localhost:7229/api',
  // mvcUrl: 'https://localhost:7229',
  // //ture คือ โหมด test , false โหมดใช้จริง มี token และ ยิง api โดยตรง
  // devMode: true,
  // folderFile: {
  //   folderTmp: 'tmp',
  //   folderApp: 'app',
  // },
  // // บางครั้งถ้า path รูปเป็น / มันจะยิง api preview รูปภาพไม่ได้ เลยให้แทนที่เป็น \
  // replaceSlashesToBackslashes: true,
  // logoUrl: '/assets/logoMAHIDOL.png',
  // settingItemsPerRoundCity: 100,
  // //กำหนดเกี่ยวกับการสร้าง appID
  // dalaySave: 1500,
};
