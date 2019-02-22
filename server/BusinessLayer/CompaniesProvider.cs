using Logistics.DAL;
using Logistics.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public class CompaniesProvider : ICompaniesProvider
    {
        private readonly LogisticsDbContext dbContext;

        public CompaniesProvider(LogisticsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Company> AddCompany(Company company)
        {
            await dbContext.Companies.AddAsync(company);
            await dbContext.SaveChangesAsync();
            return company;
        }

        public async Task DeleteCompany(Company company)
        {
            dbContext.Companies.Remove(company);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Company> GetCompany(string companyId)
        {
            return await dbContext.Companies.SingleOrDefaultAsync(c => c.Id == companyId);
        }

        public async Task<Company> GetCompanyByPersonId(string personId)
        {
            var person = await dbContext.Persons.Where(p => p.Id == personId)
                .Include(p => p.Company).SingleOrDefaultAsync();
            if (person != null)
            {
                return person.Company;
            }
            return await dbContext.Companies.SingleOrDefaultAsync(c => c.ApplicationUserId == personId);
        }

        public async Task<Company> UpdateCompany(Company company)
        {
            var dbCompany = await dbContext.Companies.SingleOrDefaultAsync(c => c.Id == company.Id);
            if (dbCompany != null)
            {
                dbContext.Companies.Update(company);
                await dbContext.SaveChangesAsync();
                return company;
            }
            return null;
        }
    }
}
