using System.Collections.Generic;
using System.Threading.Tasks;
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
        Task RemoveUser(Person person);
    }
}