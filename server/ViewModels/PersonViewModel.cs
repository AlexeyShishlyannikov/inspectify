using server.Models;

namespace server.ViewModels
{
    public class PersonViewModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Team Team { get; set; }
    }
}