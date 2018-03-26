using AutoMapper;
using TesteDotNetCausaOnline.Domain.Models;
using TesteDotNetCausaOnline.WebApp.Models;
using TesteDotNetCausaOnline.WebApp.ViewModels;


namespace TesteDotNetCausaOnline.WebApp.Config
{
    public class AutoMapperProfileConfig : Profile
    {
        public AutoMapperProfileConfig()
        {
            //CreateMap<RegisterViewModel, ApplicationUser>().ReverseMap();
            CreateMap<CadastroUsuarioViewModel, ApplicationUser>().ReverseMap();
            CreateMap<ChamadoViewModel, Chamado>().ReverseMap();
            CreateMap<CategoriaViewModel, Categoria>().ReverseMap();

        }
    }
}
