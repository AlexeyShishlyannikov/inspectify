using Microsoft.AspNetCore.Mvc;

namespace Inspectify.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}