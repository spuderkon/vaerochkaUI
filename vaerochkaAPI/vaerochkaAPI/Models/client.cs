using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class client
    {
        public int id { get; set; }

        public string name { get; set; }

        public string surname { get; set; }

        public string lastname { get; set; }

        public string sex { get; set; }

        public passport passport_id { get; set; }
    }
}