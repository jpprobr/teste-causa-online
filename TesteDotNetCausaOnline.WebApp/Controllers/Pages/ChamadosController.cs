using Microsoft.AspNetCore.Mvc;

namespace TesteDotNetCausaOnline.WebApp.Controllers.Pages
{
    public class ChamadosController : Controller
    {
        /// <summary>
        /// Chamados - SPA
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
    }
}