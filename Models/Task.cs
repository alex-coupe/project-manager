using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Models 
{
    public class Task 
    {
        // Model to represent the idea of an individual task within the project
        public long Id {get; set;}

        public Project Project {get; set;}

        [DataType(DataType.Text)]
        public string Name {get; set;}

        [DataType(DataType.MultilineText)]
        public string Description {get; set;}

        [DataType(DataType.Text)]
        public string AssignedTo {get; set;}

        [DataType(DataType.Date)]
        public DateTime DateAssigned {get; set;} 

        public bool Completed {get; set;}
        
         [DataType(DataType.Date)]
        public DateTime CompletedDate {get; set;}
    }
}