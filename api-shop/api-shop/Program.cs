using API.Context;
using api_shop.Context;
using api_shop.Controllers;
using api_shop.Services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ลงทะเบียน Payment กับค่า secretKey
var secretKey = builder.Configuration["Stripe:SecretKey"];
builder.Services.AddScoped(provider => new Payment(secretKey));

builder.Services.AddCors(option => {
        option.AddPolicy("Policy", builder => {
            builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
    }
);

builder.Services.AddDbContext<UsersDbContext>(option => {
    option.UseSqlServer(builder.Configuration.GetConnectionString("ConnectSqlStr"));
});

builder.Services.AddDbContext<ProductDbContext>(option => {
    option.UseSqlServer(builder.Configuration.GetConnectionString("ConnectSqlStr"));
});

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options => {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ValidateAudience = false,
            ValidateIssuer = false,
            ClockSkew = TimeSpan.Zero
        };
    }
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Policy");
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
