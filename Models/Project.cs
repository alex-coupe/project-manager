using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Models
{
    public class Project
    {
        //Model to represent the overall idea of a project within the application
        public long Id {get; set;}

        [DataType(DataType.Date)]
        public DateTime CreatedDate {get; set;}

        [DataType(DataType.Date)]
        public DateTime CompletionDate {get; set;}

        [DataType(DataType.Text)]
        public string Name {get; set;}

        [DataType(DataType.Text)]
        public string Owner {get; set;}

        [DataType(DataType.MultilineText)]
        public string Descripton {get; set;}

        public List<Issue> Issues {get; set;}

        public List<Task> Tasks {get; set;}


    }
}