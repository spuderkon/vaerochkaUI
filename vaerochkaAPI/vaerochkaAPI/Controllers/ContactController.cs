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
    public class ContactController : ApiController
    {
        public HttpResponseMessage Get(string email,string number)
        {
          string query = $@"
                           select * 
                           from contact
                           where email = '{email}' and number = '{number}'";
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

        public string Post(Contact contact)
        {
          try
          {
            string query = $@"insert into contact values ('{contact.email}', '{contact.number}')";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["vaerochka"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
              cmd.CommandType = CommandType.Text;
              da.Fill(table);
            }

            return $"Success to post contact!";
          }
          catch (Exception ex)
          {
            return $"Failed to post contact {ex.Message}";
          }
        }
  }
}

