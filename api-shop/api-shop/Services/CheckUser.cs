using API.Context;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
  /*public class CheckUser
  {
    private readonly UsersDbContext _users;
    public CheckUser(UsersDbContext users) {
      _users = users;
    }

    public Task<Users> EmailFound(string email) => _users.Users.FirstOrDefaultAsync(data => data.googleLinkedEmail == email);

    public Task<bool> EmailIsUnique(string email) => _users.Users.AnyAsync(data => data.googleLinkedEmail == email);
  }*/
}
