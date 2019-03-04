using Inspectify.Models;

namespace Inspectify.ViewModels
{
    public class PersonViewModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public TeamViewModel Team { get; set; }
    }
}