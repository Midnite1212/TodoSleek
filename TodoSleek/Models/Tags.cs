using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoSleek.Models
{
    [BsonIgnoreExtraElements]
    public class Tags
    {
        [BsonElement("title")]
        public string Title { get; set; } = "New Tag";
        [BsonElement("color")]
        public string Color { get; set; } = "#FFFFFF";
    }
}
