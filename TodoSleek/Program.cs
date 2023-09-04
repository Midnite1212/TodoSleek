using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoSleek.Models;
using TodoSleek.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins("https://localhost:44485");
                    policy.AllowAnyHeader().AllowAnyMethod();
                });
});

// Add services to the container.

builder.Services.Configure<TodoStoreDatabaseSettings>(
                builder.Configuration.GetSection(nameof(TodoStoreDatabaseSettings)));

builder.Services.AddSingleton<ITodoStoreDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<TodoStoreDatabaseSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
        new MongoClient(builder.Configuration.GetValue<string>("TodoStoreDatabaseSettings:ConnectionString")));

builder.Services.AddScoped<ITodoService, TodoService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
