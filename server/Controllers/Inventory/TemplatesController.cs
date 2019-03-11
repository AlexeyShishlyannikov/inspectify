using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Inspectify.BusinessLayer;
using Inspectify.Models;
using Inspectify.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers.Inventory
{
    [Route("api/inventory/templates")]
    public class TemplatesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IInventoryProvider inventoryProvider;

        public TemplatesController(
            IMapper mapper,
            IInventoryProvider inventoryProvider)
        {
            this.mapper = mapper;
            this.inventoryProvider = inventoryProvider;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddTemplate([FromBody] TemplateViewModel templateViewModel)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var template = mapper.Map<Template>(templateViewModel);
            template.CompanyId = companyId;
            template = await inventoryProvider.AddTemplate(template);
            mapper.Map(template, templateViewModel);
            return Ok(templateViewModel);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> GetTemplate([FromRoute] string id)
        {
            var template = await inventoryProvider.GetTemplate(id);
            if (template == null) return NotFound("Not found");
            var templateViewModel = mapper.Map<TemplateViewModel>(template);
            return Ok(templateViewModel);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> SearchTemplates([FromQuery] string searchString)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var templates = await inventoryProvider.SearchTemplates(companyId, searchString);
            var templateViewModelList = mapper.Map<List<TemplateViewModel>>(templates);
            return Ok(templateViewModelList);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateTemplate([FromBody] TemplateViewModel templateViewModel)
        {
            var template = await inventoryProvider.GetTemplate(templateViewModel.Id);
            if (template == null) return NotFound("Not found");
            template = mapper.Map(templateViewModel, template);
            await inventoryProvider.UpdateTemplate(template);
            templateViewModel = mapper.Map(template, templateViewModel);
            return Ok(templateViewModel);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTemplate([FromRoute] string id)
        {
            var template = await inventoryProvider.GetTemplate(id);
            if (template == null) return NotFound("Not found");
            await inventoryProvider.DeleteTemplate(template);
            return Ok(id);
        }
    }
}