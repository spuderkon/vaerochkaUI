using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class aircraft
    {
        public int id { get; set; }

        public string model { get; set; }

        public int buisness_seats { get; set; }

        public int economy_seats { get; set; }
    }
}