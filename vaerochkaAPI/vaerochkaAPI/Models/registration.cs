using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class Registration
    {
        public int id { get; set; }

        public int route_id { get; set; }

        public string code { get; set; }

        public int client_id { get; set; }

        public int contact_id { get; set; }

        public int tariff_id { get; set; }

        public string seat { get; set; }

        public decimal price { get; set; }

        public bool registered { get; set; }

  }
}
