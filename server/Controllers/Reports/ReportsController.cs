using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Inspectify.BusinessLayer;
using Inspectify.Models;
using Microsoft.AspNetCore.Mvc;
using Inspectify.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace Inspectify.Controllers
{
    [Route("api/reports")]
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
        [Authorize]
        public async Task<IActionResult> AddReport([FromBody] ReportViewModel reportViewModel)
        {
            var report = mapper.Map<ReportViewModel, Report>(reportViewModel);
            report = await reportsProvider.AddReport(report);
            reportViewModel = mapper.Map<ReportViewModel>(report);
            return Ok(reportViewModel);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateReport([FromBody] ReportViewModel reportViewModel)
        {
            var report = mapper.Map<Report>(reportViewModel);
            report = await reportsProvider.UpdateReport(report);
            reportViewModel = mapper.Map<ReportViewModel>(report);
            return Ok(reportViewModel);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteReport([FromRoute] string id)
        {
            var report = await reportsProvider.GetReport(id);
            if (report == null)
            {
                return NotFound("Report not found");
            }
            await reportsProvider.DeleteReport(report);
            return Ok(id);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> GetReport([FromRoute] string id)
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
        [Authorize]
        public async Task<IActionResult> GetReports(
            [FromQuery] string teamId,
            [FromQuery] string personId,
            [FromQuery] string itemId,
            [FromQuery] string formId
        )
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var reports = await reportsProvider.GetReports(
                companyId: companyId,
                teamId: teamId,
                personId: personId,
                itemId: itemId,
                formId: formId,
                from: null,
                to: null
            );
            var reportViewModelList = mapper.Map<List<ReportViewModel>>(reports);
            return Ok(reportViewModelList);
        }
    }
}