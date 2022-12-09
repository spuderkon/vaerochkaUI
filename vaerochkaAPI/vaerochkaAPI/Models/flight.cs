using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class flight
    {
        public int id { get; set; }

        public aircraft aircraft_id { get; set; }

        public string boarding_gate { get; set; }

        public DateTime start_time { get; set; }

        public DateTime end_time { get; set; }

        public airport start_airport_id { get; set; }

        public airport end_airport_id { get; set; }
    }
}