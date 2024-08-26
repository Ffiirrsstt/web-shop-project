using API.Model;
using System.ComponentModel.DataAnnotations;

namespace api_shop.Validation
{
    public class ConfirmPassword: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var model = (Users)validationContext.ObjectInstance;

            if (model.Password != model.PasswordConfirm)
            {
                return new ValidationResult("- Please enter the confirmation code to match the password.");
            }

            return ValidationResult.Success;
        }
    }
}
