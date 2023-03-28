using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class Client
    {
        public int id { get; set; }

        public string name { get; set; }

        public string surname { get; set; }

        public string lastname { get; set; }

        public int passport_id { get; set; }
    }
}
