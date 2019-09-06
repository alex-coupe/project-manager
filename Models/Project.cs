using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Models
{
    public class Project
    {
        //Model to represent the overall idea of a project within the application
        [Required]
        public long Id {get; set;}

        [Required]
        [MaxLength(100)]
        [DataType(DataType.Text)]
        public string Name {get; set;}

        [Required]
        [MaxLength(500)]
        [DataType(DataType.MultilineText)]
        public string Description {get; set;}

        [Required]
        [MaxLength(100)]
        [DataType(DataType.Text)]
        public string Owner {get; set;}

        [Required]
        [DataType(DataType.Date)]
        public DateTime CreatedDate {get; set;}

        [Required]
        public bool Completed {get; set;} = false;

        [DataType(DataType.Date)]
        public DateTime? CompletionDate {get; set;}

    }
}