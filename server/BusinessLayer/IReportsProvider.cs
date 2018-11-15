using Logistics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface IReportsProvider
    {
        Task<VehicleReport> AddReport(VehicleReport report);
        Task<VehicleReport> UpdateReport(VehicleReport report);
        Task DeleteReport(int id);
        Task<VehicleReport> GetReport(int id);
        Task<List<VehicleReport>> GetReports(int teamId, int? vehicleId, DateTime? since, DateTime? to);
    }
}
