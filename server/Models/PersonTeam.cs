namespace server.Models
{
    public class PersonTeam
    {
        public string PersonId { get; set; }
        public Person Person { get; set; }
        public string TeamId { get; set; }
        public Team Team { get; set; }
    }
}