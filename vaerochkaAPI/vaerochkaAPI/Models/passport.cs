using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class Passport
    {
        public int id { get; set; }

        public DateTime birthdate { get; set; }

        public int citizenship_id { get; set; }

        public string number { get; set; }

        public int country_of_issue_id { get; set; }

        public DateTime validity_period { get; set; }
    }
}
