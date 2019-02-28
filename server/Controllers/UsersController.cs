using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.BusinessLayer;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using server.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace server.Controllers
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
        public async Task<IActionResult> GetUser()
        {
            var userId = this.User.Claims.SingleOrDefault(c => c.Type == "userId").Value;
            var person = await usersProvider.GetPersonByApplicationUserId(userId);
            if (person == null) return NotFound("User not found");
            return Ok(person);
        }

        [Route("update")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] Person person)
        {
            var user = await usersProvider.GetPerson(person.Id);
            if (user == null)
            {
                return NotFound("User not found");
            }
            await usersProvider.UpdatePerson(person);
            return Ok(person);
        }

        [Route("remove")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> RemoveUserFromCompany([FromQuery]string userId)
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
    }
}