using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logistics.DAL;
using Logistics.Models;
using Microsoft.EntityFrameworkCore;

namespace Logistics.BusinessLayer
{
    public class ReportProvider : IReportsProvider
    {
        private readonly LogisticsDbContext dbContext;

        public ReportProvider(LogisticsDbContext dbContext)
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
            var teamReports = dbContext.ReportTeams.Where(tr => tr.TeamId == teamId);
            var reports = dbContext.Reports.Where(r => teamReports.FirstOrDefault(tr => tr.ReportId == r.Id) != null);
            if (vehicleId != null) reports.Where(r => r.VehicleId == vehicleId);
            if (since != null) reports.Where(r => r.DateCreated > since);
            if (to != null) reports.Where(r => r.DateCreated < to);

            return await reports.ToListAsync();
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
