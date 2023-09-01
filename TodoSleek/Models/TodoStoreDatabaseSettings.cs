namespace TodoSleek.Models
{
    public class TodoStoreDatabaseSettings : ITodoStoreDatabaseSettings
    {
        public string TodoItemCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}
