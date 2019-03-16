using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inspectify.DAL;
using Inspectify.Models;
using Microsoft.EntityFrameworkCore;

namespace Inspectify.BusinessLayer
{
    public interface IFormProvider
    {
        Task<Form> AddForm(Form form);
        Task<Form> GetForm(string id);
        Task<List<Form>> SearchForms(string companyId, string searchTerm);
        Task<Form> UpdateForm(Form form);
        Task<Form> DeactivateForm(Form form);
        Task DeleteForm(Form form);
    }

    public class FormProvider : IFormProvider
    {
        private readonly InspectifyDbContext dbContext;

        public FormProvider(InspectifyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Form> AddForm(Form form)
        {
            await dbContext.Forms.AddAsync(form);
            await dbContext.SaveChangesAsync();
            return form;
        }

        public async Task<Form> GetForm(string id)
        {
            return await dbContext.Forms
                .Include(f => f.Fields)
                    .ThenInclude(f => f.Options)
                .SingleOrDefaultAsync(f => f.Id == id);
        }

        public async Task<List<Form>> SearchForms(string companyId, string searchTerm)
        {
            var forms = dbContext.Forms.Where(f => f.CompanyId == companyId);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                forms = forms.Where(f => f.Name == searchTerm);
            }
            return await forms
                .Include(f => f.Fields)
                    .ThenInclude(f => f.Options)
                .ToListAsync();
        }

        public async Task<Form> UpdateForm(Form form)
        {
            dbContext.Update(form);
            await dbContext.SaveChangesAsync();
            return form;
        }

        public async Task<Form> DeactivateForm(Form form)
        {
            form.IsArchived = true;
            form = await UpdateForm(form);
            return form;
        }

        public async Task DeleteForm(Form form)
        {
            dbContext.Forms.Remove(form);
            await dbContext.SaveChangesAsync();
        }
    }
}
