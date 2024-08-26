using API.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  /*[Route("api/[controller]")]
  [ApiController]
  public class Management : ControllerBase
  {
    private readonly UsersDbContext _users;
    public Management(UsersDbContext users) { _users = users; }

    [Authorize]
    [HttpGet("allUser")]
    public async Task<IActionResult> AllUser() => Ok(new { Message = await _users.Users.ToListAsync() });
  }*/
}
