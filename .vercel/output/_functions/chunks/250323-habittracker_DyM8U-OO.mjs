import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';
import { useSSRContext, ref, computed, onMounted, watch, mergeProps } from 'vue';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, formatISO, parseISO, isToday, getDate, getDaysInMonth, isSameDay } from 'date-fns';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
/* empty css                                       */
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

// State management for habits

const _sfc_main = {
  __name: 'HabitTracker',
  setup(__props, { expose: __expose }) {
  __expose();

const habits = ref([]);
const newHabitName = ref('');
const newHabitDescription = ref('');
const currentMonth = ref(new Date());

// Calculate days in the current month
const daysInMonth = computed(() => {
  const monthStart = startOfMonth(currentMonth.value);
  const monthEnd = endOfMonth(currentMonth.value);
  return eachDayOfInterval({ start: monthStart, end: monthEnd });
});

// Get formatted month display
const formattedMonth = computed(() => {
  return format(currentMonth.value, 'MMMM yyyy');
});

// Load habits from localStorage
onMounted(() => {
  const savedHabits = localStorage.getItem('habits');
  if (savedHabits) {
    try {
      const parsedHabits = JSON.parse(savedHabits);
      
      // Convert date strings back to valid format for comparison
      parsedHabits.forEach(habit => {
        const historyWithDates = {};
        if (habit.history) {
          Object.keys(habit.history).forEach(dateStr => {
            historyWithDates[dateStr] = habit.history[dateStr];
          });
        }
        habit.history = historyWithDates;
      });
      
      habits.value = parsedHabits;
    } catch (e) {
      console.error('Failed to parse habits from localStorage:', e);
      habits.value = [];
    }
  }
});

// Save habits to localStorage whenever they change
watch(
  habits, 
  (newHabits) => {
    localStorage.setItem('habits', JSON.stringify(newHabits));
  },
  { deep: true }
);

// Add a new habit
const addHabit = () => {
  if (!newHabitName.value.trim()) return;
  
  const newHabit = {
    id: Date.now().toString(), // Simple unique ID
    name: newHabitName.value.trim(),
    description: newHabitDescription.value.trim(),
    history: {}
  };
  
  habits.value.push(newHabit);
  
  // Reset form
  newHabitName.value = '';
  newHabitDescription.value = '';
};

// Remove a habit
const removeHabit = (habitId) => {
  habits.value = habits.value.filter(habit => habit.id !== habitId);
};

// Toggle habit completion for a specific day
const toggleHabitForDay = (habit, day) => {
  const dateKey = formatISO(day, { representation: 'date' });
  
  if (!habit.history[dateKey]) {
    habit.history[dateKey] = true;
  } else {
    habit.history[dateKey] = !habit.history[dateKey];
  }
};

// Check if a habit is marked as completed for a specific day
const isHabitCompletedForDay = (habit, day) => {
  const dateKey = formatISO(day, { representation: 'date' });
  return habit.history[dateKey] === true;
};

// Calculate completion percentage for a habit in the current month
const getHabitCompletionPercentage = (habit) => {
  const totalDays = daysInMonth.value.length;
  let completedDays = 0;
  
  daysInMonth.value.forEach(day => {
    const dateKey = formatISO(day, { representation: 'date' });
    if (habit.history[dateKey]) {
      completedDays++;
    }
  });
  
  return Math.round((completedDays / totalDays) * 100);
};

// Calculate streak (consecutive days completed)
const getHabitStreak = (habit) => {
  // Sort dates in descending order (newest first)
  const completedDates = Object.entries(habit.history)
    .filter(([_, completed]) => completed)
    .map(([dateStr]) => parseISO(dateStr))
    .sort((a, b) => b - a);
  
  if (completedDates.length === 0) return 0;
  
  // Start counting streak from most recent completed date
  let streak = 1;
  let lastDate = completedDates[0];
  
  for (let i = 1; i < completedDates.length; i++) {
    const currentDate = completedDates[i];
    const expectedDate = new Date(lastDate);
    expectedDate.setDate(expectedDate.getDate() - 1);
    
    // Check if dates are consecutive
    if (isSameDay(currentDate, expectedDate)) {
      streak++;
      lastDate = currentDate;
    } else {
      break;
    }
  }
  
  return streak;
};

// Export data functionality
const exportData = () => {
  const dataStr = JSON.stringify(habits.value, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `habit-tracker-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

const __returned__ = { habits, newHabitName, newHabitDescription, currentMonth, daysInMonth, formattedMonth, addHabit, removeHabit, toggleHabitForDay, isHabitCompletedForDay, getHabitCompletionPercentage, getHabitStreak, exportData, ref, computed, onMounted, watch, get format() { return format }, get startOfMonth() { return startOfMonth }, get endOfMonth() { return endOfMonth }, get eachDayOfInterval() { return eachDayOfInterval }, get isSameDay() { return isSameDay }, get getDaysInMonth() { return getDaysInMonth }, get getDate() { return getDate }, get isToday() { return isToday }, get parseISO() { return parseISO }, get formatISO() { return formatISO } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "habit-tracker" }, _attrs))
  }><div class="mb-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"><h2 class="text-xl font-semibold mb-4">Add New Habit</h2><form class="space-y-4"><div><label for="habitName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habit Name</label><input id="habitName"${
    ssrRenderAttr("value", $setup.newHabitName)
  } type="text" placeholder="e.g., Exercise" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600" required></div><div><label for="habitDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label><input id="habitDescription"${
    ssrRenderAttr("value", $setup.newHabitDescription)
  } type="text" placeholder="e.g., 30 mins daily" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"></div><button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"> Add Habit </button></form></div><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-semibold">${
    ssrInterpolate($setup.formattedMonth)
  }</h2></div>`);
  if ($setup.habits.length > 0) {
    _push(`<div class="space-y-8"><!--[-->`);
    ssrRenderList($setup.habits, (habit) => {
      _push(`<div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"><div class="flex justify-between items-start mb-2"><div><h3 class="text-lg font-medium">${ssrInterpolate(habit.name)}</h3>`);
      if (habit.description) {
        _push(`<p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(habit.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center space-x-4"><div class="flex items-center"><div class="mr-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"><div class="bg-green-600 h-2.5 rounded-full" style="${
        ssrRenderStyle({ width: `${$setup.getHabitCompletionPercentage(habit)}%` })
      }"></div></div><span class="text-sm">${
        ssrInterpolate($setup.getHabitCompletionPercentage(habit))
      }%</span></div><div class="flex items-center space-x-1 text-sm text-yellow-600 dark:text-yellow-400"><span class="material-icons-outlined text-sm">⚡</span><span>${
        ssrInterpolate($setup.getHabitStreak(habit))
      }</span></div><button class="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none" title="Delete habit"> 🗑️ </button></div></div><div class="overflow-x-auto"><div class="flex space-x-2 mt-4 min-w-max"><!--[-->`);
      ssrRenderList($setup.daysInMonth, (day) => {
        _push(`<div class="flex flex-col items-center w-10"><span class="${
          ssrRenderClass([{ 'font-bold': $setup.isToday(day) }, "text-xs mb-1"])
        }">${
          ssrInterpolate($setup.getDate(day))
        }</span><button class="${
          ssrRenderClass([{
                  'bg-green-100 dark:bg-green-900 border-green-500': $setup.isHabitCompletedForDay(habit, day),
                  'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600': !$setup.isHabitCompletedForDay(habit, day),
                  'ring-2 ring-blue-500': $setup.isToday(day)
                }, "w-8 h-8 rounded-md flex items-center justify-center border"])
        }">`);
        if ($setup.isHabitCompletedForDay(habit, day)) {
          _push(`<span class="text-green-700 dark:text-green-300">✓</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<div class="p-8 text-center text-gray-500 dark:text-gray-400 border border-dashed rounded-lg"><p>No habits added yet. Start tracking a new habit above!</p></div>`);
  }
  _push(`<div class="mt-8 flex justify-center"><button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"> Export Data </button></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/HabitTracker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const HabitTracker = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro("https://jasperyong.com");
const $$250323Habittracker = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$250323Habittracker;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Habit Tracker", "description": "Track your daily habits and build consistency" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> <h1 class="text-3xl font-bold mb-6 text-center">Habit Tracker</h1> <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> ${renderComponent($$result2, "HabitTracker", HabitTracker, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/vue/HabitTracker.vue", "client:component-export": "default" })} </div> </main> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250323-habittracker.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250323-habittracker.astro";
const $$url = "/sketches/2025/250323-habittracker";

const __vite_glob_0_15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250323Habittracker,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_15 as _ };
