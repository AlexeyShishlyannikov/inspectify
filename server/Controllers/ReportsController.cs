using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.BusinessLayer;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using server.ViewModels;

namespace server.Controllers
{
    [Route("api/report")]
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
        public async Task<IActionResult> DeleteReport([FromQuery] string id)
        {
            await reportsProvider.DeleteReport(id);
            return Ok(id);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetReport([FromQuery] string id)
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
        public async Task<IActionResult> GetReports([FromQuery] string teamId, [FromQuery] string vehicleId, [FromQuery] DateTime? since, [FromQuery] DateTime? to)
        {
            var reports = await reportsProvider.GetReports(teamId, since, to, vehicleId);
            var reportViewModelList = reports.Select(r => mapper.Map<ReportViewModel>(r)).ToList();
            return Ok(reportViewModelList);
        }
    }
}