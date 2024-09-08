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
            /*ClaimTypes.NameIdentifier �繤�Ҥ������������Ѻ���᷹���ʻ�Шӵ�Ǣͧ�������ٻẺ����˹����ҵðҹ�ͧ .NET ����Ѻ Claims*/
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
            // �ŧ�� JWT string
            return jwtTokenHandler.WriteToken(token);
        }

        public async Task<string> CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);
            //��������
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
            //��Ǩ�ͺ�����١��ͧ�ͧ token
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenParameter, out securityToken);
            //�ŧ�� JwtSecurityToken
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            //��ͧ��õ�Ǩ�ͺ�����š��Է�������������� HmacSha256 ���
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                //����� HmacSha256 (SecurityTokenException �ʴ��֧��ͼԴ��Ҵ����Դ�ҡ��õ�Ǩ�ͺ�����١��ͧ token)
                throw new SecurityTokenException("This is Invalid Token");

            return principal;
        }
    }
}
