using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Models
{
    public class Issue
    {
        // Model to represent any issues that have arisen during the project
        [Required]
        public long Id {get; set;}

        [Required]
        public long ProjectId {get; set;}

        [DataType(DataType.Text)]
        [MaxLength(100)]
        [Required]
        public string Name {get; set;}

        [Required]
        [MaxLength(100)]
        [DataType(DataType.Text)]
        public string LoggedBy {get; set;}

        [Required]
        [MaxLength(500)]
        [DataType(DataType.MultilineText)]
        public string Description {get; set;}

        [Required]
        [MaxLength(100)]
        [DataType(DataType.Text)]
        public string Severity {get; set;}

        [Required]
        public bool Resolved {get; set;} = false;

        [DataType(DataType.Text)]
        [MaxLength(100)]
        public string ResolvedBy {get; set;}

    }
}
