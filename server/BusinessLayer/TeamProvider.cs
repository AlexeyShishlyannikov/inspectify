using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logistics.DAL;
using Logistics.Models;
using Microsoft.EntityFrameworkCore;

namespace Logistics.BusinessLayer
{
    public class TeamProvider : ITeamProvider
    {
        private readonly LogisticsDbContext dbContext;

        public TeamProvider(LogisticsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Team> AddTeam(Team team)
        {
            await dbContext.Teams.AddAsync(team);
            await dbContext.SaveChangesAsync();
            return team;
        }

        public async Task DeleteTeam(int id)
        {
            var team = await dbContext.Teams.FirstOrDefaultAsync(t => t.Id == id);
            if (team != null)
            {
                dbContext.Teams.Remove(team);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<Team> GetTeam(int teamId)
        {
            return await dbContext.Teams.FindAsync(teamId);
        }

        public async Task<List<Team>> GetTeams(string companyName, string searchTerm)
        {
            var teams = dbContext.Teams
                .Where(team => team.Name == companyName);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                teams = teams.Where(team => team.Name.Contains(searchTerm));
            }
            return await teams.ToListAsync();
        }

        public async Task<Team> UpdateTeam(Team team)
        {
            var dbTeam = await dbContext.Teams.SingleOrDefaultAsync(t => t.Id == team.Id);
            if (dbTeam != null)
            {
                dbContext.Teams.Update(team);
                await dbContext.SaveChangesAsync();
                return team;
            }
            return null;
        }
    }
}
