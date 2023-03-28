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
    public class ClientController : ApiController
    {
      public HttpResponseMessage Get(string name, string surname, string lastname)
        {
          string query = $@"
                           select * 
                           from client
                           where name = '{name}' and surname = '{surname}' and lastname = '{lastname}'";
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

        public string Post(Client client)
        {
          try
          {
            string query = $@"insert into client values ('{client.name}', '{client.surname}', '{client.lastname}', {client.passport_id})";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["vaerochka"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
              cmd.CommandType = CommandType.Text;
              da.Fill(table);
            }

            return $"Success to post client!";
          }
          catch (Exception ex)
          {
            return $"Failed to post client {ex.Message}";
          }
        }
    }
}
