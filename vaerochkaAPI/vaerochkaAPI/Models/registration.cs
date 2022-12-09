using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class registration
    {
        public int id { get; set; }

        public route route_id { get; set; }

        public client client_id { get; set; }

        public contact contact_id { get; set; }

        public tariff tariff_id { get; set; }

        public string seat { get; set; }

        public bool insurance { get; set; }

        public decimal total_price { get; set; }
    }
}