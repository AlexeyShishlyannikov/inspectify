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
        Task DeleteReport(int id);
        Task<Report> GetReport(int id);
        Task<List<Report>> GetReports(int teamId, int? vehicleId, DateTime? since, DateTime? to);
    }
}
