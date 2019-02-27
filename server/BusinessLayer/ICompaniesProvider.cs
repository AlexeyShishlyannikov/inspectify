using server.Models;
using System.Threading.Tasks;

namespace server.BusinessLayer
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
