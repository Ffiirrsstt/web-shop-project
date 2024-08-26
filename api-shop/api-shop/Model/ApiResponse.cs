namespace API.Model
{
  public class ApiResponse
  {
    public int StatusCode { get; set; }
    public string Message { get; set; }

    public object Errors { get; set; }

    public object Datas { get; set; }

    public ApiResponse(int statusCode, string message, object errors = null, object datas = null)
    {
      StatusCode = statusCode;
      Message = message;
      Errors = errors;
      Datas = datas;
    }
  }
}
