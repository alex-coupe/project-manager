using System;
using Microsoft.EntityFrameworkCore;

namespace project_manager.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base (options)
        {}

        public DbSet<Project> Projects {get; set;}
        public DbSet<Task> Tasks {get; set;}
        public DbSet<Issue> Issues {get; set;}
    }
}