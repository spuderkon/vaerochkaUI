using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class airport
    {
        public int id { get; set; }

        public string code { get; set; }

        public string name { get; set; }

        public city city_id { get; set; }
    }
}