using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Models 
{
    public class Task 
    {
        // Model to represent the idea of an individual task within the project
        [Required]
        public long Id {get; set;}

        [Required]
        public long ProjectId {get; set;}

        [Required]
        [DataType(DataType.Text)]
        [MaxLength(100)]
        public string Name {get; set;}

        [Required]
        [DataType(DataType.MultilineText)]
        [MaxLength(500)]
        public string Description {get; set;}

        [Required]
        [DataType(DataType.Text)]
        [MaxLength(100)]
        public string AssignedTo {get; set;}

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateAssigned {get; set;} 

        public bool Completed {get; set;} = false;
        
         [DataType(DataType.Date)]
        public DateTime CompletedDate {get; set;}
    }
}