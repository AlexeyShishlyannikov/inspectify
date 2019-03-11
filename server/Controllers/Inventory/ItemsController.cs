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
    [Route("api/inventory/items")]
    public class ItemsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IInventoryProvider inventoryProvider;

        public ItemsController(
            IMapper mapper,
            IInventoryProvider inventoryProvider)
        {
            this.mapper = mapper;
            this.inventoryProvider = inventoryProvider;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddItem([FromBody] ItemViewModel itemViewModel)
        {
            var item = mapper.Map<Item>(itemViewModel);
            item = await inventoryProvider.AddItem(item);
            itemViewModel = mapper.Map(item, itemViewModel);
            return Ok(itemViewModel);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> GetItem([FromRoute] string id)
        {
            var item = await inventoryProvider.GetItem(id);
            if (item == null) return NotFound("Not found");
            var itemViewModel = mapper.Map<ItemViewModel>(item);
            return Ok(itemViewModel);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> SearchItems([FromQuery] string searchString, [FromQuery] string templateId)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var items = await inventoryProvider.SearchItems(companyId, templateId, searchString);
            var itemViewModelList = mapper.Map<List<ItemViewModel>>(items);
            return Ok(itemViewModelList);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateItem([FromBody] ItemViewModel itemViewModel)
        {
            var item = await inventoryProvider.GetItem(itemViewModel.Id);
            if (item == null) return NotFound("Not found");
            item = mapper.Map(itemViewModel, item);
            item = await inventoryProvider.UpdateItem(item);
            itemViewModel = mapper.Map(item, itemViewModel);
            return Ok(itemViewModel);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteItem([FromRoute] string id)
        {
            var item = await inventoryProvider.GetItem(id);
            if (item == null) return NotFound("Not found");
            await inventoryProvider.DeleteItem(item);
            return Ok(id);
        }
    }
}