using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Mvc;
using server.ViewModels;

namespace Logistics.Controllers
{
    [Route("api/vehicle")]
    public class VehicleController : Controller
    {
        private readonly IVehicleProvider vehicleProvider;
        private readonly IMapper mapper;

        public VehicleController(IVehicleProvider vehicleProvider, IMapper mapper)
        {
            this.mapper = mapper;
            this.vehicleProvider = vehicleProvider;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddVehicle(VehicleViewModel vehicleViewModel)
        {
            var vehicle = mapper.Map<Vehicle>(vehicleViewModel);
            vehicle = await vehicleProvider.AddVehicle(vehicle);
            vehicleViewModel = mapper.Map<VehicleViewModel>(vehicle);
            return Ok(vehicleViewModel);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteVehicle(string id)
        {
            await vehicleProvider.DeleteVehicle(id);
            return Ok(id);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> EditVehicle(VehicleViewModel vehicleViewModel)
        {
            var vehicle = mapper.Map<Vehicle>(vehicleViewModel);
            var dbVehicle = await vehicleProvider.EditVehicle(vehicle);
            if (dbVehicle != null)
            {
                var dbVehicleViewModel = mapper.Map<Vehicle, VehicleViewModel>(dbVehicle);
                return Ok(dbVehicleViewModel);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("make/get")]
        public async Task<IActionResult> GetMake(string makeId)
        {
            var make = await vehicleProvider.GetMake(makeId);
            if (make != null)
            {
                var makeViewModel = mapper.Map<VehicleMakeViewModel>(make);
                return Ok(makeViewModel);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("make/getMakes")]
        public async Task<IActionResult> GetMakes(string searchTerm)
        {
            var makes = await vehicleProvider.GetMakes(searchTerm);
            var makeViewModelList = makes.Select(m => mapper.Map<VehicleMakeViewModel>(m)).ToList();
            return Ok(makeViewModelList);
        }

        [HttpGet]
        [Route("model/get")]
        public async Task<IActionResult> GetModel(string modelId)
        {
            var model = await vehicleProvider.GetModel(modelId);
            if (model != null)
            {
                var modelViewModel = mapper.Map<VehicleModelViewModel>(model);
                return Ok(modelViewModel);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("model/getModels")]
        public async Task<IActionResult> GetModels(string makeId, string searchTerm)
        {
            var models = await vehicleProvider.GetModels(makeId, searchTerm);
            var modelViewModelList = models.Select(m => mapper.Map<VehicleModelViewModel>(m)).ToList();
            return Ok(modelViewModelList);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetVehicle(string id)
        {
            var vehicle = await vehicleProvider.GetVehicle(id);
            if (vehicle != null)
            {
                var vehicleViewModel = mapper.Map<VehicleModelViewModel>(vehicle);
                return Ok(vehicleViewModel);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("getVehicles")]
        public async Task<IActionResult> GetVehicles(string teamId, string searchTerm)
        {
            var vehicles = await vehicleProvider.GetVehicles(teamId, searchTerm);
            var vehiclesViewModelList = vehicles.Select(v => mapper.Map<VehicleViewModel>(v)).ToList();
            return Ok(vehiclesViewModelList);
        }
    }
}