using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.DAL;
using server.Models;


namespace server.BusinessLayer
{
    public class UsersProvider : IUsersProvider
    {
        private readonly LogisticsDbContext dbContext;
        public UsersProvider(
            LogisticsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Person> GetPerson(string id)
        {
            return await dbContext.Persons.SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Person> GetPersonByApplicationUserId(string id)
        {
            return await dbContext.Persons.SingleOrDefaultAsync(p => p.ApplicationUserId == id);
        }

        public async Task<List<Person>> GetUsersForCompany(string companyId, string searchTerm)
        {
            var users = dbContext.Persons.Where(p => p.CompanyId == companyId);
            if (searchTerm != null) {
                users.Where(p => p.FirstName.Contains(searchTerm) || p.LastName.Contains(searchTerm));
            }
            return await users.ToListAsync();
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