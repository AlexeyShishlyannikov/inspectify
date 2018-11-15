using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Mvc;

namespace Logistics.Controllers
{
    [Route("team")]
    public class TeamController : Controller
    {
        private readonly ITeamProvider teamProvider;

        public TeamController(ITeamProvider teamProvider)
        {
            this.teamProvider = teamProvider;
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> AddTeam(Team team)
        {
            return Ok(await teamProvider.AddTeam(team));
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteTeam(int id)
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
                Ok(team);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("getTeams")]
        public async Task<IActionResult> GetTeams(string companyName, string searchTerm)
        {
            return Ok(await teamProvider.GetTeams(companyName, searchTerm));
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateTeam(Team team)
        {
            var dbTeam = await teamProvider.UpdateTeam(team);
            if (dbTeam != null)
            {
                return Ok(dbTeam);
            }
            return NotFound();
        }
    }
}