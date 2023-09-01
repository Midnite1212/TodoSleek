using Microsoft.AspNetCore.Mvc;
using TodoSleek.Models;
using TodoSleek.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoSleek.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService todoService;

        public TodoController(ITodoService todoService)
        {
            this.todoService = todoService;
        }
        // GET: api/Todo
        [HttpGet]
        public ActionResult<List<TodoItem>> Get()
        {
            return todoService.Get();
        }

        // GET api/Todo/id
        [HttpGet("{id}")]
        public ActionResult<TodoItem> Get(string id)
        {
            var todoItem = todoService.Get(id);

            if (todoItem == null)
            {
                return NotFound($"Todo item with Id = {id} not found");
            }

            return todoItem;
        }

        // POST api/Todo
        [HttpPost]
        public ActionResult<TodoItem> Post([FromHeader] TodoItem todoItem)
        {
            todoService.Create(todoItem);

            return CreatedAtAction(nameof(Get), new { id = todoItem.Id }, todoItem);
        }

        // PUT api/Todo/id
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromHeader] TodoItem todoItem)
        {
            var existingTodoItem = todoService.Get(id);

            if (existingTodoItem == null)
            {
                return NotFound($"Todo item with Id = {id} not found");
            }

            todoService.Update(id, todoItem);

            return Ok($"Todo item with Id = {id} updated");
        }

        // DELETE api/Todo/id
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var todoItem = todoService.Get(id);

            if (todoItem == null)
            {
                return NotFound($"Todo item with Id = {id} not found");
            }

            todoService.Remove(todoItem.Id);

            return Ok($"Todo item with Id = {id} deleted");
        }
    }
}
