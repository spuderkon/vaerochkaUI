using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace vaerochkaAPI.Controllers
{
    public class AircraftController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                     select id, model from
                     dbo.aircraft";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["vaerochka"].ConnectionString))
                using(var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
    }
}
