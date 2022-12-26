using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNetCore.WebUtilities;

namespace vaerochkaAPI.Controllers
{
  public class RouteController : ApiController
  {
    public HttpResponseMessage Get(int departureCity, int arrivalCity, DateTime departureDate, DateTime arrivalDate)
    {
       string query = @"
                                    select route.id as 'route_id', route.start_date, route.end_date, route.code as 'route_code', route.price ,route.airline_id, route.time_in_fly, airline.name, airline.image, 
                                    flight.aircraft_id, aircraft.model ,flight.boarding_gate, flight.start_airport_id, a1.name as 'departure_airport', ac1.name as 'departure_city', a1.code as 'departure_air_code', flight.end_airport_id, a2.name as 'arrive_airport', ac2.name as 'arrive_city', a2.code as 'arrive_air_code'

                                    from route
                                    join airline on route.airline_id = airline.id
                                    join [route-flight] on route.id = [route-flight].route_id
                                    join flight on [route-flight].flight_id = flight.id
                                    join aircraft on flight.aircraft_id = aircraft.id
                                    join airport as a1 on flight.start_airport_id = a1.id
                                    join airport as a2 on flight.end_airport_id = a2.id
                                    join city as ac1 on a1.city_id = ac1.id
                                    join city as ac2 on a2.city_id = ac2.id
                                    where datediff(day," + departureDate.ToString("yyyy-MM-dd") + "," + arrivalDate.ToString("yyyy-MM-dd") + ") = 0 and ac1.id = " + departureCity + " and ac2.id = " + arrivalCity;
      
      
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

    public HttpResponseMessage Get(int departureCity, int arrivalCity, DateTime departureDate)
    {
      string query = @"
                                    select route.id as 'route_id', route.start_date, route.end_date, route.code as 'route_code', route.price ,route.airline_id, route.time_in_fly, airline.name, airline.image, 
                                    flight.aircraft_id, aircraft.model ,flight.boarding_gate, flight.start_airport_id, a1.name as 'departure_airport', a1.name as 'departure_city', a1.code as 'departure_air_code', flight.end_airport_id, a2.name as 'arrive_airport', ac2.name as 'arrive_city' , a2.code as 'arrive_air_code'

                                    from route
                                    join airline on route.airline_id = airline.id
                                    join [route-flight] on route.id = [route-flight].route_id
                                    join flight on [route-flight].flight_id = flight.id
                                    join aircraft on flight.aircraft_id = aircraft.id
                                    join airport as a1 on flight.start_airport_id = a1.id
                                    join airport as a2 on flight.end_airport_id = a2.id
                                    join city as ac1 on a1.city_id = ac1.id
                                    join city as ac2 on a2.city_id = ac2.id
                                    where route.start_date >= " + departureDate.ToString("yyyy-MM-dd") + " and ac1.id = " + departureCity + " and ac2.id = " + arrivalCity;

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
