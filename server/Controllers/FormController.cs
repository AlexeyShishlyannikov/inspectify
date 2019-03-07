using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Inspectify.BusinessLayer;
using Inspectify.Models;
using Microsoft.AspNetCore.Mvc;
using Inspectify.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace Inspectify.Controllers
{
    [Route("api/form")]
    public class FormController : Controller
    {
        private readonly IFormProvider formProvider;
        private readonly IMapper mapper;

        public FormController(IFormProvider formProvider, IMapper mapper)
        {
            this.formProvider = formProvider;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddForm([FromBody] FormViewModel formViewModel)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var form = mapper.Map<FormViewModel, Form>(formViewModel);
            form.CompanyId = companyId;
            form.Created = DateTime.Now;
            form = await formProvider.AddForm(form);
            formViewModel = mapper.Map<Form, FormViewModel>(form);
            return Ok(formViewModel);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> GetForm([FromRoute] string id)
        {
            var form = await formProvider.GetForm(id);
            var formViewModel = mapper.Map<Form, FormViewModel>(form);
            return Ok(formViewModel);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetForms([FromQuery] string searchTerm)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var forms = await formProvider.SearchForms(companyId, searchTerm);
            var formViewModelList = forms.Select(f => mapper.Map<Form, FormViewModel>(f));
            return Ok(formViewModelList);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateForm([FromBody] FormViewModel formViewModel)
        {
            var form = await formProvider.GetForm(formViewModel.Id);
            if (form == null) return NotFound("Form not found");
            mapper.Map<FormViewModel, Form>(formViewModel, form);
            await formProvider.UpdateForm(form);
            return Ok(mapper.Map<FormViewModel>(form));
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteForm([FromRoute] string id)
        {
            var form = await formProvider.GetForm(id);
            if (form == null)
            {
                return NotFound("Form not found");
            }
            await formProvider.DeleteForm(form);
            return Ok(id);
        }
    }
}