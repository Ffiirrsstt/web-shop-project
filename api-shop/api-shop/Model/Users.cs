using api_shop.Validation;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace API.Model
{
  public class Users
  {
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "- Please enter your username.")]
    public string Username { get; set; } 
    [Required(ErrorMessage = "- Please enter your password.")]
    public string Password { get; set; }

    [Required(ErrorMessage = "- Please confirm your password.")] 
    [ConfirmPassword]
    public string PasswordConfirm { get; set; } = string.Empty;

    /*[Required(ErrorMessage = "Please enter your first name.")]
    public string FirstName { get; set; }
    [Required(ErrorMessage = "Please enter your last name.")]
    public string LastName { get; set; }
    //อีเมลล์ในกรณีที่ผู้ใช้กรอกเข้ามาตอนสมัคร

    [Required(ErrorMessage = "Please enter your email address.")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    public string Email { get; set; }*/

    //เก็บเป็น json string
    public string CartDetail { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime TokenExpiryTime { get; set; }
    /*[AllowedValues("USER","ADMIN")]
    public string Role { get; set; } = "USER";*/
  }
}
