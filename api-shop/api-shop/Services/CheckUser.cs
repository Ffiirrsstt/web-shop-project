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

    public Task<Users> checkUser(string username,string password) => 
            _users.Users.FirstOrDefaultAsync(data => data.Username == username && data.Password == password);

  }
}
