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

    public HttpResponseMessage Get(string code)
    {
      string query = $@"select distinct route_id,code,client_id,contact_id,tariff_id, seat, price, registered from registration where code = '{code}'";
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

    [Route("api/Registration/GetFullRegistrationInfoByCodeAndSurname")]
    [HttpGet]
    public HttpResponseMessage GetFullRegistrationInfoByCodeAndSurname(string code, string surname)
    {
      string query = $@"select distinct route.id as 'routeId', registration.code as 'bookingCode', ac1.name as 'departureCity', ac2.name as 'arrivalCity',a1.code as 'departureAirportCode', a2.code as 'arrivalAirportCode', route.start_time as 'startTime', 
		                 route.end_time as 'endTime', route.time_in_fly as 'timeInFly', route.code as 'routeCode', aircraft.model as 'aircraftModel', airline.name as 'airline', route.boarding_gate as 'boardingGate', 
		                 tariff.name as 'tariffName', registration.registered, client.name as 'clientName', client.surname as 'clientSurname', client.lastname as 'clientLastname', registration.seat, tariff.luggage,
		                 tariff.meal
	                    from registration
	                    join route on registration.route_id = route.id
	                    join airport as a1 on route.start_airport_id = a1.id
	                    join airport as a2 on route.end_airport_id = a2.id
	                    join city as ac1 on a1.city_id = ac1.id
	                    join city as ac2 on a2.city_id = ac2.id
	                    join aircraft on route.aircraft_id = aircraft.id
	                    join airline on route.airline_id = airline.id
	                    join tariff on registration.tariff_id = tariff.id
	                    join client on registration.client_id = client.id
	                    where registration.code = '{code}' and client.surname = '{surname}'";
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

    [Route("api/Registration/GetFullRegistrationInfo")]
    [HttpGet]
    public HttpResponseMessage GetFullRegistrationInfoByCode(string code)
    {
      string query = $@"select distinct route.id as 'routeId', registration.code as 'bookingCode', ac1.name as 'departureCity', ac2.name as 'arrivalCity',a1.code as 'departureAirportCode', a2.code as 'arrivalAirportCode', route.start_time as 'startTime', 
		                 route.end_time as 'endTime', route.time_in_fly as 'timeInFly', route.code as 'routeCode', aircraft.model as 'aircraftModel', airline.name as 'airline', route.boarding_gate as 'boardingGate', 
		                 tariff.name as 'tariffName', registration.registered, client.name as 'clientName', client.surname as 'clientSurname', client.lastname as 'clientLastname', registration.seat, tariff.luggage,
		                 tariff.meal
	                    from registration
	                    join route on registration.route_id = route.id
	                    join airport as a1 on route.start_airport_id = a1.id
	                    join airport as a2 on route.end_airport_id = a2.id
	                    join city as ac1 on a1.city_id = ac1.id
	                    join city as ac2 on a2.city_id = ac2.id
	                    join aircraft on route.aircraft_id = aircraft.id
	                    join airline on route.airline_id = airline.id
	                    join tariff on registration.tariff_id = tariff.id
	                    join client on registration.client_id = client.id
	                    where registration.code = '{code}'";
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

    public string Put(Registration reg)
    {
      try
      {
        string query = $@"update registration set code ='{reg.code}', client_id =  {reg.client_id}, contact_id = {reg.contact_id}, tariff_id = {reg.tariff_id}, seat = '{reg.seat}', price = {reg.price}, registered = '{reg.registered}'  where code = '{reg.code}' and route_id = {reg.route_id}";

        DataTable table = new DataTable();
        using (var con = new SqlConnection(ConfigurationManager.
            ConnectionStrings["vaerochka"].ConnectionString))
        using (var cmd = new SqlCommand(query, con))
        using (var da = new SqlDataAdapter(cmd))
        {
          cmd.CommandType = CommandType.Text;
          da.Fill(table);
        }

        return $"Success to update registerd!";
      }
      catch (Exception ex)
      {
        return $"Failed to update registerd {ex.Message}";
      }
    }

    public string Post(Registration reg)
    { 
      try
      {
        string query = $@"insert into registration values ({reg.route_id}, '{reg.code}',{reg.client_id},{reg.contact_id},{reg.tariff_id},'{reg.seat}',{reg.price}, '{reg.registered}' where code = '{reg.code}' and route_id = {reg.route_id})";

        DataTable table = new DataTable();
        using (var con = new SqlConnection(ConfigurationManager.
            ConnectionStrings["vaerochka"].ConnectionString))
        using (var cmd = new SqlCommand(query, con))
        using (var da = new SqlDataAdapter(cmd))
        {
          cmd.CommandType = CommandType.Text;
          da.Fill(table);
        }

        return $"Success to post registration!";
      }
      catch (Exception ex)
      {
        return $"Failed to post registration {ex.Message}";
      }
    }
  }
}
