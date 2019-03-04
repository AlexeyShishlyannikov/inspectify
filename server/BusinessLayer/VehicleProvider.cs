﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inspectify.DAL;
using Inspectify.Models;
using Microsoft.EntityFrameworkCore;

namespace Inspectify.BusinessLayer
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

    public class VehicleProvider : IVehicleProvider
    {
        private readonly LogisticsDbContext dbContext;

        public VehicleProvider(LogisticsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Vehicle> AddVehicle(Vehicle vehicle)
        {
            await dbContext.Vehicles.AddAsync(vehicle);
            await dbContext.SaveChangesAsync();
            return vehicle;
        }

        public async Task DeleteVehicle(string id)
        {
            var vehicle = await dbContext.Vehicles.FirstOrDefaultAsync(v => v.Id == id);
            dbContext.Vehicles.Remove(vehicle);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Vehicle> EditVehicle(Vehicle vehicle)
        {
            var dbVehicle = await dbContext.Vehicles.FirstOrDefaultAsync(v => v.Id == vehicle.Id);
            if (dbVehicle != null)
            {
                dbContext.Vehicles.Update(vehicle);
                await dbContext.SaveChangesAsync();
                return vehicle;
            }
            return null;
        }

        public async Task<VehicleMake> GetMake(string makeId)
        {
            var make = await dbContext.VehicleMarks
                .Where(m => m.Id == makeId)
                .Include(m => m.Models)
                .FirstOrDefaultAsync();
            return make;
        }

        public async Task<List<VehicleMake>> GetMakes(string searchTerm)
        {
            var dbMakes = dbContext.VehicleMarks.AsQueryable();
            if (!String.IsNullOrEmpty(searchTerm))
            {
                dbMakes = dbMakes.Where(m => m.Name.Contains(searchTerm));
            }
            var makes = await dbMakes
                .Include(m => m.Models)
                .ToListAsync();
            return makes;
        }

        public async Task<VehicleModel> GetModel(string modelId)
        {
            return await dbContext.VehicleModels
                .Where(m => m.Id == modelId)
                .Include(m => m.Make)
                .FirstOrDefaultAsync();
        }

        public async Task<List<VehicleModel>> GetModels(string makeId, string searchTerm)
        {
            var dbModels = dbContext.VehicleModels.Where(m => m.MakeId == makeId);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                dbModels = dbModels.Where(m => m.Name.Contains(searchTerm));
            }
            return await dbModels.Include(m => m.Make).ToListAsync();
        }

        public async Task<Vehicle> GetVehicle(string id)
        {
            return await dbContext.Vehicles
                .Where(v => v.Id == id)
                .Include(v => v.Model)
                    .ThenInclude(v => v.Make)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Vehicle>> GetVehicles(string teamId, string searchTerm)
        {
            var dbVehicles = dbContext.Vehicles.Where(m => m.TeamId == teamId);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                dbVehicles = dbVehicles.Where(m => m.Name.Contains(searchTerm));
            }
            return await dbVehicles
                .Include(v => v.Model)
                    .ThenInclude(v => v.Make)
                .ToListAsync();
        }
    }
}
