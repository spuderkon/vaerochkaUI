using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class tariff
    {
        public int id { get; set; }

        public airline airlineId { get; set; }

        public string name { get; set; }

        public bool hand_luggage { get; set; }

        public bool luggage { get; set; }

        public bool rebooking { get; set; }

        public bool refund { get; set; }

        public int markup { get; set; }
    }
}