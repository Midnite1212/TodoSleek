using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoSleek.Models
{
    [BsonIgnoreExtraElements]
    public class TodoItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;
        [BsonElement("title")]
        public string Title { get; set; } = "New Task";
        [BsonElement("description")]
        public string Description { get; set; } = String.Empty;
        [BsonElement("due date")]
        public DateTime DueDate { get; set; } = DateTime.Now;
        [BsonElement("status")]
        public TodoStatus Status { get; set; } = TodoStatus.NOT_STARTED;
        [BsonElement("priority")]
        public bool Priority { get; set; } = false;
        [BsonElement("order")]
        public int Order { get; set; }
        [BsonElement("subtasks")]
        public Subtasks[]? Subtasks { get; set; }
        [BsonElement("tags")]
        public Tags[]? Tags { get; set; }
    }

    public enum TodoStatus
    {
        COMPLETED,
        IN_PROGRESS,
        NOT_STARTED
    }
}
