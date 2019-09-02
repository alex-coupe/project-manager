using System;
using System.ComponentModel.DataAnnotations;

namespace project_manager.Models
{
    class Issue
    {
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
