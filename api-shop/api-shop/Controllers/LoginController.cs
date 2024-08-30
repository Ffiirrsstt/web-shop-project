using API.Context;
using API.Model;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace api_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UsersDbContext _users;
        private readonly IConfiguration _configuration;

        public LoginController(UsersDbContext users, IConfiguration configuration)
        {
            _users = users;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Signin([FromBody] Users user)
        {
            if (user == null)
                return ApiResponseController.ApiResponseInvalidReceived();

            CheckUser check = new CheckUser(_users);
            var userLogin = await check.checkUser(user.Username,user.Password);

            if (userLogin == null) return ApiResponseController.ApiResponseNotFound(new { Message = "- Username or password is incorrect." });

            Token token = new Token(_users,_configuration);
            userLogin.Token = token.CreateToken(userLogin);
            userLogin.RefreshToken = await token.CreateRefreshToken();
            userLogin.TokenExpiryTime = DateTime.Now.AddDays(1);

            _users.Users.Update(userLogin);
            await _users.SaveChangesAsync();

            return ApiResponseController.ApiResponseOk("Log-in successfully completed.", 
                new {
                        /*
                        email = user.Username,
                        role = user.Role,
                        id = userLogin.Id,
                        */
                        token = userLogin.Token,
                        refreshToken = userLogin.RefreshToken,
                    }
                );
        }
    }
}
