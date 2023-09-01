using TodoSleek.Models;

namespace TodoSleek.Services
{
    public interface ITodoService
    {
        List<TodoItem> Get();
        TodoItem Get(string id);
        TodoItem Create(TodoItem todoItem);
        void Update(string id, TodoItem todoItem);
        void Remove(string id);
    }
}
