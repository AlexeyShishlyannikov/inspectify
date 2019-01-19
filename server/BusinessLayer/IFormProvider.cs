using Logistics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface IFormProvider
    {
        Task<Form> AddForm(Form form);
        Task<Form> UpdateForm(Form form);
        Task<Form> GetForm(int id);
        Task<List<Form>> GetForms(int teamId, string searchTerm);
        Task DeleteForm(int id);

        Task<FormInput> AddFormInput(FormInput input);
        Task<FormInput> UpdateFormInput(FormInput input);
        Task<FormInput> GetFormInput(int id);
        Task<List<FormInput>> GetFormInputs(int formId);
        Task DeleteFormInput(int id);
    }
}
