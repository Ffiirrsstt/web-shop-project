using API.Context;
using API.Model;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private readonly UsersDbContext _users;
        public SignupController(UsersDbContext users) { _users = users; }

        //[Authorize]

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] Users user)
        {
            if (user == null)
                return ApiResponseController.ApiResponseInvalidReceived();

            if (ModelState.IsValid)
            {
                CheckUser check = new CheckUser(_users);
                var registered = await check.checkUsernameBool(user.Username);
                if(registered)
                    return ApiResponseController.ApiResponseBadRequest(
                        errors: new
                        {
                            Message = new[] { "username is already in use." }
                        });

                await _users.Users.AddAsync(user);
                await _users.SaveChangesAsync();
                return ApiResponseController.ApiResponseOk("Sign-up successfully completed.");
            }
            else
            {
                //เหมือนต่อให้ไม่มีบรรทัดนี้แล้วใช้เป็น response 200 ok ตัวของ api ก็จะส่ง error 400 ไปอยู่ดี เพราะข้อมูลที่รับเข้ามาไม่ถูกต้อง
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return ApiResponseController.ApiResponseBadRequest(new { Errors = errors });
            }

        }
    }
}
