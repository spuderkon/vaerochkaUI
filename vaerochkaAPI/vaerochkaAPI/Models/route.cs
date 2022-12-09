using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class route
    {
        public int id { get; set; }

        public DateTime start_date { get; set; }

        public DateTime end_date { get; set; }

        public airline airline_id { get; set; }

        public decimal price { get; set; }

        public string code { get; set; }
    }
}