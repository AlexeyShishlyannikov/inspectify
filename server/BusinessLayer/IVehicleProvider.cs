using System.Collections.Generic;
using System.Threading.Tasks;
using Logistics.Models;

namespace Logistics.BusinessLayer {
    public interface IVehicleProvider {
        Task<List<VehicleMake>> GetMakes (string searchTerm);
        Task<VehicleMake> GetMake (int makeId);
        Task<List<VehicleModel>> GetModels (int makeId, string searchTerm);
        Task<VehicleModel> GetModel (int modelId);
        Task<List<Vehicle>> GetVehicles (int teamId, string searchTerm);
        Task<Vehicle> GetVehicle (int id);
        Task<Vehicle> AddVehicle (Vehicle vehicle);
        Task<Vehicle> EditVehicle (Vehicle vehicle);
        Task DeleteVehicle (int id);
    }
}