using System.Collections.Generic;

namespace server.ViewModels
{
    public class VehicleViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Year { get; set; }
        public string LicensePlate { get; set; }
        public string VIN { get; set; }
        public VehicleModelViewModel Model { get; set; }
        public TeamViewModel Team { get; set; }
    }

    public class VehicleModelViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public VehicleMakeViewModel Make { get; set; }
    }

    public class VehicleMakeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<VehicleModelViewModel> Models { get; set; }
    }
}