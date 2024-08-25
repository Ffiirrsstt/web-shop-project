using API.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
  public class Token
  {
    /*public static string CreateToken(Users user){
      var jwtTokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes("dataSceretdataSceredataSceredataScere");
      var identity = new ClaimsIdentity(new Claim[]{
        new Claim(ClaimTypes.Email,user.googleLinkedEmail),
        new Claim("FirstName",user.FirstName),
        new Claim("LastName",user.LastName),
        new Claim("EnteredEmail",user.EnteredEmail),
        new Claim(ClaimTypes.Role,user.Role)
      });

      var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
      var tokenDesciptor = new SecurityTokenDescriptor{
        Subject = identity,
        Expires = DateTime.Now.AddDays(10),
        SigningCredentials = credentials
      };
      //AddSeconds(10)
      //AddDays(1)

      var token = jwtTokenHandler.CreateToken(tokenDesciptor);
      return jwtTokenHandler.WriteToken(token);
    }*/
  }
}
