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
        public string Title { get; set; } = String.Empty;
        [BsonElement("description")]
        public string Description { get; set; } = String.Empty;
        [BsonElement("tags")]
        public string[]? Tags { get; set; }
    }
}
