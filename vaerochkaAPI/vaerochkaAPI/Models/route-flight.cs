using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class route_flight
    {
        public int id { get; set; }

        public route route_id { get; set; }

        public flight flight_id { get; set; }
    }
}