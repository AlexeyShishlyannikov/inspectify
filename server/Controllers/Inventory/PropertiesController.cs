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
    [Route("api/inventory/templates/{templateId}/properties")]
    public class PropertiesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IInventoryProvider inventoryProvider;

        public PropertiesController(
            IMapper mapper,
            IInventoryProvider inventoryProvider)
        {
            this.mapper = mapper;
            this.inventoryProvider = inventoryProvider;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddProperty([FromRoute] string templateId, [FromBody] PropertyViewModel propertyViewModel)
        {
            var property = mapper.Map<Property>(propertyViewModel);
            property.TemplateId = templateId;
            property = await inventoryProvider.AddProperty(property);
            mapper.Map(property, propertyViewModel);
            return Ok(propertyViewModel);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> GetProperty([FromRoute] int id)
        {
            var property = await inventoryProvider.GetProperty(id);
            if (property == null) return NotFound("Not found");
            var propertyViewModel = mapper.Map<PropertyViewModel>(property);
            return Ok(propertyViewModel);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetProperties([FromQuery] string templateId)
        {
            var properties = await inventoryProvider.GetProperties(templateId);
            var propertyViewModelList = mapper.Map<List<PropertyViewModel>>(properties);
            return Ok(propertyViewModelList);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateProperty([FromBody] PropertyViewModel propertyViewModel)
        {
            var property = await inventoryProvider.GetProperty(propertyViewModel.Id);
            if (property == null) return NotFound("Not found");
            property = mapper.Map(propertyViewModel, property);
            await inventoryProvider.UpdateProperty(property);
            propertyViewModel = mapper.Map(property, propertyViewModel);
            return Ok(propertyViewModel);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProperty([FromRoute] int id)
        {
            var property = await inventoryProvider.GetProperty(id);
            if (property == null) return NotFound("Not found");
            await inventoryProvider.DeleteProperty(property);
            return Ok(id);
        }
    }
}