using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManager.Models;
using System.Linq;

namespace ProjectManager.Models
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssuesController : ControllerBase
    {   
        private readonly ApplicationContext _context;
        public IssuesController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Issue>>> GetIssues(long projectId)
        {
            var issues = await _context.Issues.AsNoTracking().Where(issue => issue.ProjectId == projectId).ToListAsync();
            return issues;
        }

       

        [HttpPost]
        public async Task<ActionResult<Issue>> AddIssue(Issue issue)
        {
            _context.Issues.Add(issue);
            await _context.SaveChangesAsync();

            return CreatedAtAction("AddIssue", new {Id = issue.Id}, issue);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Issue>> UpdateIssue(Issue updatedIssue, long id)
        {
            if (id != updatedIssue.Id)
                return BadRequest();
            
            _context.Entry(updatedIssue).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Issue>> DeleteIssue(long id)
        {
            var issue = await _context.Issues.FindAsync(id);

            if (issue == null)
                return NotFound();
            
            _context.Issues.Remove(issue);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}