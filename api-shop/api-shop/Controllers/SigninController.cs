using API.Context;
using API.Model;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  /*[Route("api/[controller]")]
  [ApiController]
  public class SigninController : ControllerBase
  {
    private readonly UsersDbContext _users;

    public SigninController(UsersDbContext users) {
      _users = users;
    }

    [HttpPost("signin")]
    public async Task<IActionResult> Signin([FromBody] Users user){
      if (user == null) return BadRequest(new { Message = "Invalid data received. User data is missing." });

      CheckUser checkEmail = new CheckUser(_users);
      var result = await checkEmail.EmailFound(user.googleLinkedEmail);
      if (result == null) return NotFound(new { Message = "Your account has not been registered yet." });

      user.Token = Token.CreateToken(result);

      return Ok(new{
        token = user.Token, id = user.Id, email = user.googleLinkedEmail,
        role = user.Role, Message = "Log-in successfully completed."
      });
    }
  
  }*/
}
