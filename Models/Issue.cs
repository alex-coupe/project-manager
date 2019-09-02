using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Models
{
    public class Issue
    {
        // Model to represent any issues that have arisen during the project
        public long Id {get; set;}

        public Project Project {get; set;}

        [DataType(DataType.Text)]
        public string Name {get; set;}

        [DataType(DataType.Text)]
        public string LoggedBy {get; set;}

        [DataType(DataType.MultilineText)]
        public string Description {get; set;}

        [DataType(DataType.Text)]
        public string Severity {get; set;}

        public bool Resolved {get; set;}

        [DataType(DataType.Text)]
        public string ResolvedBy {get; set;}

    }
}
