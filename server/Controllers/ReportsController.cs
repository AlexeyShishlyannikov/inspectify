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
    [Route("report")]
    public class ReportsController : Controller
    {
        private readonly IReportsProvider reportsProvider;
        private readonly IMapper mapper;

        public ReportsController(IReportsProvider reportsProvider, IMapper mapper)
        {
            this.reportsProvider = reportsProvider;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddReport([FromBody] ReportViewModel reportViewModel)
        {
            var report = mapper.Map<ReportViewModel, Report>(reportViewModel);
            report = await reportsProvider.AddReport(report);
            reportViewModel = mapper.Map<ReportViewModel>(report);
            return Ok(reportViewModel);
        }
        
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateReport([FromBody] ReportViewModel reportViewModel)
        {
            var report = mapper.Map<Report>(reportViewModel);
            report = await reportsProvider.UpdateReport(report);
            reportViewModel = mapper.Map<ReportViewModel>(report);
            return Ok(reportViewModel);
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
                var reportViewModel = mapper.Map<ReportViewModel>(report);
                return Ok(reportViewModel);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("getReports")]
        public async Task<IActionResult> GetReports([FromQuery] int teamId, [FromQuery] int? vehicleId, [FromQuery] DateTime? since, [FromQuery] DateTime? to)
        {
            var reports = await reportsProvider.GetReports(teamId, vehicleId, since, to);
            var reportViewModelList = reports.Select(r => mapper.Map<ReportViewModel>(r)).ToList();
            return Ok(reportViewModelList);
        }
    }
}