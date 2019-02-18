using System.Collections.Generic;
using System.Threading.Tasks;
using Logistics.Models;

namespace Logistics.BusinessLayer
{
    public interface IVehicleProvider
    {
        Task<List<VehicleMake>> GetMakes(string searchTerm);
        Task<VehicleMake> GetMake(string makeId);
        Task<List<VehicleModel>> GetModels(string makeId, string searchTerm);
        Task<VehicleModel> GetModel(string modelId);
        Task<List<Vehicle>> GetVehicles(string teamId, string searchTerm);
        Task<Vehicle> GetVehicle(string id);
        Task<Vehicle> AddVehicle(Vehicle vehicle);
        Task<Vehicle> EditVehicle(Vehicle vehicle);
        Task DeleteVehicle(string id);
    }
}