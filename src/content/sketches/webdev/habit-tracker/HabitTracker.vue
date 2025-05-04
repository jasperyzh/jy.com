<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay,
  getDaysInMonth,
  getDate,
  isToday,
  parseISO,
  formatISO
} from 'date-fns';

// State management for habits
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
</script>

<template>
  <div class="habit-tracker">
    <!-- Add Habit Form -->
    <div class="mb-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Add New Habit</h2>
      <form @submit.prevent="addHabit" class="space-y-4">
        <div>
          <label for="habitName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habit Name</label>
          <input
            id="habitName"
            v-model="newHabitName"
            type="text"
            placeholder="e.g., Exercise"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>
        
        <div>
          <label for="habitDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
          <input
            id="habitDescription"
            v-model="newHabitDescription"
            type="text"
            placeholder="e.g., 30 mins daily"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>
        
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Habit
        </button>
      </form>
    </div>
    
    <!-- Monthly Calendar Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">{{ formattedMonth }}</h2>
    </div>
    
    <!-- Habits List with Calendar -->
    <div v-if="habits.length > 0" class="space-y-8">
      <div v-for="habit in habits" :key="habit.id" class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="text-lg font-medium">{{ habit.name }}</h3>
            <p v-if="habit.description" class="text-sm text-gray-600 dark:text-gray-400">{{ habit.description }}</p>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <div class="mr-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  class="bg-green-600 h-2.5 rounded-full" 
                  :style="{ width: `${getHabitCompletionPercentage(habit)}%` }"
                ></div>
              </div>
              <span class="text-sm">{{ getHabitCompletionPercentage(habit) }}%</span>
            </div>
            
            <div class="flex items-center space-x-1 text-sm text-yellow-600 dark:text-yellow-400">
              <span class="material-icons-outlined text-sm">⚡</span>
              <span>{{ getHabitStreak(habit) }}</span>
            </div>
            
            <button 
              @click="removeHabit(habit.id)"
              class="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
              title="Delete habit"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <!-- Calendar Grid for Habit -->
        <div class="overflow-x-auto">
          <div class="flex space-x-2 mt-4 min-w-max">
            <div 
              v-for="day in daysInMonth" 
              :key="day.toISOString()"
              class="flex flex-col items-center w-10"
            >
              <span 
                class="text-xs mb-1"
                :class="{ 'font-bold': isToday(day) }"
              >
                {{ getDate(day) }}
              </span>
              
              <button 
                @click="toggleHabitForDay(habit, day)"
                class="w-8 h-8 rounded-md flex items-center justify-center border"
                :class="{
                  'bg-green-100 dark:bg-green-900 border-green-500': isHabitCompletedForDay(habit, day),
                  'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600': !isHabitCompletedForDay(habit, day),
                  'ring-2 ring-blue-500': isToday(day)
                }"
              >
                <span v-if="isHabitCompletedForDay(habit, day)" class="text-green-700 dark:text-green-300">✓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="p-8 text-center text-gray-500 dark:text-gray-400 border border-dashed rounded-lg">
      <p>No habits added yet. Start tracking a new habit above!</p>
    </div>
    
    <!-- Export Button -->
    <div class="mt-8 flex justify-center">
      <button
        @click="exportData"
        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Export Data
      </button>
    </div>
  </div>
</template>

<style>
/* Any custom styles not covered by Tailwind */
</style>
