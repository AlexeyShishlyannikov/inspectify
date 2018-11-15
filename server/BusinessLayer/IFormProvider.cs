using Logistics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface IFormProvider
    {
        Task<ReportForm> AddForm(ReportForm form);
        Task<ReportForm> UpdateForm(ReportForm form);
        Task<ReportForm> GetForm(int id);
        Task<List<ReportForm>> GetForms(int teamId, string searchTerm);
        Task DeleteForm(int id);

        Task<ReportFormInput> AddFormInput(ReportFormInput input);
        Task<ReportFormInput> UpdateFormInput(ReportFormInput input);
        Task<ReportFormInput> GetFormInput(int id);
        Task<List<ReportFormInput>> GetFormInputs(int formId);
        Task DeleteFormInput(int id);
    }
}
