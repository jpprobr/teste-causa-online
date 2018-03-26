using Microsoft.AspNetCore.Mvc;

namespace TesteDotNetCausaOnline.WebApp.Controllers.Pages
{
    public class CategoriasController : Controller
    {
        /// <summary>
        /// Categorias - SPA
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
    }
}