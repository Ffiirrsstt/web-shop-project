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
    
    //�������͹Ӣ�����仴��Թ��õ�ҧ � �� update ���͹Ӣ��������ǹ����ͧ�����ʴ���
    public async Task<Users> checkUserProceed(int id,string username) => 
            await _users.Users.FirstOrDefaultAsync(data =>   data.Id == id && data.Username == username);
        
    public async Task<bool> checkUsernameBool(string username) => 
            await _users.Users.AnyAsync(data => data.Username == username);



  }
}
