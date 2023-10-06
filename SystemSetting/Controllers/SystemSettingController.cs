using Microsoft.AspNetCore.Mvc;
using SystemSetting.Data;
using SystemSetting.Models;

namespace SystemSetting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemSettingController : ControllerBase
    {
        private readonly AppDbContext _context;
        public SystemSettingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public ActionResult<IEnumerable<SystemSettings>> GetAllSystemSettings()
        {
            var systemSettingsList = _context.SystemSettings.ToList();
            return Ok(systemSettingsList);
        }

        [HttpGet("{Id}")]
        public ActionResult<SystemSettings> GetSystemSettingsById(long Id)
        {
            if (_context.SystemSettings == null)
            {
                return BadRequest("No SystemSettings data available.");
            }

            var data = _context.SystemSettings.Find(Id);

            return Ok(data);
        }


        [HttpGet("Configuration")]
        public ActionResult<string> GetSystemSettings(long id, string reference)
        {
            if (_context.SystemSettings == null)
            {
                return NotFound("No SystemSettings data available.");
            }

            var systemSettings = _context.SystemSettings.FirstOrDefault(x => x.Reference == reference && x.Id == id);

            if (systemSettings == null)
            {
                return NotFound("SystemSettings not found.");
            }

            string configuration = systemSettings.Configuration;

            return Ok(configuration);
        }


        [HttpPost]
        public ActionResult<SystemSettings> CreateSystemSettings([FromQuery] SystemSettings settings)
        {
            if (settings == null)
            {
                return BadRequest("Invalid data. Please provide valid SystemSettings.");
            }

            try
            {
                _context.SystemSettings.Add(settings);

                _context.SaveChanges();

                return CreatedAtAction("GetSystemSettings", new { id = settings.Id }, settings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the SystemSettings: {ex.Message}");
            }
        }


        [HttpPut("Configuration/{id}/{reference}")]
        public ActionResult<SystemSettings> UpdateConfiguration(long id, string reference, string configuration)
        {
            var systemSettings = _context.SystemSettings.FirstOrDefault(x => x.Reference == reference && x.Id == id);

            if (systemSettings == null)
            {
                return NotFound();
            }

            systemSettings.Configuration = configuration;

            try
            {
                _context.SaveChanges();
                return Ok("Configuration updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the configuration: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSystemSetting(long id)
        {
            try
            {
                var setting = _context.SystemSettings.Find(id);

                if (setting == null)
                {
                    return NotFound();
                }

                _context.SystemSettings.Remove(setting);
                _context.SaveChanges();

                return Ok("Systems Are Deleted");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the configuration: {ex.Message}");
            }
        }
    }
}
