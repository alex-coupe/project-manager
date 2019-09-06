using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
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
            return await _context.Projects.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(long id)
        {
            var projectDetails = await _context.Projects.AsNoTracking().FirstOrDefaultAsync(entity => entity.Id == id);

            if (projectDetails == null)
                return NotFound();

            return projectDetails;
        }
        
        [EnableCors("MyPolicy")]
        [HttpPost]
        public async Task<ActionResult<Project>> AddProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostProject", new {id = project.Id}, project);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> UpdateProject(Project updatedProject, long id)
        {           
            if (id != updatedProject.Id)
                return BadRequest();
            
            _context.Entry(updatedProject).State = EntityState.Modified;
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