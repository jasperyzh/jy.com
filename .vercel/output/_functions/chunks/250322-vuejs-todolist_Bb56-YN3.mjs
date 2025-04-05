import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';
import { useSSRContext, mergeProps, computed, ref, watch, onMounted } from 'vue';
import { defineStore, createPinia } from 'pinia';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  
  getters: {
    activeTodos: (state) => state.todos.filter(todo => !todo.completed),
    completedTodos: (state) => state.todos.filter(todo => todo.completed)
  },
  
  actions: {
    // Add a new todo
    addTodo(text) {
      const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date()
      };
      
      this.todos.push(newTodo);
      this.saveTodos();
    },
    
    // Toggle todo completion status
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
      }
    },
    
    // Delete a todo
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
    },
    
    // Clear all completed todos
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveTodos();
    },
    
    // Save todos to localStorage
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    
    // Load todos from localStorage
    loadTodos() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        try {
          this.todos = JSON.parse(savedTodos);
        } catch (e) {
          console.error('Error parsing saved todos:', e);
          this.todos = [];
        }
      }
    }
  }
});

const useStorageStore = defineStore('storage', {
  state: () => ({
    useSqlite: false
  }),
  
  actions: {
    setStorageType(useSqlite) {
      this.useSqlite = useSqlite;
      // Save preference to localStorage
      localStorage.setItem('todo-storage-preference', useSqlite ? 'sqlite' : 'local');
    },
    
    loadPreference() {
      const preference = localStorage.getItem('todo-storage-preference');
      if (preference) {
        this.useSqlite = preference === 'sqlite';
      }
    }
  }
});

const _sfc_main$1 = {
  __name: 'TodoItem',
  props: {
  todo: {
    type: Object,
    required: true
  }
},
  emits: ['toggle', 'delete'],
  setup(__props, { expose: __expose }) {
  __expose();

// Define props and emits




const __returned__ = {  };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<li${
    ssrRenderAttrs(mergeProps({
      class: ["todo-item flex items-center p-3 border rounded transition hover:bg-gray-50", { 'bg-green-50': $props.todo.completed }]
    }, _attrs))
  } data-v-046d4bb2><input type="checkbox"${
    (ssrIncludeBooleanAttr($props.todo.completed)) ? " checked" : ""
  } class="w-5 h-5 mr-3 rounded focus:ring-blue-500 text-blue-600 border-gray-300" data-v-046d4bb2><span class="${
    ssrRenderClass([{ 'line-through text-gray-400': $props.todo.completed }, "flex-1"])
  }" data-v-046d4bb2>${
    ssrInterpolate($props.todo.text)
  }</span><button class="ml-2 text-red-500 hover:text-red-700 focus:outline-none" aria-label="Delete todo" data-v-046d4bb2><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" data-v-046d4bb2><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" data-v-046d4bb2></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" data-v-046d4bb2></path></svg></button></li>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/TodoItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const TodoItem = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1],['__scopeId',"data-v-046d4bb2"]]);

// Create and export Pinia instance

