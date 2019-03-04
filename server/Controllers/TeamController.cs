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
    [Route("api/team")]
    public class TeamController : Controller
    {
        private readonly ITeamProvider teamProvider;
        private readonly IMapper mapper;

        public TeamController(ITeamProvider teamProvider, IMapper mapper)
        {
            this.mapper = mapper;
            this.teamProvider = teamProvider;
        }

        [HttpPost]
        [Route("add")]
        [Authorize]
        public async Task<IActionResult> AddTeam([FromBody] TeamViewModel teamViewModel)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var team = mapper.Map<Team>(teamViewModel);
            team.CompanyId = companyId;
            team = await teamProvider.AddTeam(team);
            teamViewModel = mapper.Map<TeamViewModel>(team);
            return Ok(teamViewModel);
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> GetTeam(string id)
        {
            var team = await teamProvider.GetTeam(id);
            if (team == null)
            {
                return NotFound();
            }
            var teamViewModel = mapper.Map<TeamViewModel>(team);
            return Ok(teamViewModel);
        }

        [HttpGet]
        [Route("getTeams")]
        [Authorize]
        public async Task<IActionResult> GetTeams([FromQuery] string searchTerm)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var teams = await teamProvider.GetTeams(companyId, searchTerm);
            var teamViewModelList = mapper.Map<List<TeamViewModel>>(teams);
            return Ok(teamViewModelList);
        }

        [HttpPost]
        [Route("update")]
        [Authorize]
        public async Task<IActionResult> UpdateTeam([FromBody] TeamViewModel teamViewModel)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var team = await teamProvider.GetTeam(teamViewModel.Id);
            if (team == null)
            {
                return NotFound("Team not found");
            }
            team = mapper.Map(teamViewModel, team);
            team = await teamProvider.UpdateTeam(team);
            teamViewModel = mapper.Map<TeamViewModel>(team);
            return Ok(teamViewModel);
        }


        [HttpDelete]
        [Route("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTeam(string id)
        {
            var team = await teamProvider.GetTeam(id);
            if (team == null)
            {
                return NotFound("Team not found");
            }
            await teamProvider.DeleteTeam(team);
            return Ok(id);
        }
    }
}