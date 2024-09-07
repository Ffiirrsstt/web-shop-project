using API.Context;
using API.Model;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

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
    
    //ใช้เช็กเพื่อนำข้อมูลไปดำเนินการต่าง ๆ เช่น update หรือนำข้อมูลในส่วนที่ต้องการไปแสดงผล
    public async Task<Users> checkUserProceed(int id,string username) => 
            await _users.Users.FirstOrDefaultAsync(data =>   data.Id == id && data.Username == username);
        
    public async Task<bool> checkUsernameBool(string username) => 
            await _users.Users.AnyAsync(data => data.Username == username);



  }
}
