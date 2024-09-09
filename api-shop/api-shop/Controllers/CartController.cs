using API.Context;
using API.Model;
using API.Services;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure.Core;
using api_shop.Services;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

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

        [Authorize]
        [HttpGet("getCart")]
        /*selectDefault ถ้าเป็น true คือการตั้งค่าให้สินค้าในตะกร้า (filed Select) เป็น false ทั้งหมด (แสดงว่ายังไม่เลือกสินค้านั้นเพื่อแสดงผลในการชำระเงิน) - filed Select ใน Model ของ CartItem*/
        public async Task<IActionResult> Signin(int id,string username, bool selectDefault =false)
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

            if (selectDefault)
            {
                CartManage cart = new CartManage(_users);
                await cart.settingFalseSelect(resultUser);
            }

            return ApiResponseController.ApiResponseOk("Shopping cart data retrieved successfully.",
                new{ cart = resultUser.CartDetail,}
            );
        }

        [Authorize]
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

            CartManage cart = new CartManage(_users);

            await cart.cartChanging(user, userUpdateCart);

            return ApiResponseController.ApiResponseOk("Shopping cart updated successfully.");
        }



        public class CartItem
        {
            [Key]
            public int Id { get; set; }
            public string Title { get; set; }
            public string ImgCover { get; set; }
            public List<string> AllImg { get; set; }
            public decimal Price { get; set; }
            public int Inventory { get; set; }
            public int Quantity { get; set; }
            //ถ้าเป็น true คือใส่ลงตะกร้าแล้ว และเลือกเตรียมจะจ่ายเงินในหน้า checkout
            public Boolean Select { get; set; }
        }
    }
}
