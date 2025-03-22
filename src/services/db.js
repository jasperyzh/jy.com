import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the directory path for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define database directory and file path
const DB_DIR = join(__dirname, '../../db');
const DB_PATH = join(DB_DIR, 'todos.db');

// Create db directory if it doesn't exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize database
const db = new Database(DB_PATH);

// Create todos table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at TEXT
  )
`);

// Todo database operations
const TodoDB = {
  // Get all todos
  getAll() {
    const stmt = db.prepare('SELECT * FROM todos ORDER BY created_at DESC');
    const todos = stmt.all().map(todo => ({
      ...todo,
      completed: Boolean(todo.completed), // Convert INTEGER to Boolean
    }));
    return todos;
  },

  // Add a new todo
  add(todo) {
    const stmt = db.prepare(
      'INSERT INTO todos (id, text, completed, created_at) VALUES (?, ?, ?, ?)'
    );
    stmt.run(
      todo.id,
      todo.text,
      todo.completed ? 1 : 0,
      todo.createdAt.toISOString()
    );
    return todo;
  },

  // Update a todo
  update(id, updates) {
    const todo = this.getById(id);
    if (!todo) return null;

    const stmt = db.prepare(
      'UPDATE todos SET text = ?, completed = ? WHERE id = ?'
    );
    stmt.run(
      updates.text || todo.text,
      updates.completed !== undefined ? (updates.completed ? 1 : 0) : todo.completed,
      id
    );
    return this.getById(id);
  },

  // Delete a todo
  delete(id) {
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    stmt.run(id);
  },

  // Get a single todo by id
  getById(id) {
    const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
    const todo = stmt.get(id);
    if (!todo) return null;
    
    return {
      ...todo,
      completed: Boolean(todo.completed),
    };
  },

  // Delete all completed todos
  deleteCompleted() {
    const stmt = db.prepare('DELETE FROM todos WHERE completed = 1');
    stmt.run();
  }
};

export default TodoDB;
