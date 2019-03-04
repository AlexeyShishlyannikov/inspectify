using AutoMapper;
using Inspectify.Models;
using Inspectify.ViewModels;

namespace Inspectify.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            ConfigureVehicleMappings();
            ConfigureTeamMappings();
            ConfigureCompanyMappings();
            ConfigurePersonMappings();
            ConfigureReportMappings();
            ConfigureFormMappings();
        }

        public void ConfigureVehicleMappings()
        {
            CreateMap<Vehicle, VehicleViewModel>();
            CreateMap<VehicleViewModel, Vehicle>()
                .ForMember(model => model.ModelId, opt => opt.MapFrom(viewModel => viewModel.Model.Id));

            CreateMap<VehicleMake, VehicleMakeViewModel>();
            CreateMap<VehicleMakeViewModel, VehicleMake>();

            CreateMap<VehicleModel, VehicleModelViewModel>();
            CreateMap<VehicleModelViewModel, VehicleModel>();
        }

        public void ConfigureTeamMappings()
        {
            CreateMap<Team, TeamViewModel>();
            CreateMap<TeamViewModel, Team>();
        }

        public void ConfigureCompanyMappings()
        {
            CreateMap<Company, CompanyViewModel>();
            CreateMap<CompanyViewModel, Company>()
                .ForMember(model => model.ApplicationUser, opt => opt.Ignore())
                .ForMember(model => model.ApplicationUserId, opt => opt.Ignore())
                .ForMember(model => model.Teams, opt => opt.Ignore())
                .ForMember(model => model.VehicleCompanies, opt => opt.Ignore())
                .ForMember(model => model.ReportCompanies, opt => opt.Ignore());
        }

        public void ConfigurePersonMappings()
        {
            CreateMap<Person, PersonViewModel>();
            CreateMap<PersonViewModel, Person>()
                .ForMember(p => p.Team, opt => opt.Ignore())
                .ForMember(p => p.TeamId, opt => opt.MapFrom(vm => vm.Team.Id));
        }

        public void ConfigureReportMappings()
        {
            CreateMap<Report, ReportViewModel>();
            CreateMap<ReportViewModel, Report>();
        }

        public void ConfigureFormMappings()
        {
            CreateMap<Form, FormViewModel>();
            CreateMap<FormViewModel, Form>();
        }
    }
}