const _sfc_main = {
  __name: 'TodoList',
  setup(__props, { expose: __expose }) {
  __expose();

const pinia = createPinia();

// Initialize Pinia stores using our pinia instance
const localTodoStore = useTodoStore(pinia);
// const sqliteTodoStore = useTodoSqliteStore(pinia);
const storageStore = useStorageStore(pinia);

// Use computed to get the active store based on preference
const todoStore = computed(() => {
  return storageStore.useSqlite ? sqliteTodoStore : localTodoStore;
});

// Local state for form
const newTodo = ref('');

// Computed properties from store
const todos = computed(() => todoStore.value.todos);
const activeTodosCount = computed(() => todoStore.value.activeTodos.length);
const completedTodosCount = computed(() => todos.value.length - activeTodosCount.value);

// Actions
const addTodo = async () => {
  if (newTodo.value.trim()) {
    await todoStore.value.addTodo(newTodo.value.trim());
    newTodo.value = '';
  }
};

const toggleTodo = async (id) => {
  await todoStore.value.toggleTodo(id);
};

const deleteTodo = async (id) => {
  await todoStore.value.deleteTodo(id);
};

const clearCompleted = async () => {
  await todoStore.value.clearCompleted();
};

// Error state for API mode
const apiError = ref(false);
const apiErrorMessage = ref('');

// Watch for storage type changes and load appropriate todos
watch(
  () => storageStore.useSqlite,
  async (newValue) => {
    apiError.value = false;
    apiErrorMessage.value = '';
    
    try {
      await todoStore.value.loadTodos();
    } catch (err) {
      console.error('Error loading todos after storage change:', err);
      if (newValue === true) { // Only show error and revert if switching to SQLite mode
        apiError.value = true;
        apiErrorMessage.value = 'Failed to load todos from API. Server-side rendering may not be enabled.';
        // Revert to localStorage if API fails
        storageStore.setStorageType(false);
      }
    }
  }
);

// Load todos and storage preference on component mount
onMounted(async () => {
  // Always start with localStorage for reliability
  storageStore.setStorageType(false);
  
  try {
    await todoStore.value.loadTodos();
  } catch (err) {
    console.error('Error loading initial todos:', err);
  }
});

const __returned__ = { pinia, localTodoStore, storageStore, todoStore, newTodo, todos, activeTodosCount, completedTodosCount, addTodo, toggleTodo, deleteTodo, clearCompleted, apiError, apiErrorMessage, ref, computed, onMounted, watch, get useTodoStore() { return useTodoStore }, get useStorageStore() { return useStorageStore }, TodoItem, get createPinia() { return createPinia } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "todo-list" }, _attrs))
  } data-v-a3914654><div class="storage-switcher mb-4 p-4 bg-gray-100 rounded-lg" data-v-a3914654><h3 class="text-lg font-medium mb-2" data-v-a3914654>Storage Mode</h3><p class="mt-2 text-sm text-gray-600" data-v-a3914654>${
    ssrInterpolate(_ctx.useSqlite ? 
        'Using server API with SQLite backend' : 
        'Using localStorage for browser-based storage')
  }</p>`);
  if (_ctx.useSqlite && _ctx.isPreview) {
    _push(`<p class="mt-2 text-xs text-amber-600" data-v-a3914654> Note: SQLite mode requires Astro&#39;s SSR enabled. If you&#39;re seeing errors, you may be in static mode. </p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($setup.apiError) {
    _push(`<div class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" data-v-a3914654><p data-v-a3914654>${ssrInterpolate($setup.apiErrorMessage)}</p><p class="text-sm mt-1" data-v-a3914654>Defaulting to localStorage mode.</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="mb-6" data-v-a3914654><form class="flex gap-2" data-v-a3914654><input${ssrRenderAttr("value", $setup.newTodo)} placeholder="Add a new task..." class="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required data-v-a3914654><button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" data-v-a3914654> Add </button></form></div>`);
  if (!$setup.todos.length) {
    _push(`<div class="text-center py-6 text-gray-500" data-v-a3914654> No tasks yet. Add your first task above! </div>`);
  } else {
    _push(`<div data-v-a3914654><ul class="space-y-2" data-v-a3914654><!--[-->`);
    ssrRenderList($setup.todos, (todo) => {
      _push(ssrRenderComponent($setup["TodoItem"], {
        key: todo.id,
        todo: todo,
        onToggle: $event => ($setup.toggleTodo(todo.id)),
        onDelete: $event => ($setup.deleteTodo(todo.id))
      }, null, _parent));
    });
    _push(`<!--]--></ul><div class="mt-4 flex justify-between text-sm text-gray-600" data-v-a3914654><span data-v-a3914654>${
      ssrInterpolate($setup.activeTodosCount)
    } items left</span><button${
      (ssrIncludeBooleanAttr(!$setup.completedTodosCount)) ? " disabled" : ""
    } class="${
      ssrRenderClass([{ 'opacity-50 cursor-not-allowed': !$setup.completedTodosCount }, "text-blue-500 hover:underline focus:outline-none"])
    }" data-v-a3914654> Clear completed </button></div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/TodoList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const TodoList = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-a3914654"]]);

const $$Astro = createAstro("https://jasperyong.com");
const $$250322VuejsTodolist = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$250322VuejsTodolist;
  const title = "Vue.js Todo List";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <h1 class="text-3xl font-bold mb-8 text-center">${title}</h1> <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"> ${renderComponent($$result2, "TodoList", TodoList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/vue/TodoList.vue", "client:component-export": "default" })} </div> <div class="mt-8 text-center text-gray-600"> <p>Built with Vue.js 3, Pinia, and Astro</p> </div> <div class="max-w-3xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow text-left"> <h2 class="text-2xl font-bold mb-4">Implementation Process</h2> <div class="space-y-6"> <section> <h3 class="text-xl font-semibold text-blue-700">1. Project Structure</h3> <p class="mt-2">This Todo List application demonstrates Vue.js integration with Astro, using several important files:</p> <ul class="list-disc ml-6 mt-2 space-y-1"> <li><code>src/pages/sketches/2025/250322-vuejs-todolist.astro</code> - Main Astro page</li> <li><code>src/components/vue/TodoList.vue</code> - Parent Vue component</li> <li><code>src/components/vue/TodoItem.vue</code> - Child Vue component</li> <li><code>src/stores/todo.js</code> - Pinia store for state management</li> <li><code>src/pinia-plugin.js</code> - Pinia initialization for Astro</li> <li><code>src/services/db.js</code> - [x] SQLite database service</li> </ul> </section> <section> <h3 class="text-xl font-semibold text-blue-700">2. Vue.js Components</h3> <p class="mt-2">The application uses two Vue components:</p> <ul class="list-disc ml-6 mt-2 space-y-2"> <li> <strong>TodoList.vue</strong>: The parent component that handles:
<ul class="list-circle ml-6 mt-1"> <li>Todo creation form with <code>v-model</code> for two-way binding</li> <li>Rendering the list of todos using <code>v-for</code></li> <li>Conditional rendering with <code>v-if</code>/<code>v-else</code></li> <li>Lifecycle hooks (<code>onMounted</code>) to load todos</li> </ul> </li> <li> <strong>TodoItem.vue</strong>: A child component that:
<ul class="list-circle ml-6 mt-1"> <li>Receives todo data via props</li> <li>Emits events using <code>$emit</code> for toggle/delete actions</li> <li>Uses dynamic styling with <code>:class</code> binding</li> </ul> </li> </ul> </section> <section> <h3 class="text-xl font-semibold text-blue-700">3. State Management with Pinia</h3> <p class="mt-2">Pinia provides reactive state management:</p> <ul class="list-disc ml-6 mt-2 space-y-1"> <li>State: Todo items array</li> <li>Getters: Computed properties for filtering todos</li> <li>Actions: Methods to add, toggle, delete, and clear todos</li> <li>Persistence: Saving to localStorage (and optionally SQLite)</li> </ul> </section> <section> <h3 class="text-xl font-semibold text-blue-700">4. Astro Integration</h3> <p class="mt-2">Astro seamlessly integrates with Vue:</p> <ul class="list-disc ml-6 mt-2 space-y-1"> <li>Uses <code>client:load</code> directive to hydrate Vue components</li> <li>Provides static HTML for fast initial loading</li> <li>Handles Vue component initialization and state</li> </ul> </section> <section> <h3 class="text-xl font-semibold text-blue-700">5. SQLite Implementation</h3> <p class="mt-2">For persistent local storage, the SQLite database:</p> <ul class="list-disc ml-6 mt-2 space-y-1"> <li>Uses <code>better-sqlite3</code> for efficient database operations</li> <li>Creates a local <code>todos.db</code> file in the <code>db</code> directory</li> <li>Provides CRUD operations through the <code>TodoDB</code> service</li> <li>Converts between JavaScript objects and SQLite formats</li> </ul> <p class="mt-2 text-amber-600 font-medium">⚠️ Important Note:</p> <p class="ml-6">SQLite integration only works in server environments (Node.js), not in client-side browsers. This implementation:</p> <ul class="list-disc ml-8 mt-1 space-y-1"> <li>Works with Astro's SSR mode (<code>output: 'server'</code> in astro.config.mjs)</li> <li>Uses API endpoints to provide data to Vue components</li> <li>Uses file system access which is not available in browser environments</li> </ul> <p class="mt-2">Our implementation demonstrates both approaches with a clean architecture:</p> <ol class="list-decimal ml-6 mt-2 space-y-2"> <li><strong>localStorage store (<code>todo.js</code>)</strong>: Works in client-side browsers</li> <li><strong>API-based SQLite store (<code>todo-sqlite.js</code>)</strong>: Communicates with server-side API endpoints</li> <li><strong>API endpoints (<code>/api/todos.json.js</code>)</strong>: Server-side code that interacts with SQLite</li> <li><strong>Storage switcher</strong>: UI component to toggle between both implementations</li> </ol> <p class="mt-2">This architecture follows best practices by:</p> <ul class="list-disc ml-6 mt-2 space-y-1"> <li>Separating client-side and server-side code</li> <li>Using API endpoints for database operations</li> <li>Providing graceful fallback to localStorage if server-side features aren't available</li> <li>Implementing proper error handling for a seamless user experience</li> </ul> </section> </div> </div> <!-- explain the whole implement process here --> </div> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250322-vuejs-todolist.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250322-vuejs-todolist.astro";
const $$url = "/sketches/2025/250322-vuejs-todolist";

const __vite_glob_0_13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250322VuejsTodolist,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_13 as _ };
