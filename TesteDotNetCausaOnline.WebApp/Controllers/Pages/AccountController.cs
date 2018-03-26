using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TesteDotNetCausaOnline.WebApp.Controllers.Pages
{
    public class AccountController : Controller
    {
        /// <summary>
        /// Account - SPA
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
    }
}