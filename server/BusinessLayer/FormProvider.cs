using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logistics.DAL;
using Logistics.Models;
using Microsoft.EntityFrameworkCore;

namespace Logistics.BusinessLayer
{
    public class FormProvider : IFormProvider
    {
        private readonly LogisticsDbContext dbContext;

        public FormProvider(LogisticsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<ReportForm> AddForm(ReportForm form)
        {
            await dbContext.Forms.AddAsync(form);
            return form;
        }

        public async Task<ReportFormInput> AddFormInput(ReportFormInput input)
        {
            await dbContext.FormInputs.AddAsync(input);
            return input;
        }

        public async Task DeleteForm(int id)
        {
            var form = await dbContext.Forms.FirstOrDefaultAsync(f => f.Id == id);
            if (form != null)
            {
                dbContext.Forms.Remove(form);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteFormInput(int id)
        {
            var formInput = await dbContext.FormInputs.FirstOrDefaultAsync(f => f.Id == id);
            if (formInput != null)
            {
                dbContext.FormInputs.Remove(formInput);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<ReportForm> GetForm(int id)
        {
            var form = await dbContext.Forms
                .Where(f => f.Id == id)
                .Include(f => f.Inputs)
                    .ThenInclude(i => i.Value)
                .FirstOrDefaultAsync();
            return form;
        }

        public async Task<ReportFormInput> GetFormInput(int id)
        {
            return await dbContext.FormInputs
                .Where(i => i.Id == id)
                .Include(i => i.Value)
                .FirstOrDefaultAsync();
        }

        public async Task<List<ReportFormInput>> GetFormInputs(int formId)
        {
            return await dbContext.FormInputs
                .Where(i => i.FormId == formId)
                .Include(i => i.Value)
                .ToListAsync();
        }

        public async Task<List<ReportForm>> GetForms(int teamId, string searchTerm)
        {
            var form = dbContext.Forms.Where(f => f.TeamId == teamId);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                form = form.Where(f => f.Name == searchTerm);
            }
            return await form.ToListAsync();
        }

        public async Task<ReportForm> UpdateForm(ReportForm form)
        {
            var dbForm = dbContext.Forms.FirstOrDefaultAsync(f => f.Id == form.Id);
            if (dbForm != null)
            {
                dbContext.Update(dbForm);
                await dbContext.SaveChangesAsync();
            }
            return null;
        }

        public async Task<ReportFormInput> UpdateFormInput(ReportFormInput input)
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
