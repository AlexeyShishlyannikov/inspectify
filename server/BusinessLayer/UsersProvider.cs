using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.DAL;
using server.Models;


namespace server.BusinessLayer
{
    public interface IUsersProvider
    {
        Task<Person> AddPerson(Person person);
        Task<Person> GetPerson(string id);
        Task<Person> GetPersonByApplicationUserId(string id);
        Task<Person> UpdatePerson(Person person);
        Task<List<Person>> GetUsersForCompany(string companyId, string searchTerm);
        Task<List<Person>> GetUsersForTeam(string teamId, string searchTerm);
        Task RemoveUser(Person person);
    }

    public class UsersProvider : IUsersProvider
    {
        private readonly LogisticsDbContext dbContext;
        public UsersProvider(
            LogisticsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Person> AddPerson(Person person)
        {
            await dbContext.AddAsync(person);
            await dbContext.SaveChangesAsync();
            return person;
        }

        public async Task<Person> GetPerson(string id)
        {
            return await dbContext.Persons.Include(p => p.Team).SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Person> GetPersonByApplicationUserId(string id)
        {
            return await dbContext.Persons.Include(p => p.Team).SingleOrDefaultAsync(p => p.ApplicationUserId == id);
        }

        public async Task<List<Person>> GetUsersForCompany(string companyId, string searchTerm)
        {
            var users = dbContext.Persons.Where(p => p.CompanyId == companyId);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                users.Where(p => p.FullName.Contains(searchTerm));
            }
            return await users.Include(p => p.Team).ToListAsync();
        }

        public async Task<List<Person>> GetUsersForTeam(string teamId, string searchTerm)
        {
            var users = dbContext.Persons.Where(pt => pt.TeamId == teamId)
                .AsQueryable();
            if (!String.IsNullOrEmpty(searchTerm))
            {
                searchTerm = searchTerm.Trim();
                users = users.Where(pt => pt.FullName.Contains(searchTerm));
            }
            return await users.Include(p => p.Team).ToListAsync();
        }

        public async Task RemoveUser(Person person)
        {
            dbContext.Remove(person);
            // deactivate instead to not lose data attached to user
            await dbContext.SaveChangesAsync();
        }

        public async Task<Person> UpdatePerson(Person person)
        {
            dbContext.Persons.Update(person);
            await dbContext.SaveChangesAsync();
            return person;
        }
    }
}