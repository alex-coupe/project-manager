using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Models
{
    public class User
    {
        [Required]
        public long Id {get; set;}

        [Required]
        [DataType(DataType.Text)]
        [MaxLength(100)]
        public string Name {get; set;}

        [Required]
        [DataType(DataType.Text)]
        [MaxLength(100)]
        public string JobTitle {get; set;}
    }
}