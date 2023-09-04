using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoSleek.Models
{
    [BsonIgnoreExtraElements]
    public class Subtasks
    {
        [BsonElement("title")]
        public string Title { get; set; } = "New Subtask";
        [BsonElement("color")]
        public bool Done { get; set; } = false;
    }
}
