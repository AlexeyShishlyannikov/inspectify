using Logistics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface IReportsProvider
    {
        Task<Report> AddReport(Report report);
        Task<Report> UpdateReport(Report report);
        Task DeleteReport(string id);
        Task<Report> GetReport(string id);
        Task<List<Report>> GetReports(string teamId, DateTime? since, DateTime? to, string vehicleId = null);
    }
}
