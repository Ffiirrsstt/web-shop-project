using API.Context;
using API.Model;
using Newtonsoft.Json;
using static api_shop.Controllers.CartController;

namespace api_shop.Services
{
    public class CartManage
    {
        private readonly UsersDbContext _users;
        public CartManage(UsersDbContext users)
        {
            _users = users;
        }

        //แปลงข้อมูล filed CartDetail จาก json string เป็น list เพื่อนำไปใช้งานต่อ
        private List<CartItem> cartJsonStringToList(Users user)
        {
            return !string.IsNullOrEmpty(user.CartDetail)
            ? JsonConvert.DeserializeObject<List<CartItem>>(user.CartDetail)
            : new List<CartItem>();
        }

        //ใช้แปลง filed Select ใน CartItem ทั้งหมดเป็น false
        public async Task settingFalseSelect(Users user)
        {
            List<CartItem> cartItems = cartJsonStringToList(user);
            foreach (var item in cartItems)
            {
                item.Select = false;
            }

            user.CartDetail = JsonConvert.SerializeObject(cartItems);
            // อัปเดตข้อมูลในฐานข้อมูล
            _users.Users.Update(user);
            await _users.SaveChangesAsync();
        }

        //การจัดการตะกร้าสินค้า(เพิ่มหรือเปลี่ยนแปลงจำนวนสินค้ารวมทั้งการจัดการเลือกการ Select สินค้าเพื่อชำระเงิน)
        public async Task cartChanging(Users userUpdate, Users userCurrent)
        {
            Console.WriteLine(userUpdate.CartDetail);
            Console.WriteLine("test");
            Console.WriteLine();

            // แปลง JSON string เป็น object
            var newCartItem = JsonConvert.DeserializeObject<CartItem>(userUpdate.CartDetail);

            // ถ้า userUpdateCart.CartDetail ไม่ว่าง แปลงเป็น List<CartItem> ถ้าว่างก็สร้าง new List<CartItem>()ขึ้นมา
            List<CartItem> cartItems = cartJsonStringToList(userCurrent);

            //ลบข้อมูลเดิมที่มี id และ title สินค้า ตรงกัน เพื่อไม่ให้ข้อมูลในตะกร้าสินค้าซ้ำ (ถ้ามีซ้ำแปลว่าเปลี่ยนแปลงจำนวนสินค้าน่ะ ซึ่งลบของเก่าไปจะได้ไม่ซ้ำกัน)
            cartItems.RemoveAll(item => item.Id == newCartItem.Id && item.Title == newCartItem.Title);

            // เพิ่มข้อมูลใหม่เข้าไป
            cartItems.Add(newCartItem);

            // แปลงกลับเป็น JSON string เพื่อบันทืกข้อมูล
            userCurrent.CartDetail = JsonConvert.SerializeObject(cartItems);

            // อัปเดตข้อมูลในฐานข้อมูล
            _users.Users.Update(userCurrent);
            await _users.SaveChangesAsync();
        }
    }
}
