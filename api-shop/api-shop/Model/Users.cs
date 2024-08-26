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

    /*[Required(ErrorMessage = "- Please confirm your password.")] 
     ไม่ req เพราะเวลา login ไม่ได้กรอกน่ะ
    หมายเหตุ : password ปล่อยว่างไม่ได้อยู่แล้ว และถ้า ตัวยืนยันรหัสผ่านไม่ตรงกับรหัสผ่านก็ไม่ได้น่ะนะ*/
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
    public string Token { get; set; } = string.Empty;
    /*[AllowedValues("USER","ADMIN")]
    public string Role { get; set; } = "USER";*/
  }
}
