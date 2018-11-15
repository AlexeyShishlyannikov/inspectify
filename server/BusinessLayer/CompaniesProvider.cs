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

        public async Task<Company> GetCompany(string searchTerm)
        {
            return await dbContext.Companies.SingleOrDefaultAsync(company => company.Name.Contains(searchTerm));
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
