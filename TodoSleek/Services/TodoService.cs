using MongoDB.Driver;
using TodoSleek.Models;

namespace TodoSleek.Services
{
    public class TodoService : ITodoService
    {
        private readonly IMongoCollection<TodoItem> _todoItem;

        public TodoService(ITodoStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _todoItem = database.GetCollection<TodoItem>(settings.TodoItemCollectionName);
        }

        public TodoItem Create(TodoItem todoItem)
        {
            _todoItem.InsertOne(todoItem);
            return todoItem;
        }

        public List<TodoItem> Get()
        {
            return _todoItem.Find(todoItem => true).ToList();
        }

        public TodoItem Get(string id)
        {
            return _todoItem.Find(todoItem => todoItem.Id == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _todoItem.DeleteOne(todoItem => todoItem.Id == id);
        }

        public void Update(string id, TodoItem todoItem)
        {
            _todoItem.ReplaceOne(todoItem => todoItem.Id == id, todoItem);
        }
    }
}
