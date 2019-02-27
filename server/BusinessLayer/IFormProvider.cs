using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.BusinessLayer
{
    public interface IFormProvider
    {
        Task<Form> AddForm(Form form);
        Task<Form> UpdateForm(Form form);
        Task<Form> GetForm(string id);
        Task<List<Form>> GetForms(string teamId, string searchTerm);
        Task DeleteForm(string id);

        Task<FormInput> AddFormInput(FormInput input);
        Task<FormInput> UpdateFormInput(FormInput input);
        Task<FormInput> GetFormInput(string id);
        Task<List<FormInput>> GetFormInputs(string formId);
        Task DeleteFormInput(string id);
    }
}
