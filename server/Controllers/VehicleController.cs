using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Mvc;

namespace Logistics.Controllers
{
    [Route("vehicle")]
    public class VehicleController : Controller
    {
        private readonly IVehicleProvider vehicleProvider;

        public VehicleController(IVehicleProvider vehicleProvider)
        {
            this.vehicleProvider = vehicleProvider;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddVehicle(Vehicle vehicle)
        {
            return Ok(await vehicleProvider.AddVehicle(vehicle));
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            await vehicleProvider.DeleteVehicle(id);
            return Ok(id);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> EditVehicle(Vehicle vehicle)
        {
            var dbVehicle = await vehicleProvider.EditVehicle(vehicle);
            if (dbVehicle != null)
            {
                return Ok(dbVehicle);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("make/get")]
        public async Task<IActionResult> GetMake(int makeId)
        {
            var make = await vehicleProvider.GetMake(makeId);
            if (make != null)
            {
                return Ok(make);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("make/getMakes")]
        public async Task<IActionResult> GetMakes(string searchTerm)
        {
            return Ok(await vehicleProvider.GetMakes(searchTerm));
        }

        [HttpGet]
        [Route("model/get")]
        public async Task<IActionResult> GetModel(int modelId)
        {
            var model = await vehicleProvider.GetModel(modelId);
            if (model != null)
            {
                return Ok(model);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("model/getModels")]
        public async Task<IActionResult> GetModels(int makeId, string searchTerm)
        {
            return Ok(await vehicleProvider.GetModels(makeId, searchTerm));
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await vehicleProvider.GetVehicle(id);
            if (vehicle != null)
            {
                return Ok(vehicle);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("getVehicles")]
        public async Task<IActionResult> GetVehicles(int teamId, string searchTerm)
        {
            return Ok(await vehicleProvider.GetVehicles(teamId, searchTerm));
        }
    }
}