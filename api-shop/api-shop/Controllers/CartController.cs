using API.Context;
using API.Model;
using API.Services;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure.Core;

namespace api_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly UsersDbContext _users;

        public CartController(UsersDbContext users)
        {
            _users = users;
        }

        [HttpGet("getCart")]
        public async Task<IActionResult> Signin(int id,string username)
        {
            if (id == null || username==null)
                return ApiResponseController.ApiResponseInvalidReceived();

            CheckUser check = new CheckUser(_users);
            var resultUser = await check.checkUserProceed(id, username);
            if (resultUser == null)
                return ApiResponseController.ApiResponseNotFound(new
                {
                    Message = "Account not found for retrieving and displaying the shopping cart data."
                });

            return ApiResponseController.ApiResponseOk("Shopping cart data retrieved successfully.",
                new{ cart = resultUser.CartDetail,}
            );
        }

        [HttpPatch("updateCart")]
        public async Task<IActionResult> UpdateCart([FromBody] Users user)
        {
            if (user == null || user.CartDetail == null)
                return ApiResponseController.ApiResponseInvalidReceived();

            CheckUser check = new CheckUser(_users);

            var userUpdateCart = await check.checkUserProceed(user.Id, user.Username);
            if (userUpdateCart == null) 
                return ApiResponseController.ApiResponseNotFound(new { Message = "Account not found for updating the shopping cart."
                });
            Console.WriteLine("start");
            Console.WriteLine("");

            // แปลง JSON string เป็น object
            var newCartItem = JsonConvert.DeserializeObject<CartItem>(user.CartDetail);

            // ถ้า userUpdateCart.CartDetail ไม่ว่าง แปลงเป็น List<CartItem> ถ้าว่างก็สร้าง new List<CartItem>()ขึ้นมา
            List<CartItem> cartItems = !string.IsNullOrEmpty(userUpdateCart.CartDetail)
                ? JsonConvert.DeserializeObject<List<CartItem>>(userUpdateCart.CartDetail)
                : new List<CartItem>();

            // เพิ่มข้อมูลใหม่เข้าไป
            cartItems.Add(newCartItem);

            // แปลงกลับเป็น JSON string เพื่อบันทืกข้อมูล
            userUpdateCart.CartDetail = JsonConvert.SerializeObject(cartItems);


            // อัปเดตข้อมูลในฐานข้อมูล
            _users.Users.Update(userUpdateCart);
            await _users.SaveChangesAsync();

            //ข้อมูลที่มี id และ username ตามที่กำหนด (ข้อมูลชุดที่จะอัปเดต cart) = ข้อมูลตะกร้าที่จะอัปเดต
            /*userUpdateCart.CartDetail = user.CartDetail;
            _users.Users.Update(userUpdateCart);
            await _users.SaveChangesAsync();*/

            return ApiResponseController.ApiResponseOk("Shopping cart updated successfully.");
        }

        public class CartItem
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string ImgCover { get; set; }
            public List<string> AllImg { get; set; }
            public decimal Price { get; set; }
            public int Inventory { get; set; }
            public int Quantity { get; set; }
        }
    }
}
