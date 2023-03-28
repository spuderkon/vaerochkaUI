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
using System.Globalization;

namespace vaerochkaAPI.Controllers
{
  public class RouteController : ApiController
  {
    public HttpResponseMessage Get(int departureCity, int arrivalCity, DateTime departureDate, DateTime arrivalDate)
    {
       string query = @"
          select route.id as 'route_id',route.start_time, route.end_time, route.code as 'route_code', route.price ,route.airline_id, route.time_in_fly, airline.name, airline.image, 
          route.aircraft_id, aircraft.model ,route.boarding_gate, route.start_airport_id, a1.name as 'departure_airport', ac1.name as 'departure_city', a1.code as 'departure_air_code', route.end_airport_id, a2.name as 'arrive_airport', ac2.name as 'arrive_city' , a2.code as 'arrive_air_code',
          aircraft.business_seats + aircraft.economy_seats - COUNT(registration.seat) as 'available_seats'

          from route
          join airline on route.airline_id = airline.id
          join aircraft on route.aircraft_id = aircraft.id
          join airport as a1 on route.start_airport_id = a1.id
          join airport as a2 on route.end_airport_id = a2.id
          join city as ac1 on a1.city_id = ac1.id
          join city as ac2 on a2.city_id = ac2.id
          join registration on route.id = registration.route_id
          where datediff(day," + departureDate.ToString("yyyy-MM-dd") + "," + arrivalDate.ToString("yyyy-MM-dd") + ") = 0 and ac1.id = " + departureCity + " and ac2.id = " + arrivalCity +@"
          GROUP BY route.id, route.start_time, route.end_time, route.code, route.price ,route.airline_id, route.time_in_fly, airline.name, airline.image, route.aircraft_id, aircraft.model ,route.boarding_gate, route.start_airport_id, a1.name, ac1.name, a1.code, route.end_airport_id, a2.name, ac2.name, a2.code, aircraft.business_seats, aircraft.economy_seats";


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
      string query;
      if (departureDate == DateTime.Today)
      {
          
          query = $@"
              select route.id as 'route_id',route.start_time, route.end_time, route.code as 'route_code', route.price ,route.airline_id, route.time_in_fly, airline.name, airline.image, 
                     route.aircraft_id, aircraft.model ,route.boarding_gate, route.start_airport_id, a1.name as 'departure_airport', ac1.name as 'departure_city', a1.code as 'departure_air_code', route.end_airport_id, a2.name as 'arrive_airport', ac2.name as 'arrive_city' , a2.code as 'arrive_air_code',
                     aircraft.business_seats + aircraft.economy_seats - COUNT(registration.seat) as 'available_seats'
		  
              from route
              join airline on route.airline_id = airline.id
              join aircraft on route.aircraft_id = aircraft.id
              join airport as a1 on route.start_airport_id = a1.id
              join airport as a2 on route.end_airport_id = a2.id
              join city as ac1 on a1.city_id = ac1.id
              join city as ac2 on a2.city_id = ac2.id
              join registration on route.id = registration.route_id
              where DATEDIFF(day,route.start_time, '{departureDate.ToString("yyyy-MM-dd" + " " + DateTime.Now.ToString("HH:mm:ss.mmm"))}') = 0 and ac1.id = {departureCity} and ac2.id = {arrivalCity}
              GROUP BY route.id, route.start_time, route.end_time, route.code, route.price ,route.airline_id, route.time_in_fly, airline.name, airline.image, route.aircraft_id, aircraft.model ,route.boarding_gate, route.start_airport_id, a1.name, ac1.name, a1.code, route.end_airport_id, a2.name, ac2.name, a2.code, aircraft.business_seats, aircraft.economy_seats";
      }
      else
      {
        query = $@"       
              select route.id as 'route_id',route.start_time, route.end_time, route.code as 'route_code', route.price ,route.airline_id, route.time_in_fly, airline.name, airline.image, 
                     route.aircraft_id, aircraft.model ,route.boarding_gate, route.start_airport_id, a1.name as 'departure_airport', ac1.name as 'departure_city', a1.code as 'departure_air_code', route.end_airport_id, a2.name as 'arrive_airport', ac2.name as 'arrive_city' , a2.code as 'arrive_air_code',
                     aircraft.business_seats + aircraft.economy_seats - COUNT(registration.seat) as 'available_seats'
		  
              from route
              join airline on route.airline_id = airline.id
              join aircraft on route.aircraft_id = aircraft.id
              join airport as a1 on route.start_airport_id = a1.id
              join airport as a2 on route.end_airport_id = a2.id
              join city as ac1 on a1.city_id = ac1.id
              join city as ac2 on a2.city_id = ac2.id
              join registration on route.id = registration.route_id
              where DATEDIFF(day,route.start_time, '{departureDate.ToString("yyyy-MM-dd")}') = 0 and ac1.id = {departureCity} and ac2.id = {arrivalCity}
              GROUP BY route.id, route.start_time, route.end_time, route.code, route.price ,route.airline_id, route.time_in_fly, airline.name, airline.image, route.aircraft_id, aircraft.model ,route.boarding_gate, route.start_airport_id, a1.name, ac1.name, a1.code, route.end_airport_id, a2.name, ac2.name, a2.code, aircraft.business_seats, aircraft.economy_seats";
      }
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

    public HttpResponseMessage Get(int id)
    {
      string query = $@"
                select route.id as 'route_id',route.start_time, route.end_time, route.code as 'route_code', route.price ,route.airline_id, route.time_in_fly, airline.name as 'airline_name', airline.image, 
                route.aircraft_id, aircraft.model ,route.boarding_gate, route.start_airport_id, a1.name as 'departure_airport', ac1.name as 'departure_city', a1.code as 'departure_air_code',
                route.end_airport_id, a2.name as 'arrive_airport', ac2.name as 'arrive_city' , a2.code as 'arrive_air_code',
                aircraft.business_seats + aircraft.economy_seats - COUNT(registration.seat) as 'available_seats'

                from route
                join airline on route.airline_id = airline.id
                join aircraft on route.aircraft_id = aircraft.id
                join airport as a1 on route.start_airport_id = a1.id
                join airport as a2 on route.end_airport_id = a2.id
                join city as ac1 on a1.city_id = ac1.id
                join city as ac2 on a2.city_id = ac2.id
                join registration on route.id = registration.route_id

                where route.id = {id}
                GROUP BY route.id, route.start_time, route.end_time, route.code, route.price ,route.airline_id, route.time_in_fly, airline.name, 
                airline.image, route.aircraft_id, aircraft.model ,route.boarding_gate, route.start_airport_id, a1.name, 
                ac1.name, a1.code, route.end_airport_id, a2.name, ac2.name, a2.code, aircraft.business_seats, aircraft.economy_seats";


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
