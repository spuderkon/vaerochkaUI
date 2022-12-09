using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vaerochkaAPI.Models
{
    public class passport
    {
        public int id { get; set; }

        public DateTime birthdate { get; set; }

        public country citizenship_id { get; set; }

        public string number { get; set; }

        public country country_of_issue_id { get; set; }

        public DateTime validity_period { get; set; }
    }
}