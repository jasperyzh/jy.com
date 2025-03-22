import TodoDB from '../../services/db.js';

export async function GET() {
  try {
    const todos = TodoDB.getAll();
    return new Response(JSON.stringify({ success: true, todos }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { action, todo, id } = body;

    switch (action) {
      case 'add':
        const newTodo = TodoDB.add(todo);
        return new Response(JSON.stringify({ success: true, todo: newTodo }), {
          headers: { 'Content-Type': 'application/json' }
        });

      case 'toggle':
        if (!id) throw new Error('Todo ID is required');
        const updatedTodo = TodoDB.update(id, { 
          completed: !TodoDB.getById(id).completed 
        });
        return new Response(JSON.stringify({ success: true, todo: updatedTodo }), {
          headers: { 'Content-Type': 'application/json' }
        });

      case 'delete':
        if (!id) throw new Error('Todo ID is required');
        TodoDB.delete(id);
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });

      case 'clearCompleted':
        TodoDB.deleteCompleted();
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response(JSON.stringify({ success: false, error: 'Invalid action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Error processing todo action:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
