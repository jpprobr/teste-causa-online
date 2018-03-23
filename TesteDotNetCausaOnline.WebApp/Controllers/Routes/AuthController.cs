using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using AutoMapper;

using TesteDotNetCausaOnline.WebApp.Data;
using TesteDotNetCausaOnline.WebApp.Models;
using TesteDotNetCausaOnline.WebApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using TesteDotNetCausaOnline.WebApp.Models.AccountViewModels;

namespace TesteDotNetCausaOnline.WebApp.Controllers.Routes
{
    [Produces("application/json")]
    [Route("api/Accounts")]
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;


        public AuthController(UserManager<AppUser> userManager, IMapper mapper, ApplicationDbContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;           
        }


        // POST api/auth
        [HttpPost]
        public async Task<IActionResult> PostRegister([FromBody]CadastroUsuarioViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                //var userIdentity = _mapper.Map<AppUser>(model);
                var userIdentity = new AppUser  { Email = model.Email, UserName = model.Email };

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

                await _appDbContext.SaveChangesAsync();

                return new OkObjectResult("Conta criada com sucesso.");
            }
            catch (Exception exc)
            {
                return BadRequest(new { exception = "Erro ao criar conta. Desc.: " + exc.Message });
            }
        }


       
    }
}