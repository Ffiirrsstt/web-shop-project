using Stripe;

namespace api_shop.Services
{
    public class Payment
    {
        private readonly string _secretKey;

        public Payment(string secretKey)
        {
            _secretKey = secretKey;
            StripeConfiguration.ApiKey = _secretKey;
        }
        public async Task<string> CreateProductAsync(string name, string description)
        {
            var options = new ProductCreateOptions
            {
                Name = name,
                Description = description,
            };
            var service = new ProductService();
            var product = await service.CreateAsync(options);
            return product.Id;
        }

        public async Task<string> CreatePriceAsync(decimal amount, string productId)
        {
            var options = new PriceCreateOptions
            {
                UnitAmount = (long)(amount * 100), // จำนวนเงิน (สตางค์)
                Currency = "thb",
                Product = productId,
            };
            var service = new PriceService();
            var price = await service.CreateAsync(options);
            return price.Id;
        }
    }
}
