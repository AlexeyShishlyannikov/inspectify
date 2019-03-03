using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DAL;
using server.Models;
using Microsoft.EntityFrameworkCore;

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
    
    public class FormProvider : IFormProvider
    {
        private readonly LogisticsDbContext dbContext;

        public FormProvider(LogisticsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Form> AddForm(Form form)
        {
            await dbContext.Forms.AddAsync(form);
            return form;
        }

        public async Task<FormInput> AddFormInput(FormInput input)
        {
            await dbContext.FormInputs.AddAsync(input);
            return input;
        }

        public async Task DeleteForm(string id)
        {
            var form = await dbContext.Forms.FirstOrDefaultAsync(f => f.Id == id);
            if (form != null)
            {
                dbContext.Forms.Remove(form);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteFormInput(string id)
        {
            var formInput = await dbContext.FormInputs.FirstOrDefaultAsync(f => f.Id == id);
            if (formInput != null)
            {
                dbContext.FormInputs.Remove(formInput);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<Form> GetForm(string id)
        {
            var form = await dbContext.Forms
                .Where(f => f.Id == id)
                .Include(f => f.FormFormInputs)
                .FirstOrDefaultAsync();
            return form;
        }

        public async Task<FormInput> GetFormInput(string id)
        {
            return await dbContext.FormInputs
                .Where(i => i.Id == id)
                .Include(i => i.Value)
                .FirstOrDefaultAsync();
        }

        public async Task<List<FormInput>> GetFormInputs(string formId)
        {
            var formFormInputs = await dbContext.FormFormInputs
                .Where(ffi => ffi.FormId == formId).ToListAsync();
            return await dbContext.FormInputs
                .Where(fi => formFormInputs.Find(ffi => fi.Id == ffi.FormInputId) != null)
                .ToListAsync();
        }

        public async Task<List<Form>> GetForms(string teamId, string searchTerm)
        {
            var formTeams = dbContext.FormTeams.Where(ft => ft.TeamId == teamId);
            var forms = dbContext.Forms.Where(f => formTeams.FirstOrDefault(ft => ft.FormId == f.Id) != null);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                forms = forms.Where(f => f.Name == searchTerm);
            }
            return await forms.ToListAsync();
        }

        public async Task<Form> UpdateForm(Form form)
        {
            var dbForm = dbContext.Forms.FirstOrDefaultAsync(f => f.Id == form.Id);
            if (dbForm != null)
            {
                dbContext.Update(dbForm);
                await dbContext.SaveChangesAsync();
            }
            return null;
        }

        public async Task<FormInput> UpdateFormInput(FormInput input)
        {
            var dbFormInput = dbContext.FormInputs.FirstOrDefaultAsync(f => f.Id == input.Id);
            if (dbFormInput != null)
            {
                dbContext.Update(dbFormInput);
                await dbContext.SaveChangesAsync();
            }
            return null;
        }
    }
}
