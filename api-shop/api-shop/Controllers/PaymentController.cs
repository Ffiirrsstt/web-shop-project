using API.Model;
using api_shop.Services;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;

namespace api_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly Payment _pay;
        private readonly IConfiguration _configuration;

        public PaymentController(Payment pay, IConfiguration configuration)
        {
            _pay = pay;
            _configuration = configuration;
        }

        //สร้างรหัสราคาขึ้นมา เพื่อนำไปใช้ใน create-checkout
        [HttpPost("create-price")]
        public async Task<IActionResult> CreatePrice([FromBody] CreatePriceRequest req)
        {
            // ใช้ _stripeService ที่ได้รับจาก DI Container แทนการสร้างใหม่
            var productId = await _pay.CreateProductAsync(req.ProductName, req.ProductDescription);
            var priceId = await _pay.CreatePriceAsync(req.Amount, productId);

            return ApiResponseController.ApiResponseOk("The creation of the price ID is complete.",
                new { PriceId = priceId });
        }

        [HttpPost("create-checkout")]
        //public ActionResult Create([FromBody] List<CheckoutRequest> req)
        public async Task<IActionResult> Create([FromBody] List<CheckoutRequest> req)
        {
            if (req == null || req.Count == 0)
                return ApiResponseController.ApiResponseInvalidReceived();

            var lineItems = new List<SessionLineItemOptions>();
            foreach (var request in req)
            {
                if (string.IsNullOrWhiteSpace(request.PriceId) || request.Quantity < 1)
                {
                    return ApiResponseController.ApiResponseBadRequest(
                     errors: new {
                         Message = new[] { "PriceId is required and Quantity must be at least 1." }
                     });
                }

                lineItems.Add(new SessionLineItemOptions
                {
                    Price = request.PriceId,
                    Quantity = request.Quantity,
                });
            }

            var options = new SessionCreateOptions
            {
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = _configuration["Url:SuccessCheckout"],
                CancelUrl = _configuration["Url:cancelCheckout"],
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return ApiResponseController.ApiResponseOk(
                "The URL for the payment page has been successfully created.",
                new { url = session.Url });
        }
    }

    public class CreatePriceRequest
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal Amount { get; set; }
        //public string ProductId { get; set; }
    }

    public class CheckoutRequest
    {
        public string PriceId { get; set; }
        public long Quantity { get; set; }
    }
}
