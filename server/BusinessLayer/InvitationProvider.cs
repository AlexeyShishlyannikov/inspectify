using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inspectify.DAL;
using Inspectify.Models;
using Microsoft.EntityFrameworkCore;
using Inspectify.BusinessLayer;

namespace Inspectify.BusinessLayer
{
    public interface IInvitationProvider
    {
        Task<Invitation> AddInvitation(Invitation invitation);
        Task<Invitation> GetInvitation(string id);
        Task<bool> CheckIfEmailIsInvited(string email);
        Task<Invitation> UpdateInvitation(Invitation invitation);
        Task<bool> DeleteInvitation(string id);
        Task<List<Invitation>> GetInvitations(string companyId);
    }
    
    public class InvitationProvider : IInvitationProvider
    {
        private readonly LogisticsDbContext dbContext;

        public InvitationProvider(LogisticsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Invitation> AddInvitation(Invitation invitation)
        {
            await dbContext.Invitations.AddAsync(invitation);
            await dbContext.SaveChangesAsync();
            return invitation;
        }

        public async Task<bool> CheckIfEmailIsInvited(string email)
        {
            var invitation = await dbContext.Invitations.SingleOrDefaultAsync(i => i.Email == email);
            return invitation != null;
        }

        public async Task<bool> DeleteInvitation(string id)
        {
            var invitation = await GetInvitation(id);
            if (invitation != null)
            {
                var deleted = dbContext.Invitations.Remove(invitation);
                await dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Invitation> GetInvitation(string id)
        {
            return await dbContext.Invitations.SingleOrDefaultAsync(i => i.Id == id);
        }

        public async Task<List<Invitation>> GetInvitations(string companyId)
        {
            return await dbContext.Invitations.Where(i => i.CompanyId == companyId).ToListAsync();
        }

        public async Task<Invitation> UpdateInvitation(Invitation invitation)
        {
            dbContext.Invitations.Update(invitation);
            await dbContext.SaveChangesAsync();
            return invitation;
        }
    }
}
