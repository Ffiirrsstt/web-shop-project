using API.Context;
using API.Model;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UsersDbContext _users;

        public LoginController(UsersDbContext users)
        {
            _users = users;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Signin([FromBody] Users user)
        {
            if (user == null)
                return ApiResponseController.ApiResponseInvalidReceived();

            CheckUser check = new CheckUser(_users);
            var resultLogin = await check.checkUser(user.Username,user.Password);
            if (resultLogin == null) return NotFound(new { Message = "- Username or password is incorrect." });

            //user.Token = Token.CreateToken(result);

            return Ok(new
            {
                /*token = user.Token,
                id = user.Id,
                email = user.Username,
                role = user.Role,*/
                Message = "Log-in successfully completed."
            });
        }
    }
}
