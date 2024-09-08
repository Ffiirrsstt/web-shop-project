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

        //การจัดการตะกร้าสินค้า(เพิ่มหรือเปลี่ยนแปลงจำนวนสินค้า)
        public async Task cartAddingChanging(Users user, Users userUpdateCart)
        {
            // แปลง JSON string เป็น object
            var newCartItem = JsonConvert.DeserializeObject<CartItem>(user.CartDetail);

            // ถ้า userUpdateCart.CartDetail ไม่ว่าง แปลงเป็น List<CartItem> ถ้าว่างก็สร้าง new List<CartItem>()ขึ้นมา
            List<CartItem> cartItems = !string.IsNullOrEmpty(userUpdateCart.CartDetail)
                ? JsonConvert.DeserializeObject<List<CartItem>>(userUpdateCart.CartDetail)
                : new List<CartItem>();

            //ลบข้อมูลเดิมที่มี id และ title สินค้า ตรงกัน เพื่อไม่ให้ข้อมูลในตะกร้าสินค้าซ้ำ (ถ้ามีซ้ำแปลว่าเปลี่ยนแปลงจำนวนสินค้าน่ะ ซึ่งลบของเก่าไปจะได้ไม่ซ้ำกัน)
            cartItems.RemoveAll(item => item.Id == newCartItem.Id && item.Title == newCartItem.Title);

            // เพิ่มข้อมูลใหม่เข้าไป
            cartItems.Add(newCartItem);

            // แปลงกลับเป็น JSON string เพื่อบันทืกข้อมูล
            userUpdateCart.CartDetail = JsonConvert.SerializeObject(cartItems);

            // อัปเดตข้อมูลในฐานข้อมูล
            _users.Users.Update(userUpdateCart);
            await _users.SaveChangesAsync();
        }
    }
}
