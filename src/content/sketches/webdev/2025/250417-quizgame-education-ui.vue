<!-- 
  Quiz UI component for the children's educational game
  Displays question, options, and handles user interaction
-->
<template>
  <div class="flex flex-col items-center">
    <!-- Back button -->
    <button @click="$emit('back')" class="absolute left-4 w-10 h-10 flex items-center justify-center bg-transparent text-slate-600 text-3xl">
      <span class="back-arrow">←</span>
    </button>
    
    <!-- Progress and Score -->
    <div class="w-full flex justify-between items-center mt-2 mb-4">
      <div class="text-lg font-semibold text-slate-700">
        Question {{ questionNumber }} of 8
      </div>
      <div class="flex items-center">
        <span class="text-2xl mr-2">⭐</span>
        <span class="text-xl font-bold text-amber-600">{{ score }}</span>
      </div>
    </div>
    
    <!-- Timer -->
    <div class="w-full mb-4">
      <div class="flex justify-between mb-1">
        <span class="text-sm font-medium text-slate-700">Time: {{ timeLeft }}s</span>
        <span class="text-sm font-medium text-slate-700" v-if="timeLeft > 6">+2 ⭐</span>
        <span class="text-sm font-medium text-slate-700" v-else-if="timeLeft > 0">+1 ⭐</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="h-3 rounded-full transition-all duration-200 ease-out"
          :class="timeLeft > 6 ? 'bg-green-500' : 'bg-orange-500'"
          :style="{ width: `${(timeLeft / maxTime) * 100}%` }"
        ></div>
      </div>
    </div>
    
    <!-- Question -->
    <h2 class="text-3xl font-semibold text-slate-700 mb-6">{{ question }}</h2>
    
    <!-- Answer display -->
    <div class="bg-amber-100 rounded-xl p-4 w-full max-w-sm mx-auto mb-6 flex flex-col items-center shadow-md">
      <div class="mb-2 p-4">
        <img :src="image" :alt="answer" class="w-12 h-12" />
      </div>
      <div class="text-2xl font-bold text-slate-700">{{ answer }}</div>
    </div>
    
    <!-- Options -->
    <div class="grid grid-cols-3 gap-4 w-full mt-4">
      <button 
        v-for="option in options" 
        :key="option"
        @click="selectOption(option)"
        :disabled="selectedOption !== null"
        :class="[
          'py-4 px-6 rounded-xl bg-orange-200 text-slate-700 text-xl font-bold shadow-md transition-colors', 
          { 
            // Selected and correct - show green
            '!bg-green-300 transform scale-105': selectedOption === option && option === correctOption,
            // Not selected but is correct answer - after user selects show green
            'bg-green-300': selectedOption !== null && option === correctOption && selectedOption !== option,
            // Selected but wrong - show red
            'bg-red-300': selectedOption === option && option !== correctOption,
            // Hover effect only when nothing selected
            'hover:bg-orange-300': selectedOption === null
          }
        ]"
      >
        {{ option }}
      </button>
    </div>
    
    <!-- Star animation for correct answers -->
    <div v-if="showStars" class="stars-container">
      <div v-for="i in earnedStars" :key="i" class="star">⭐</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    score: {
      type: Number,
      default: 0
    },
    questionNumber: {
      type: Number,
      default: 1
    }
  },
  
  data() {
    return {
      selectedOption: null,
      correctOption: null,
      timeLeft: 10,
      maxTime: 10,
      timerId: null,
      showStars: false,
      earnedStars: 0
    };
  },
  
  mounted() {
    this.startTimer();
    // Calculate correct option when component mounts
    this.determineCorrectOption();
  },
  
  watch: {
    // Reset when question changes
    answer() {
      this.resetQuestion();
    },
    // Recalculate correct option when options change
    options: {
      handler() {
        this.determineCorrectOption();
      },
      immediate: true
    }
  },
  
  beforeUnmount() {
    this.clearTimer();
  },
  
  methods: {
    startTimer() {
      this.clearTimer();
      this.timeLeft = this.maxTime;
      
      this.timerId = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          this.handleTimeout();
        }
      }, 1000);
    },
    
    clearTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },
    
    handleTimeout() {
      this.clearTimer();
      if (this.selectedOption === null) {
        // Time's up and no answer selected
        this.$emit('timeout');
        setTimeout(() => {
          this.$emit('next');
        }, 1500);
      }
    },
    
    selectOption(option) {
      if (this.selectedOption !== null) return; // Prevent multiple selections
      
      this.selectedOption = option;
      this.clearTimer();
      
      // Check if the selected option is correct
      const isCorrect = option === this.correctOption;
      let starsEarned = 0;
      
      if (isCorrect) {
        // Base stars for correct answer
        starsEarned += 3;
        
        // Bonus stars based on time
        if (this.timeLeft > 6) {
          starsEarned += 2;
        } else if (this.timeLeft > 0) {
          starsEarned += 1;
        }
        
        this.earnedStars = starsEarned;
        this.showStars = true;
        
        // Hide stars after animation
        setTimeout(() => {
          this.showStars = false;
        }, 1500);
      }
      
      // Emit the result to parent
      this.$emit('select', {
        selected: option,
        correct: isCorrect,
        stars: starsEarned
      });
      
      // Reset after delay
      setTimeout(() => {
        this.$emit('next');
      }, 1500);
    },
    
    determineCorrectOption() {
      // Get the correct answer position from the options array
      if (this.options && this.options.length > 0 && this.answer) {
        // We need to find the correct option number in our options array
        // For days and months, the option number is the position (index + 1) in the array
        
        // The answer prop is the actual name (e.g., "Monday", "January")
        // For weeks, we need to find which position in the week array this day is
        if (this.question.includes("Week")) {
          const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          const dayIndex = days.indexOf(this.answer);
          if (dayIndex !== -1) {
            // Find which option corresponds to this index+1
            this.correctOption = this.options.find(opt => opt === dayIndex + 1);
          }
        } 
        // For months, we need to find which position in the months array this month is
        else if (this.question.includes("Month")) {
          const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
          ];
          const monthIndex = months.indexOf(this.answer);
          if (monthIndex !== -1) {
            // Find which option corresponds to this index+1
            this.correctOption = this.options.find(opt => opt === monthIndex + 1);
          }
        }
        
        // If the correct option wasn't found through the above methods
        if (!this.correctOption && this.options.length > 0) {
          // As a fallback, use the first option (before shuffling, this was the correct one)
          this.correctOption = this.options[0];
        }
      }
    },
    
    resetQuestion() {
      this.selectedOption = null;
      this.determineCorrectOption();
      this.showStars = false;
      this.startTimer();
    }
  }
};
</script>

<style>
/* Star animation */
.stars-container {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.star {
  font-size: 2rem;
  position: absolute;
  animation: float-up 1.5s ease-out forwards;
  opacity: 0;
}

.star:nth-child(1) {
  animation-delay: 0s;
  left: 45%;
}

.star:nth-child(2) {
  animation-delay: 0.2s;
  left: 48%;
}

.star:nth-child(3) {
  animation-delay: 0.4s;
  left: 51%;
}

.star:nth-child(4) {
  animation-delay: 0.6s;
  left: 54%;
}

.star:nth-child(5) {
  animation-delay: 0.8s;
  left: 57%;
}

@keyframes float-up {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-80px);
    opacity: 0;
  }
}
</style> 