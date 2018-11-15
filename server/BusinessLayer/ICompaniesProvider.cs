using Logistics.Models;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface ICompaniesProvider
    {
        Task<Company> AddCompany(Company company);
        Task<Company> GetCompany(string searchTerm);
        Task<Company> UpdateCompany(Company company);
        Task DeleteCompany(Company company);
    }
}
