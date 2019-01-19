namespace Logistics.Models
{
    public class PersonTeam
    {
        public int PersonId { get; set; }
        public Person Person { get; set; }
        public int TeamId { get; set; }
        public Team Team { get; set; }
    }
}