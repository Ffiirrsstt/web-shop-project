using API.Context;
using API.Model;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  /*[Route("api/[controller]")]
  [ApiController]

  public class RegisterController : ControllerBase
  {
    private readonly UsersDbContext _users;

    public RegisterController(UsersDbContext users) { _users = users; }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Users user){
      if (user == null) return BadRequest(new { Message = "Invalid data received. User data is missing." });

      if (ModelState.IsValid) {
        CheckUser checkEmail = new CheckUser(_users);
        if (await checkEmail.EmailIsUnique(user.googleLinkedEmail))
          return BadRequest(new { Message = "This email is already in use." });

        await _users.Users.AddAsync(user);
        await _users.SaveChangesAsync();
        return Ok(new { Message = "Sign-up successfully completed." });
      }
      else{
        var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
        return BadRequest(new { Errors = errors });
      }

    }
        

  }*/
}
