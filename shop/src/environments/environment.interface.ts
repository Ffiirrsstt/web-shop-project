export interface IEnvironment {
  production: boolean;
  apiBase: string;
  alertDelay: number;
  logo: string;
  scrollSizeSlide: number;
  //ข้อความที่มันยาว ๆ ที่เป็นอักขระติดกันล้วน ๆ แบบไม่มีเว้นวรรคมาคั่นจะทำให้เกิดปัญหาตกขอบได้ (เวลาหน้าจอขนาดเล็ก)
  //เอาไว้กำหนดให้ถ้าอักขระติดกันเกินกี่ตัวให้ทำการแทรกเว้นวรรค(เพื่อให้ข้อความสามารถขึ้นบรรทัดใหม่ได้)
  lettersJoined: number;
}
