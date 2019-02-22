using Logistics.Models;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface ICompaniesProvider
    {
        Task<Company> AddCompany(Company company);
        Task<Company> GetCompany(string companyId);
        Task<Company> GetCompanyByPersonId(string personId);
        Task<Company> UpdateCompany(Company company);
        Task DeleteCompany(Company company);
    }
}
