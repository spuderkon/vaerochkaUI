using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class Route
    {
        public int id { get; set; }

        public int airline_id { get; set; }

        public DateTime start_date { get; set; }

        public DateTime end_date { get; set; }

        public decimal price { get; set; }

        public string code { get; set; }

        public string time_in_fly { get; set; }

        public int aircraft_id { get; set; }

        public string boarding_gate { get; set; }

        public int start_airport_id { get; set; }

        public int end_airport_id { get; set; }

  }
}
