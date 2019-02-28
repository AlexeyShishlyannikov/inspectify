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
        public async Task<IActionResult> GetUsersForCompany([FromQuery] string searchTerm) {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var users = await usersProvider.GetUsersForCompany(companyId, searchTerm);
            return Ok(users);
        }

        [Route("remove")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> RemoveUserFromCompany(string userId)
        {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var user = await usersProvider.GetPerson(userId);
            if (user == null) {
                return NotFound("User not found");
            }
            await usersProvider.RemoveUser(user);
            return Ok();
        }
    }
}