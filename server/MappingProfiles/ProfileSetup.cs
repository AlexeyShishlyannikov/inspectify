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
            ConfigureTeamMappings();
            ConfigureCompanyMappings();
            ConfigurePersonMappings();
            ConfigureReportMappings();
            ConfigureFormMappings();
            ConfigureInventoryMappings();
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
                .ForMember(model => model.Teams, opt => opt.Ignore());
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
                .BeforeMap((src, dest, context) => context.Items["FieldId"] = src.Id)
                .ForMember(f => f.Form, opt => opt.Ignore())
                .ForMember(f => f.FormId, opt => opt.MapFrom((src, dest, destMember, context) => (string)context.Items["FormId"]))
                .ForMember(src => src.Options, opt => opt.MapFrom((src, dest, i, context) => GetUpdatedOptions(src, dest, context))); // Childrens mapping
            CreateMap<OptionViewModel, Option>()
                .ForMember(f => f.IsArchived, opt => opt.MapFrom((src, dest) => false))
                .ForMember(f => f.Field, opt => opt.Ignore())
                .ForMember(f => f.FieldId, opt => opt.MapFrom((src, dest, destMember, context) => (string)context.Items["FieldId"]));
            CreateMap<Form, FormViewModel>()
                .AfterMap((src, dest) => dest.Fields.Sort((fieldA, fieldB) => fieldA.SortIndex - fieldB.SortIndex));
            CreateMap<FormViewModel, Form>()
                .BeforeMap((src, dest, context) => context.Items["FormId"] = src.Id) // Writing form id into context, to pick up in field mapping
                .ForMember(src => src.Fields, opt => opt.MapFrom((src, dest, i, context) => GetUpdatedFields(src, dest, context))); // Childrens mapping
        }
        private List<Field> GetUpdatedFields(FormViewModel src, Form dest, ResolutionContext context)
        {
            var fieldMap = dest.Fields?.ToDictionary(v => v.Id, v => v);
            return src.Fields.Select(srcField =>
            {
                if (String.IsNullOrEmpty(srcField.Id))
                {
                    return context.Mapper.Map<Field>(srcField);
                }
                return context.Mapper.Map(srcField, fieldMap.SingleOrDefault(c => c.Key == srcField.Id).Value);
            }).ToList();
        }

        private List<Option> GetUpdatedOptions(FieldViewModel src, Field dest, ResolutionContext context)
        {
            var optionsMap = dest.Options?.ToDictionary(v => v.Id, v => v);
            return src.Options.Select(srcOption =>
            {
                if (String.IsNullOrEmpty(srcOption.Id))
                {
                    return context.Mapper.Map<Option>(srcOption);
                }
                return context.Mapper.Map(srcOption, optionsMap.SingleOrDefault(c => c.Key == srcOption.Id).Value);
            }).ToList();
        }

        public void ConfigureInventoryMappings()
        {
            CreateMap<Template, TemplateViewModel>();
            CreateMap<TemplateViewModel, Template>()
                .ForMember(t => t.Items, opt => opt.Ignore())
                .ForMember(t => t.CompanyId, opt => opt.Ignore())
                .ForMember(t => t.Company, opt => opt.Ignore())
                .ForMember(t => t.Properties, opt => opt.Ignore());

            CreateMap<Property, PropertyViewModel>();
            CreateMap<PropertyViewModel, Property>()
                .ForMember(p => p.TemplateId, opt => opt.Ignore())
                .ForMember(p => p.Template, opt => opt.Ignore());

            CreateMap<Item, ItemViewModel>();
            CreateMap<ItemViewModel, Item>()
                .BeforeMap((src, dest, context) => context.Items["ItemId"] = src.Id)
                .ForMember(p => p.Template, opt => opt.Ignore())
                .ForMember(i => i.TemplateId, opt => opt.MapFrom(src => src.Template.Id))
                .ForMember(src => src.Values,
                    opt => opt.MapFrom((src, dest, i, context) => GetUpdatedValues(src, dest, context))); // Childrens mapping

            CreateMap<ItemValue, ItemValueViewModel>();
            CreateMap<ItemValueViewModel, ItemValue>()
                .ForMember(i => i.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(i => i.PropertyId, opt => opt.MapFrom(src => src.Property.Id))
                .ForMember(p => p.Property, opt => opt.Ignore())
                .ForMember(v => v.ItemId, opt => opt.MapFrom((src, dest, destMember, context) => (string)context.Items["ItemId"]))
                .ForMember(v => v.Item, opt => opt.Ignore());
        }

        private List<ItemValue> GetUpdatedValues(ItemViewModel src, Item dest, ResolutionContext context)
        {
            var valuesMap = dest.Values?.ToDictionary(v => v.Id, v => v);
            return src.Values.Select(value =>
            {
                if (value.Id == null)
                {
                    return context.Mapper.Map<ItemValue>(value);
                }
                return context.Mapper.Map(value, valuesMap.SingleOrDefault(c => c.Key == value.Id).Value);
            }).ToList();
        }
    }
}