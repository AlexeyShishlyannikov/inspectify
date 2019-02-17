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
    [Route("team")]
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
        [Route("Add")]
        public async Task<IActionResult> AddTeam(TeamViewModel teamViewModel)
        {
            var team = mapper.Map<Team>(teamViewModel);
            team = await teamProvider.AddTeam(team);
            teamViewModel = mapper.Map<TeamViewModel>(team);
            return Ok(teamViewModel);
        }

        [HttpDelete]
        [Route("delete/{{id}}")]
        public async Task<IActionResult> DeleteTeam([FromQuery]int id)
        {
            await teamProvider.DeleteTeam(id);
            return Ok(id);
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetTeam(int teamId)
        {
            var team = await teamProvider.GetTeam(teamId);
            if (team != null)
            {
                var teamViewModel = mapper.Map<TeamViewModel>(team);
                Ok(teamViewModel);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("getTeams")]
        public async Task<IActionResult> GetTeams(string companyName, string searchTerm)
        {
            var teams = await teamProvider.GetTeams(companyName, searchTerm);
            var teamViewModelList = teams.Select(t => mapper.Map<TeamViewModel>(t)).ToList();
            return Ok(teamViewModelList);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateTeam(Team team)
        {
            var dbTeam = await teamProvider.UpdateTeam(team);
            if (dbTeam != null)
            {
                var dbTeamViewModel = mapper.Map<TeamViewModel>(dbTeam);
                return Ok(dbTeamViewModel);
            }
            return NotFound();
        }
    }
}