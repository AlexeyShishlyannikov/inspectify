﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DAL;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.BusinessLayer
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

        public async Task DeleteTeam(string id)
        {
            var team = await dbContext.Teams.FirstOrDefaultAsync(t => t.Id == id);
            if (team != null)
            {
                dbContext.Teams.Remove(team);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<Team> GetTeam(string teamId)
        {
            return await dbContext.Teams.FindAsync(teamId);
        }

        public async Task<Team> GetTeamByPerson(string personId)
        {
            var personTeam = await dbContext.PersonTeams
                .Where(pt => pt.PersonId == personId)
                .Include(pt => pt.Team)
                .SingleOrDefaultAsync();
            if (personTeam == null) {
                return null;
            }
            return personTeam.Team;
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
