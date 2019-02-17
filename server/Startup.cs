using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Logistics.BusinessLayer;
using Logistics.DAL;
using Logistics.Filters;
using Logistics.Identity;
using Logistics.Identity.Models;
using Logistics.Models;
using Logistics.Models.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Providers
            services.AddScoped<IAccountProvider, AccountProvider>();
            services.AddScoped<ICompaniesProvider, CompaniesProvider>();
            services.AddScoped<ITeamProvider, TeamProvider>();
            services.AddScoped<IVehicleProvider, VehicleProvider>();
            services.AddScoped<IReportsProvider, ReportProvider>();
            services.AddScoped<IFormProvider, FormProvider>();

            // Database
            services.AddDbContext<LogisticsDbContext>(options => options.UseMySql(Configuration.GetConnectionString("LogisticsDb")));

            // Identity
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Tokens.EmailConfirmationTokenProvider = "emailconf";

                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;

                options.User.RequireUniqueEmail = true;

                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
            })
              .AddEntityFrameworkStores<LogisticsDbContext>()
              .AddDefaultTokenProviders()
              .AddTokenProvider<EmailConfirmationTokenProvider<ApplicationUser>>("emailconf")
              .AddPasswordValidator<CustomPasswordValidator<ApplicationUser>>();
            // Reset Token Configuration
            services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromHours(3));
            // Confirmation Token Configuration
            services.Configure<EmailConfirmationTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromDays(3));

            services.AddScoped<IJwtFactory, JwtFactory>();

            // Get options from app settings
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtAppSettingOptions["Key"]));
            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
              .AddJwtBearer(configureOptions =>
              {
                  configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                  configureOptions.TokenValidationParameters = tokenValidationParameters;
                  configureOptions.SaveToken = true;
              });

            // api user claim policy
            services.AddAuthorization(options => { });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "client/build";
            });

            services.AddAutoMapper();

            services.AddMvc(config =>
            {
                config.Filters.Add(new ValidateModelStateFilter());
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    ConfigFile = "webpack.config.js",
                    HotModuleReplacement = true,
                    ProjectPath = System.IO.Path.Combine(env.ContentRootPath, "../"),
                    EnvParam = "development",
                    EnvironmentVariables = new Dictionary<string, string>()
                    {
                        { "NODE_ENV", "development" },
                        { "ENV", "development" }
                    },
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
