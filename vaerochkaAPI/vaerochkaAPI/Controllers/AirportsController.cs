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
  public class AirportsController : ApiController
  {
        public HttpResponseMessage Get()
        {
          string query = @"
                           select code,dbo.airport.name as ""airport_name"" , dbo.city.name as ""city_name"", dbo.airport.id as ""airport_id""
                           from dbo.airport
                           join dbo.city on dbo.airport.city_id=dbo.city.id";
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
  }
}
