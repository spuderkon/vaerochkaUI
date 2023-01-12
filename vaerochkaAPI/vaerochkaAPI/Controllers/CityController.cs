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
    public class CityController : ApiController
    {
        public HttpResponseMessage Get(int departureCity, int arrivalCity)
        {
          string query = @"
                            SELECT c1.name AS 'departure', c2.name AS 'arrival'
                            FROM city c1, city c2
                            where c1.id =" + departureCity + " and c2.id =" + arrivalCity;
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
