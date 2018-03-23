using AutoMapper;
using TesteDotNetCausaOnline.WebApp.Models;
using TesteDotNetCausaOnline.WebApp.ViewModels;


namespace TesteDotNetCausaOnline.WebApp.Config
{
    public class AutoMapperProfileConfig : Profile
    {
        public AutoMapperProfileConfig()
        {
            //CreateMap<RegisterViewModel, ApplicationUser>().ReverseMap();
            CreateMap<CadastroUsuarioViewModel, AppUser>().ReverseMap();
        }
    }
}
