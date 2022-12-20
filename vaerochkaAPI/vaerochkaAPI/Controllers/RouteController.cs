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
    public class RouteController : ApiController
    {
    public HttpResponseMessage Get(string departureCity, string arrivalCity, DateTime departureDate, DateTime? arrivalDate)
          {
      string query = @"
                                 select code,dbo.airport.name as ""airport_name"" , dbo.city.name as ""city_name"", dbo.city.id as ""city_id""
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
