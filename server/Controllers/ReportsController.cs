using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Mvc;

namespace Logistics.Controllers
{
    [Route("report")]
    public class ReportsController : Controller
    {
        private readonly IReportsProvider reportsProvider;

        public ReportsController(IReportsProvider reportsProvider)
        {
            this.reportsProvider = reportsProvider;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddReport([FromBody] Report report)
        {
            return Ok(await reportsProvider.AddReport(report));
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteReport([FromQuery] int id)
        {
            await reportsProvider.DeleteReport(id);
            return Ok(id);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetReport([FromQuery] int id)
        {
            var report = await reportsProvider.GetReport(id);
            if (report != null)
            {
                return Ok(report);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("getReports")]
        public async Task<IActionResult> GetReports([FromQuery] int teamId, [FromQuery] int? vehicleId, [FromQuery] DateTime? since, [FromQuery] DateTime? to)
        {
            var reports = await reportsProvider.GetReports(teamId, vehicleId, since, to);
            return Ok(reports);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateReport([FromBody] Report report)
        {
            return Ok(await reportsProvider.UpdateReport(report));
        }
    }
}