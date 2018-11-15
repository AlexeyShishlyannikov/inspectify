using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface IRolesProvider
    {
        Task UpdateRole(string userId);
        Task GetRole(string userId);
    }
}
