using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Mvc;

namespace Logistics.Controllers
{
    [Route("form")]
    public class FormController : Controller
    {
        private readonly IFormProvider formProvider;

        public FormController(IFormProvider formProvider)
        {
            this.formProvider = formProvider;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddForm([FromBody] ReportForm form)
        {
            form = await formProvider.AddForm(form);
            return Ok(form);
        }

        [HttpPost]
        [Route("input/add")]
        public async Task<IActionResult> AddFormInput([FromBody] ReportFormInput input)
        {
            input = await formProvider.AddFormInput(input);
            return Ok(input);
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
            return Ok(await formProvider.GetForm(id));
        }

        [HttpGet]
        [Route("input/get")]
        public async Task<IActionResult> GetFormInput([FromQuery] int id)
        {
            return Ok(await formProvider.GetFormInput(id));
        }

        [HttpGet]
        [Route("input/getForForm")]
        public async Task<IActionResult> GetFormInputs([FromQuery] int formId)
        {
            return Ok(await formProvider.GetFormInputs(formId));
        }

        [HttpGet]
        [Route("getForTeam")]
        public async Task<IActionResult> GetForms([FromQuery] int teamId, [FromQuery] string searchTerm)
        {
            return Ok(await formProvider.GetForms(teamId, searchTerm));
        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> UpdateForm([FromBody] ReportForm form)
        {
            form = await formProvider.UpdateForm(form);
            if (form != null)
            {
                return Ok(form);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("input/update")]
        public async Task<IActionResult> UpdateFormInput([FromBody] ReportFormInput input)
        {
            input = await formProvider.UpdateFormInput(input);
            if (input != null)
            {
                return Ok(input);
            }
            return NotFound();
        }
    }
}