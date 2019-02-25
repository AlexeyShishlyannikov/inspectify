using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Mvc;
using server.BusinessLayer;
using server.Models;
using server.ViewModels;

namespace Logistics.Controllers
{
    [Route("api/invitations")]
    public class InvitationController : Controller
    {
        private readonly IInvitationProvider invitationProvider;
        private readonly IEmailProvider emailProvider;
        private readonly IMapper mapper;

        public InvitationController(
            IInvitationProvider invitationProvider,
            IEmailProvider emailProvider,
            IMapper mapper)
        {
            this.mapper = mapper;
            this.emailProvider = emailProvider;
            this.invitationProvider = invitationProvider;
        }

        [Route("send")]
        [HttpPost]
        public async Task<IActionResult> SendInvitation(Invitation invitation)
        {
            if (await invitationProvider.CheckIfEmailIsInvited(invitation.Email) || await invitationProvider.CheckIfPhoneIsInvited(invitation.PhoneNumber))
            {
                return BadRequest("Has already been invited");
            }
            invitation.SentOn = DateTime.Now;
            var dbInvitation = await invitationProvider.AddInvitation(invitation);
            var isEmailSent = await emailProvider.SendInvitationEmail(dbInvitation);
            if (!isEmailSent) {
                return BadRequest("Email wasn't sent");
            }
            return Ok(dbInvitation);
        }

        [Route("getInvitations")]
        [HttpGet]
        public async Task<IActionResult> GetInvitations() {
            var companyId = this.User.Claims.SingleOrDefault(c => c.Type == "companyId").Value;
            var invitations = await invitationProvider.GetInvitations(companyId);
            return Ok(invitations);
        }

        [Route("update")]
        [HttpPost]
        public async Task<IActionResult> UpdateInvitations(Invitation invitation)
        {
            var dbInvitation = await invitationProvider.GetInvitation(invitation.Id);
            if (dbInvitation != null) {
                return NotFound("Invitation not found");
            }
            invitation.SentOn = DateTime.Now;
            var updatedInvitation = await invitationProvider.UpdateInvitation(invitation);
            var isEmailSent = await emailProvider.SendInvitationEmail(dbInvitation);
            if (!isEmailSent)
            {
                return BadRequest("Email wasn't sent");
            }
            return Ok(updatedInvitation);
        }

        [Route("resend")]
        [HttpPost]
        public async Task<IActionResult> ResendInvitations([FromQuery]string id)
        {
            var dbInvitation = await invitationProvider.GetInvitation(id);
            if (dbInvitation != null)
            {
                return NotFound("Invitation not found");
            }
            var isEmailSent = await emailProvider.SendInvitationEmail(dbInvitation);
            if (!isEmailSent)
            {
                return BadRequest("Email wasn't sent");
            }
            dbInvitation.SentOn = DateTime.Now;
            var updatedInvitation = await invitationProvider.UpdateInvitation(dbInvitation);
            return Ok(updatedInvitation);
        }

        [Route("delete")]
        [HttpPost]
        public async Task<IActionResult> DeleteInvitations([FromQuery]string id)
        {
            var dbInvitation = await invitationProvider.GetInvitation(id);
            if (dbInvitation != null)
            {
                return NotFound("Invitation not found");
            }
            var deleted = await invitationProvider.DeleteInvitation(id);
            if (!deleted) return BadRequest("Could not delete invitation");
            return Ok();
        }
    }
}