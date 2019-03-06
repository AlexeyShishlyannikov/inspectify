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
        Task DeleteReport(string id);
        Task<Report> GetReport(string id);
        Task<List<Report>> GetReports(string teamId, DateTime? since, DateTime? to, string vehicleId = null);
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

        public async Task DeleteReport(string id)
        {
            var report = await dbContext.Reports.FindAsync(id);
            if (report != null)
            {
                dbContext.Reports.Remove(report);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<Report> GetReport(string id)
        {
            return await dbContext.Reports
                .Where(r => r.Id == id)
                .Include(r => r.Form)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Report>> GetReports(string teamId, DateTime? since, DateTime? to, string vehicleId = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Report> UpdateReport(Report report)
        {
            var dbReport = await dbContext.Reports.FirstOrDefaultAsync(r => report.Id == r.Id);
            if (dbReport != null)
            {
                dbContext.Reports.Update(report);
                await dbContext.SaveChangesAsync();
                return report;
            }
            return null;
        }
    }
}
