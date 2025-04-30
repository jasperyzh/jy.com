---
title: API Reference
description: Complete reference documentation for all the APIs available in our platform.
pubDate: 250405
draft: 1
---

# API Reference

This page provides detailed documentation for all the available APIs in our platform.

## Core API

### `createApp(options)`

Creates a new application instance.

**Parameters:**
- `options` (Object): Configuration options for the application
  - `debug` (Boolean): Enable debug mode
  - `theme` (String): UI theme ('light' or 'dark')
  - `language` (String): Default language
  - `plugins` (Array): List of plugins to load

**Returns:**
- `App` (Object): The application instance

**Example:**
```javascript
import { createApp } from 'our-package';

const app = createApp({
  debug: true,
  theme: 'dark'
});
```

### `app.start()`

Starts the application.

**Returns:**
- `Promise<void>`: A promise that resolves when the application has started

**Example:**
```javascript
app.start().then(() => {
  console.log('Application started successfully');
});
```

### `app.stop()`

Stops the application.

**Returns:**
- `Promise<void>`: A promise that resolves when the application has stopped

**Example:**
```javascript
app.stop().then(() => {
  console.log('Application stopped successfully');
});
```

## Data API

### `app.data.fetch(resource, options)`

Fetches data from a specific resource.

**Parameters:**
- `resource` (String): Resource identifier
- `options` (Object): Fetch options
  - `cache` (Boolean): Enable caching
  - `timeout` (Number): Request timeout in milliseconds

**Returns:**
- `Promise<Object>`: The requested data

**Example:**
```javascript
app.data.fetch('users', { cache: true })
  .then(users => {
    console.log(users);
  });
```

### `app.data.save(resource, data, options)`

Saves data to a specific resource.

**Parameters:**
- `resource` (String): Resource identifier
- `data` (Object): Data to save
- `options` (Object): Save options
  - `validate` (Boolean): Validate data before saving
  - `optimistic` (Boolean): Use optimistic updates

**Returns:**
- `Promise<Object>`: The saved data

**Example:**
```javascript
const user = { name: 'John Doe', email: 'john@example.com' };
app.data.save('users', user, { validate: true })
  .then(savedUser => {
    console.log(savedUser);
  });
```

## Events API

### `app.events.on(event, callback)`

Registers an event listener.

**Parameters:**
- `event` (String): Event name
- `callback` (Function): Event handler

**Returns:**
- `Function`: Unsubscribe function

**Example:**
```javascript
const unsubscribe = app.events.on('user:login', (user) => {
  console.log(`User ${user.name} logged in`);
});

// Later, to unsubscribe
unsubscribe();
```

### `app.events.emit(event, data)`

Emits an event.

**Parameters:**
- `event` (String): Event name
- `data` (Any): Event data

**Example:**
```javascript
app.events.emit('notification', {
  message: 'Operation completed successfully',
  type: 'success'
});
``` 