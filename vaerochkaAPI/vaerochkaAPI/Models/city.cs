using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class city
    {
        public int id { get; set; }
        
        public string name { get; set; }

        public country country_id { get; set; }
    }
}