using API.Context;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api_shop.Model;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Runtime.ConstrainedExecution;

namespace api_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly UsersDbContext _users;
        private readonly IConfiguration _configuration;

        public TokenController(UsersDbContext users, IConfiguration configuration)
        {
            _users = users;
            _configuration = configuration;
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] Auth token)
        {
            if (token == null || string.IsNullOrEmpty(token.RefreshToken))
                return ApiResponseController.ApiResponseInvalidReceived();

            Token newToken = new Token(_users, _configuration);
            var principal = newToken.GetPrincipal(token.Token);

            var id = principal.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;

            if (string.IsNullOrEmpty(id) || !int.TryParse(id, out int userId))
            {
                return ApiResponseController.ApiResponseBadRequest(
                    errors: new { Message = new[] {
                    "An error has occurred with the Claims ID section of the token." } });
            }

            var user = await _users.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if (user == null)
                return ApiResponseController.ApiResponseNotFound(errors: new { 
                    Message = new[] { "User not found" } });

            if (user.RefreshToken != token.RefreshToken)
                return ApiResponseController.ApiResponseInvalidReceived();

            if (user.TokenExpiryTime <= DateTime.Now)
                return ApiResponseController.ApiResponseUnauthorized(errors: new
                {
                    Message = new[] { "Token has expired" }
                });

            Token tokenService = new Token(_users, _configuration);
            user.Token = tokenService.CreateToken(user);
            user.RefreshToken = await tokenService.CreateRefreshToken();
            user.TokenExpiryTime = DateTime.Now.AddDays(1);
            await _users.SaveChangesAsync();

            return ApiResponseController.ApiResponseOk
            (message: "Token generation successful.", datas: new Auth()
            {
                Token = user.Token,
                RefreshToken = user.RefreshToken,
            });

        }
    }
}
