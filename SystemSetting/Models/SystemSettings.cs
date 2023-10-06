namespace SystemSetting.Models
{
    public class SystemSettings
    {
        public long Id { get; set; }
        public long CompanyId { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Reference { get; set; }
        public string Configuration { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
    }
}
