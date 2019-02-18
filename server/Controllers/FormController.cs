using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Mvc;
using server.ViewModels;

namespace Logistics.Controllers
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
        [Route("add")]
        public async Task<IActionResult> AddForm([FromBody] FormViewModel formViewModel)
        {
            var form = mapper.Map<FormViewModel, Form>(formViewModel);
            form = await formProvider.AddForm(form);
            formViewModel = mapper.Map<Form, FormViewModel>(form);
            return Ok(formViewModel);
        }

        [HttpPost]
        [Route("input/add")]
        public async Task<IActionResult> AddFormInput([FromBody] FormInputViewModel inputViewModel)
        {
            var input = mapper.Map<FormInputViewModel, FormInput>(inputViewModel);
            input = await formProvider.AddFormInput(input);
            inputViewModel = mapper.Map<FormInput, FormInputViewModel>(input);
            return Ok(inputViewModel);
        }
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteForm([FromQuery] int id)
        {
            await formProvider.DeleteForm(id);
            return Ok(id + "Deleted");
        }

        [HttpDelete]
        [Route("input/delete")]
        public async Task<IActionResult> DeleteFormInput([FromQuery] int id)
        {
            await formProvider.DeleteFormInput(id);
            return Ok(id + "Deleted");
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetForm([FromQuery] int id)
        {
            var form = await formProvider.GetForm(id);
            var formViewModel = mapper.Map<Form, FormViewModel>(form);
            return Ok(formViewModel);
        }

        [HttpGet]
        [Route("input/get")]
        public async Task<IActionResult> GetFormInput([FromQuery] int id)
        {
            var formInput = await formProvider.GetFormInput(id);
            var formInputViewModel = mapper.Map<FormInput, FormInputViewModel>(formInput);
            return Ok(formInputViewModel);
        }

        [HttpGet]
        [Route("input/getForForm")]
        public async Task<IActionResult> GetFormInputs([FromQuery] int formId)
        {
            var formInputs = await formProvider.GetFormInputs(formId);
            var formInputViewModelList = formInputs.Select(fi => mapper.Map<FormInput, FormInputViewModel>(fi)).ToList();
            return Ok(formInputViewModelList);
        }

        [HttpGet]
        [Route("getForTeam")]
        public async Task<IActionResult> GetForms([FromQuery] int teamId, [FromQuery] string searchTerm)
        {
            var forms = await formProvider.GetForms(teamId, searchTerm);
            var formViewModelList = forms.Select(f => mapper.Map<Form, FormViewModel>(f));
            return Ok(formViewModelList);
        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> UpdateForm([FromBody] FormViewModel formViewModel)
        {
            var form = mapper.Map<FormViewModel, Form>(formViewModel);
            form = await formProvider.UpdateForm(form);
            if (form != null)
            {
                return Ok(form);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("input/update")]
        public async Task<IActionResult> UpdateFormInput([FromBody] FormInputViewModel inputViewModel)
        {
            var input = mapper.Map<FormInputViewModel, FormInput>(inputViewModel);
            input = await formProvider.UpdateFormInput(input);
            if (input != null)
            {
                return Ok(input);
            }
            return NotFound();
        }
    }
}