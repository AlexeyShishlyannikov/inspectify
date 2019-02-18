using Logistics.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface ITeamProvider
    {
        Task<Team> AddTeam(Team team);
        Task<Team> GetTeam(string teamId);
        Task<Team> UpdateTeam(Team team);
        Task DeleteTeam(string id);
        Task<List<Team>> GetTeams(string companyName, string searchTerm);
    }
}
