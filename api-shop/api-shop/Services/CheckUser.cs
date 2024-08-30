using API.Context;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
  public class CheckUser
  {
    private readonly UsersDbContext _users;
    public CheckUser(UsersDbContext users) {
      _users = users;
    }

    public async Task<Users> checkUser(string username,string password) => 
            await _users.Users.FirstOrDefaultAsync(data => data.Username == username && data.Password == password);
        
    public async Task<bool> checkUsernameBool(string username) => 
            await _users.Users.AnyAsync(data => data.Username == username);



  }
}
