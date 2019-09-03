using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManager.Models;

namespace ProjectManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class TasksController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public TasksController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectManager.Models.Task>>> GetTasks()
        {
            return await _context.Tasks.AsNoTracking()
            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectManager.Models.Task>> GetTask(long id)
        {
            var taskDetails = await _context.Tasks.AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Id == id);

            if (taskDetails == null)
                return NotFound();

            return taskDetails;
        }

        [HttpPost]
        public async Task<ActionResult<ProjectManager.Models.Task>> AddTask(ProjectManager.Models.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("AddTask", new {id = task.Id}, task);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectManager.Models.Task>> UpdateTask(ProjectManager.Models.Task updatedTask, long id)
        {
            if (id != updatedTask.Id)
                return BadRequest();
            
            _context.Entry(updatedTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}