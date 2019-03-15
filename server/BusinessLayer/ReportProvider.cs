using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inspectify.DAL;
using Inspectify.Models;
using Microsoft.EntityFrameworkCore;

namespace Inspectify.BusinessLayer
{
    public interface IReportsProvider
    {
        Task<Report> AddReport(Report report);
        Task<Report> UpdateReport(Report report);
        Task DeleteReport(Report report);
        Task<Report> GetReport(string id);
        Task<List<Report>> GetReports(string companyId, string teamId, string personId, string itemId, string formId, DateTime? from, DateTime? to);
    }

    public class ReportProvider : IReportsProvider
    {
        private readonly InspectifyDbContext dbContext;

        public ReportProvider(InspectifyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Report> AddReport(Report report)
        {
            await dbContext.Reports.AddAsync(report);
            await dbContext.SaveChangesAsync();
            return report;
        }

        public async Task<Report> GetReport(string id)
        {
            return await dbContext.Reports
                .Include(r => r.Form)
                .Include(r => r.Item)
                .Include(r => r.Person)
                .Include(r => r.Values)
                .SingleOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Report>> GetReports(
            string companyId,
            string teamId,
            string personId,
            string itemId,
            string formId,
            DateTime? from,
            DateTime? to)
        {
            var reports = dbContext.Reports
                .Include(r => r.Person)
                .Include(r => r.Item)
                .Include(r => r.Form)
                .Include(r => r.Values)
                .AsQueryable();
            if (from != null)
            {
                reports = reports.Where(t => t.DateCreated.CompareTo(from) >= 0);
            }
            if (to != null)
            {
                reports = reports.Where(t => t.DateCreated.CompareTo(to) < 0);
            }
            if (!String.IsNullOrEmpty(companyId))
            {
                reports = reports.Where(t => t.Person.CompanyId == companyId);
            }
            if (!String.IsNullOrEmpty(teamId))
            {
                reports = reports.Where(t => t.Person.TeamId == teamId);
            }
            if (!String.IsNullOrEmpty(personId))
            {
                reports = reports.Where(t => t.PersonId == personId);
            }
            if (!String.IsNullOrEmpty(itemId))
            {
                reports = reports.Where(t => t.ItemId == itemId);
            }
            if (!String.IsNullOrEmpty(formId))
            {
                reports = reports.Where(t => t.FormId == formId);
            }
            return await reports.ToListAsync();
        }

        public async Task<Report> UpdateReport(Report report)
        {
            dbContext.Reports.Update(report);
            await dbContext.SaveChangesAsync();
            return report;
        }

        public async Task DeleteReport(Report report)
        {

            dbContext.Reports.Remove(report);
            await dbContext.SaveChangesAsync();
        }
    }
}
