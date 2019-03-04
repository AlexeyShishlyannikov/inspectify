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
using Microsoft.AspNetCore.Identity;

namespace Inspectify.Controllers
{
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly IUsersProvider usersProvider;
        private readonly IMapper mapper;

        public UsersController(
            IUsersProvider usersProvider,
            IMapper mapper)
        {
            this.mapper = mapper;
            this.usersProvider = usersProvider;
        }

        [Route("company")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUsersForCompany([FromQuery] string searchTerm)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var users = await usersProvider.GetUsersForCompany(companyId, searchTerm);
            return Ok(users);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUser([FromQuery] string id)
        {
            var person = await usersProvider.GetPersonByApplicationUserId(id);
            if (person == null) return NotFound("User not found");
            var personViewModel = mapper.Map<Person, PersonViewModel>(person);
            return Ok(personViewModel);
        }

        [Route("update")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] PersonViewModel personViewModel)
        {
            var dbPerson = await usersProvider.GetPerson(personViewModel.Id);
            if (dbPerson == null) return NotFound("User not found");
            mapper.Map<PersonViewModel, Person>(personViewModel, dbPerson);
            await usersProvider.UpdatePerson(dbPerson);
            var dbPersonViewModel = mapper.Map<Person, PersonViewModel>(dbPerson);
            return Ok(dbPersonViewModel);
        }

        [Route("remove")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> RemoveUser([FromQuery] string userId)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var user = await usersProvider.GetPerson(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            await usersProvider.RemoveUser(user);
            return Ok(userId);
        }

        [Route("team/{teamId}")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUsersForTeam(string teamId, [FromQuery] string searchTerm)
        {
            var teamMembers = await usersProvider.GetUsersForTeam(teamId, searchTerm);
            var teamMembersViewModels = mapper.Map<List<PersonViewModel>>(teamMembers);
            return Ok(teamMembersViewModels);
        }
    }
}