using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManager.Models;

namespace ProjectManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ProjectsController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.AsNoTracking()
            .Include(project => project.Tasks)
            .Include(project => project.Issues)
            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(long id)
        {
            var projectDetails = await _context.Projects.AsNoTracking()
            .Include(project => project.Tasks)
            .Include(project => project.Issues)
            .FirstOrDefaultAsync(entity => entity.Id == id);

            if (projectDetails == null)
                return NotFound();

            return projectDetails;
        }

        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new {id = project.Id}, project);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> PutProject(Project modifiedProject, long id)
        {           
            if (id != modifiedProject.Id)
                return BadRequest();
            
            System.Console.Write(modifiedProject.Id);

            _context.Entry(modifiedProject).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject(long id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
                return NotFound();
            
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}