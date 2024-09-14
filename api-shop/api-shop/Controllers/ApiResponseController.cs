using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Model;

namespace api_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiResponseController : ControllerBase
    {
        // res ok 200 ที่มีการข้อมูล (data)
        public static IActionResult ApiResponseOk(string message, object datas) =>
            new OkObjectResult(new ApiResponse(200, message, null, datas));

        public static IActionResult ApiResponseOk(string message) =>
            new OkObjectResult(new ApiResponse(200, message));

        public static IActionResult ApiResponseBadRequest(object errors) =>
            new BadRequestObjectResult(new ApiResponse(400, "BadRequest", errors));

        public static IActionResult ApiResponseNotFound(object errors) =>
            new NotFoundObjectResult(new ApiResponse(404, "NotFound", errors));

        public static IActionResult ApiResponseError(object errors) =>
            new ObjectResult(new ApiResponse(500, "Found Errors", errors)) { StatusCode = 500 };

        public static IActionResult ApiResponseDataBase(object errors) =>
            new ObjectResult(new ApiResponse(503, "Database Connection Error", errors));

        public static IActionResult ApiResponseUnauthorized(object errors) =>
            new ObjectResult(new ApiResponse(401, "Unauthorize", errors));

        public static IActionResult ApiResponseInvalidReceived() =>
            ApiResponseBadRequest(errors: new { Request = "- Invalid data received. User data is missing." });
    }
}
