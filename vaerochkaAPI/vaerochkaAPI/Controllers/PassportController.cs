using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using vaerochkaAPI.Models;

namespace vaerochkaAPI.Controllers
{
    public class PassportController : ApiController
    {

    public HttpResponseMessage Get(string number)
    {
      string query = $@"
                       select * 
                       from passport
                       where number = '{number}'";
      DataTable table = new DataTable();
      using (var con = new SqlConnection(ConfigurationManager.
          ConnectionStrings["vaerochka"].ConnectionString))
      using (var cmd = new SqlCommand(query, con))
      using (var da = new SqlDataAdapter(cmd))
      {
        cmd.CommandType = CommandType.Text;
        da.Fill(table);
      }

      return Request.CreateResponse(HttpStatusCode.OK, table);
    }

    public string Post(Passport passport)
        {
          try
            {
            string query = $@"insert into passport values ('{passport.birthdate.ToString("yyyy-MM-dd")}', {passport.citizenship_id}, '{passport.number}', {passport.country_of_issue_id}, '{passport.validity_period.ToString("yyyy-MM-dd")}')";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["vaerochka"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
              cmd.CommandType = CommandType.Text;
              da.Fill(table);
            }

            return $"Success to post passport!";
          }
          catch (Exception ex)
          {
            return $"Failed to post passport {ex.Message}";
          }
        }
    }
}
