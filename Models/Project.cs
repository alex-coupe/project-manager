using System;
using System.ComponentModel.DataAnnotations;

namespace project_manager.Models
{
    class Project
    {
        [Key]
        public long Id {get; set;}

        [DataType(DataType.Date)]
        public DateTime CreatedDate {get; set;}

        [DataType(DataType.Date)]
        public DateTime CompletionDate {get; set;}

        [DataType(DataType.Text)]
        public string Name {get; set;}

        [DataType(DataType.Text)]
        public string Owner {get; set;}

        [DataType(DataType.Text)]
        public string Descripton {get; set;}

        public List<Issues> Issues {get; set;}

        public List<Tasks> Tasks {get; set;}


    }
}