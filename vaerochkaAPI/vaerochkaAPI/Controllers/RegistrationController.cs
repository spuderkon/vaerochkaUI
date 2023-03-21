using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace vaerochkaAPI.Controllers
{
  public class RegistrationController : ApiController
  {
    public HttpResponseMessage Get(int route_id)
    {
      string query = @"
                       select seat
                       from registration
                       where route_id =" + route_id;
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

    //public string Post
  }
}
