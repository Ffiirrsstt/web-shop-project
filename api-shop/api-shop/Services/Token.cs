using API.Context;
using API.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace API.Services
{
  public class Token
  {
        private readonly UsersDbContext _users;
        private readonly IConfiguration _configuration;

        public Token(UsersDbContext users, IConfiguration configuration)
        {
            _users = users;
            _configuration = configuration;
        }

        private byte[] getKey()
        {
            return Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
        }

        public string CreateToken(Users user)
        {
            /*ClaimTypes.NameIdentifier เป็นค่าคงที่ที่ใช้สำหรับการแทนรหัสประจำตัวของผู้ใช้ในรูปแบบที่กำหนดโดยมาตรฐานของ .NET สำหรับ Claims*/
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = getKey();
            var identity = new ClaimsIdentity(new Claim[]{
            new Claim(ClaimTypes.Name,user.Id.ToString()),
            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
            new Claim("Id",user.Id.ToString()),
            new Claim("Username",user.Username),
            //new Claim("Password",user.Password),
            //new Claim("FirstName",user.FirstName),
            //new Claim("LastName",user.LastName),
            //new Claim(ClaimTypes.Role,user.Role)
          });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDesciptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = credentials
            };
            //AddSeconds(10)
            //AddDays(1)
            //.AddHours(1);

            var token = jwtTokenHandler.CreateToken(tokenDesciptor);
            // แปลงเป็น JWT string
            return jwtTokenHandler.WriteToken(token);
        }

        public async Task<string> CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);
            //ไม่ให้ซ้ำ
            var tokenUser = await _users.Users.AnyAsync(user => user.RefreshToken == refreshToken);
            if (tokenUser) return await CreateRefreshToken();
            return refreshToken;
        }

        public ClaimsPrincipal GetPrincipal(string token)
        {
            var key = getKey();
            var tokenParameter = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = false,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            //ตรวจสอบความถูกต้องของ token
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenParameter, out securityToken);
            //แปลงเป็น JwtSecurityToken
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            //ต้องการตรวจสอบว่าอัลกอริทึมการเข้ารหัสเป็น HmacSha256 ไหม
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                //ไม่เป็น HmacSha256 (SecurityTokenException แสดงถึงข้อผิดพลาดที่เกิดจากการตรวจสอบความถูกต้อง token)
                throw new SecurityTokenException("This is Invalid Token");

            return principal;
        }
    }
}
