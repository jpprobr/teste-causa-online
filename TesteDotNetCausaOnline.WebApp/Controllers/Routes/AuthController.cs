using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;

using TesteDotNetCausaOnline.WebApp.Data;
using TesteDotNetCausaOnline.WebApp.Models;
using TesteDotNetCausaOnline.WebApp.ViewModels;
using TesteDotNetCausaOnline.WebApp.Models.AccountViewModels;
using TesteDotNetCausaOnline.WebApp.Config;


namespace TesteDotNetCausaOnline.WebApp.Controllers.Routes
{
    [Produces("application/json")]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMapper _mapper;


        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ApplicationDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }


        // POST api/auth/signup
        [Route("signup")]
        [HttpPost]
        public async Task<IActionResult> PostSignup([FromBody]CadastroUsuarioViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                //var userIdentity = _mapper.Map<AppUser>(model);
                var userIdentity = new ApplicationUser { Email = model.Email, UserName = model.Email };

                var result = await _userManager.CreateAsync(userIdentity, model.Password);

                if (!result.Succeeded)
                {
                    var errorsDesc = string.Empty;
                    foreach (var error in result.Errors)
                    {
                        errorsDesc += error.Description;
                    }

                    throw new Exception(errorsDesc);
                }

                //await _appDbContext.SaveChangesAsync();
                //await _signInManager.SignInAsync(userIdentity, isPersistent: false);

                return new OkObjectResult("Conta criada com sucesso.");
            }
            catch (Exception exc)
            {
                return BadRequest(new { exception = "Erro ao criar conta. Desc.: " + exc.Message });
            }
        }



        // POST /api/auth/login
        [Route("login")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostLogin([FromBody]LoginViewModel login, [FromServices]SigningConfigurations signingConfigurations, [FromServices]TokenConfigurations tokenConfigurations)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _signInManager.PasswordSignInAsync(login.Email, login.Password, false, lockoutOnFailure: false);
                if (!result.Succeeded)
                {
                    //return BadRequest(new { authenticated = false, message = "Login/Senha inválidos." });
                    throw new Exception("Login/Senha inválidos.");
                }

                ClaimsIdentity identity = new ClaimsIdentity(
                     new GenericIdentity(login.Email, "Login"),
                     new[] {
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                            new Claim(JwtRegisteredClaimNames.UniqueName, login.Email)
                     }
                 );

                DateTime dataCriacao = DateTime.Now;
                DateTime dataExpiracao = dataCriacao + TimeSpan.FromSeconds(tokenConfigurations.Seconds);

                DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Local);
                DateTime localTime = dataExpiracao.ToLocalTime();
                TimeSpan elapsedTime = localTime - unixEpoch;
                long timestampExp = Convert.ToInt64(elapsedTime.TotalMilliseconds);

                var handler = new JwtSecurityTokenHandler();

                var securityToken = new JwtSecurityToken(
                    issuer: tokenConfigurations.Issuer,
                    audience: tokenConfigurations.Audience,
                    signingCredentials: signingConfigurations.SigningCredentials,
                    notBefore: dataCriacao,
                    expires: dataExpiracao,
                    claims: identity.Claims
                );
                securityToken.Payload["expiration"] = timestampExp;

                var token = handler.WriteToken(securityToken);

                var resp = new
                {
                    message = "OK",
                    authenticated = true,
                    created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                    accessToken = token
                };

                // Sincroniza Identity (apenas info / permitir informar/controlar por MVC)
                //var userIdentity = new ApplicationUser { Email = login.Email };
                //await _signInManager.SignInAsync(userIdentity, isPersistent: false);
                

                return Ok(resp);
            }
            catch (Exception exc)
            {
                var resp = new
                {
                    authenticated = false,
                    message = exc.Message,
                };

                return BadRequest(resp);
            }
        }
    }
}