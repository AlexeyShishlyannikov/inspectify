using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inspectify.DAL;
using Inspectify.Models;
using Microsoft.EntityFrameworkCore;

namespace Inspectify.BusinessLayer
{
    public interface ITeamProvider
    {
        Task<Team> AddTeam(Team team);
        Task<Team> GetTeam(string teamId);
        Task<Team> GetTeamByPerson(string personId);
        Task<Team> UpdateTeam(Team team);
        Task DeleteTeam(Team team);
        Task<List<Team>> GetTeams(string companyId, string searchTerm);
    }

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

        public async Task DeleteTeam(Team team)
        {
            dbContext.Teams.Remove(team);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Team> GetTeam(string teamId)
        {
            return await dbContext.Teams.FindAsync(teamId);
        }

        public async Task<Team> GetTeamByPerson(string personId)
        {
            var personTeam = await dbContext.Persons
                .Where(pt => pt.Id == personId)
                .Include(pt => pt.Team)
                .Select(p => p.Team)
                .SingleOrDefaultAsync();
            return personTeam;
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

        public async Task<List<Team>> GetTeams(string companyId, string searchTerm)
        {
            var teams = dbContext.Teams.Where(team => team.CompanyId == companyId);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                teams = teams.Where(team => team.Name.Contains(searchTerm));
            }
            return await teams.ToListAsync();
        }
    }
}
