using System;
using System.Collections.Generic;
using System.Linq;
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
            CreateMap<FieldViewModel, Field>()
                .ForMember(f => f.Form, opt => opt.Ignore())
                .ForMember(f => f.FormId, opt => opt.MapFrom((src, dest, destMember, context) => (string)context.Items["FormId"]));
            CreateMap<Form, FormViewModel>();
            CreateMap<FormViewModel, Form>()
                .BeforeMap((src, dest, context) => context.Items["FormId"] = src.Id) // Writing form id into context, to pick up in field mapping
                .ForMember(src => src.Fields, opt => opt.MapFrom((src, dest, i, context) => GetUpdatedFields(src, dest, context))); // Childrens mapping
        }
        private List<Field> GetUpdatedFields(FormViewModel src, Form dest, ResolutionContext context)
        {
            var destArray = new List<Field>();
            foreach (var srcField in src.Fields)
            {
                if (String.IsNullOrEmpty(srcField.Id))
                {
                    destArray.Add(context.Mapper.Map<Field>(srcField));
                }
                else
                {
                    destArray.Add(context.Mapper.Map(srcField, dest.Fields.SingleOrDefault(c => c.Id == srcField.Id))); // TODO: Turn into map calls
                }
            }
            return destArray;
        }
    }
}