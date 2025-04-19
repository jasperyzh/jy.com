<!-- 
  Main Vue component for the children's educational game
  Handles the main game logic and state
-->
<template>
  <div class="bg-amber-50 p-8 rounded-2xl max-w-md mx-auto" style="height: 100%; min-height: 500px;">
    <!-- Home screen -->
    <div v-if="currentScreen === 'home'" class="flex flex-col items-center">
      <h1 class="text-4xl font-bold text-slate-700 mb-8">LearnLand</h1>
      
      <div class="grid grid-cols-1 gap-6">
        <button 
          @click="startGame('weeks')" 
          class="py-4 px-6 rounded-xl shadow-md transition-all duration-300 w-full bg-green-100 hover:bg-green-200"
        >
          <div class="flex items-center">
            <img src="/images/fox.svg" alt="Fox" class="w-12 h-12 mr-4" />
            <span class="text-2xl text-slate-700">Weeks</span>
          </div>
        </button>
        
        <button 
          @click="startGame('months')" 
          class="py-4 px-6 rounded-xl shadow-md transition-all duration-300 w-full bg-yellow-100 hover:bg-yellow-200"
        >
          <div class="flex items-center">
            <img src="/images/dino.svg" alt="Dinosaur" class="w-12 h-12 mr-4" />
            <span class="text-2xl text-slate-700">Months</span>
          </div>
        </button>
      </div>
      
      <!-- High Score -->
      <div class="mt-8 mb-4 p-4 bg-white rounded-xl shadow-md w-full">
        <h2 class="text-xl font-bold text-center text-slate-700 mb-2">High Scores</h2>
        <div class="flex justify-between">
          <div class="text-center">
            <div class="text-sm font-medium text-slate-500">Weeks</div>
            <div class="text-2xl font-bold text-amber-600 flex items-center justify-center">
              {{ highScores.weeks }} <span class="text-xl ml-1">⭐</span>
            </div>
          </div>
          <div class="text-center">
            <div class="text-sm font-medium text-slate-500">Months</div>
            <div class="text-2xl font-bold text-amber-600 flex items-center justify-center">
              {{ highScores.months }} <span class="text-xl ml-1">⭐</span>
            </div>
          </div>
        </div>
      </div>
      
      <nav class="mt-4 flex justify-center space-x-8">
        <button class="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <span class="text-2xl">📚</span>
        </button>
        <button class="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <span class="text-2xl">🏠</span>
        </button>
        <button class="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <span class="text-2xl">🏆</span>
        </button>
      </nav>
    </div>
    
    <!-- Month question screen -->
    <quiz-ui 
      v-if="currentScreen === 'months' && !showResults"
      :question="'Which Month is it?'"
      :answer="currentMonth.name"
      :options="monthOptions"
      :image="currentMonth.image"
      :score="currentScore"
      :question-number="currentQuestionNum"
      @select="handleAnswerSelected"
      @next="nextQuestion"
      @timeout="handleTimeout"
      @back="confirmExit"
    />
    
    <!-- Week question screen -->
    <quiz-ui 
      v-if="currentScreen === 'weeks' && !showResults"
      :question="'Which Week is it?'"
      :answer="currentDay.name"
      :options="dayOptions"
      :image="currentDay.image"
      :score="currentScore"
      :question-number="currentQuestionNum"
      @select="handleAnswerSelected"
      @next="nextQuestion"
      @timeout="handleTimeout"
      @back="confirmExit"
    />
    
    <!-- Results screen -->
    <div v-if="showResults" class="flex flex-col items-center">
      <button @click="goToHome" class="absolute left-4 w-10 h-10 flex items-center justify-center bg-transparent text-slate-600 text-3xl">
        <span class="back-arrow">←</span>
      </button>
      
      <h2 class="text-3xl font-bold text-slate-700 mt-6 mb-4">Quiz Complete!</h2>
      
      <div class="score-display bg-white rounded-xl shadow-md p-6 w-full mb-6">
        <div class="text-center mb-4">
          <div class="text-4xl font-bold text-amber-600 flex items-center justify-center">
            {{ currentScore }} <span class="text-3xl ml-2">⭐</span>
          </div>
          <div class="text-lg text-slate-600 mt-1">Total Stars</div>
        </div>
        
        <div class="stats grid grid-cols-2 gap-4">
          <div class="stat-item text-center p-2 bg-amber-50 rounded-lg">
            <div class="text-sm text-slate-600">Correct Answers</div>
            <div class="text-2xl font-bold text-slate-700">{{ stats.correctAnswers }}/8</div>
          </div>
          <div class="stat-item text-center p-2 bg-amber-50 rounded-lg">
            <div class="text-sm text-slate-600">Speed Bonus</div>
            <div class="text-2xl font-bold text-slate-700">{{ stats.speedBonus }} ⭐</div>
          </div>
        </div>
        
        <div v-if="isHighScore" class="mt-4 p-2 bg-yellow-100 rounded-lg text-center">
          <div class="text-lg font-bold text-amber-700">New High Score! 🎉</div>
        </div>
      </div>
      
      <div class="flex justify-center space-x-4 w-full">
        <button 
          @click="playAgain" 
          class="py-3 px-5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-md flex-1 max-w-xs"
        >
          Play Again
        </button>
        <button 
          @click="goToHome" 
          class="py-3 px-5 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-bold transition-colors shadow-md flex-1 max-w-xs"
        >
          Home
        </button>
      </div>
    </div>
    
    <!-- Exit confirmation dialog -->
    <div v-if="showExitDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-sm mx-auto">
        <h3 class="text-xl font-bold text-slate-700 mb-4">Exit Quiz?</h3>
        <p class="mb-6 text-slate-600">Your progress will be lost. Are you sure you want to exit?</p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="showExitDialog = false" 
            class="py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="exitQuiz" 
            class="py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuizUI from './250417-quizgame-education-ui.vue';

export default {
  components: {
    'quiz-ui': QuizUI
  },
  
  data() {
    return {
      currentScreen: 'home', // 'home', 'months', 'weeks'
      currentScore: 0,
      currentQuestionNum: 1,
      maxQuestions: 8,
      showResults: false,
      showExitDialog: false,
      isHighScore: false,
      stats: {
        correctAnswers: 0,
        speedBonus: 0
      },
      highScores: {
        weeks: 0,
        months: 0
      },
      
      // Queue of questions for the current session
      questionQueue: [],
      
      // Days of the week data
      days: [
        { name: 'Monday', image: '/images/flag.svg' },
        { name: 'Tuesday', image: '/images/rainbow.svg' },
        { name: 'Wednesday', image: '/images/star.svg' },
        { name: 'Thursday', image: '/images/cloud.svg' },
        { name: 'Friday', image: '/images/sun.svg' },
        { name: 'Saturday', image: '/images/tree.svg' },
        { name: 'Sunday', image: '/images/flower.svg' }
      ],
      currentDay: null,
      
      // Months data
      months: [
        { name: 'January', image: '/images/flower.svg' },
        { name: 'February', image: '/images/heart.svg' },
        { name: 'March', image: '/images/kite.svg' },
        { name: 'April', image: '/images/umbrella.svg' },
        { name: 'May', image: '/images/flower.svg' },
        { name: 'June', image: '/images/sun.svg' },
        { name: 'July', image: '/images/flag.svg' },
        { name: 'August', image: '/images/beach.svg' },
        { name: 'September', image: '/images/apple.svg' },
        { name: 'October', image: '/images/pumpkin.svg' },
        { name: 'November', image: '/images/leaf.svg' },
        { name: 'December', image: '/images/snowflake.svg' }
      ],
      currentMonth: null,
    };
  },
  
  mounted() {
    // Load high scores from localStorage
    this.loadHighScores();
  },
  
  computed: {
    dayOptions() {
      // Generate 3 numbers (including correct answer)
      const correctIndex = this.days.findIndex(day => day.name === this.currentDay.name);
      const options = [correctIndex + 1]; // +1 because we don't want to show 0-based index
      
      while (options.length < 3) {
        const randomNum = Math.floor(Math.random() * 7) + 1;
        if (!options.includes(randomNum)) {
          options.push(randomNum);
        }
      }
      
      // Shuffle the options
      return this.shuffleArray(options);
    },
    
    monthOptions() {
      // Generate 3 numbers (including correct answer)
      const correctIndex = this.months.findIndex(month => month.name === this.currentMonth.name);
      const options = [correctIndex + 1]; // +1 because we don't want to show 0-based index
      
      while (options.length < 3) {
        const randomNum = Math.floor(Math.random() * 12) + 1;
        if (!options.includes(randomNum)) {
          options.push(randomNum);
        }
      }
      
      // Shuffle the options
      return this.shuffleArray(options);
    }
  },
  
  methods: {
    startGame(type) {
      this.currentScreen = type;
      this.currentScore = 0;
      this.currentQuestionNum = 1;
      this.showResults = false;
      this.stats = {
        correctAnswers: 0,
        speedBonus: 0
      };
      
      // Generate queue of 8 random questions
      this.questionQueue = [];
      
      if (type === 'weeks') {
        // Create a queue of 8 random days (may include duplicates)
        for (let i = 0; i < this.maxQuestions; i++) {
          this.questionQueue.push(this.getRandomItem(this.days));
        }
        this.currentDay = this.questionQueue[0];
      } else if (type === 'months') {
        // Create a queue of 8 random months (may include duplicates)
        for (let i = 0; i < this.maxQuestions; i++) {
          this.questionQueue.push(this.getRandomItem(this.months));
        }
        this.currentMonth = this.questionQueue[0];
      }
      
      // Play a sound to start the game
      this.playSound('start');
    },
    
    nextQuestion() {
      if (this.currentQuestionNum < this.maxQuestions) {
        this.currentQuestionNum++;
        
        // Get the next question from the queue
        if (this.currentScreen === 'weeks') {
          this.currentDay = this.questionQueue[this.currentQuestionNum - 1];
        } else if (this.currentScreen === 'months') {
          this.currentMonth = this.questionQueue[this.currentQuestionNum - 1];
        }
      } else {
        // End of quiz
        this.endQuiz();
      }
    },
    
    handleAnswerSelected(result) {
      // Update score based on result
      this.currentScore += result.stars;
      
      if (result.correct) {
        this.stats.correctAnswers++;
        // Track speed bonus separately for stats
        if (result.stars > 3) {
          this.stats.speedBonus += (result.stars - 3);
        }
      }
      
      // Play appropriate sound
      if (result.correct) {
        this.playSound('correct');
      } else {
        this.playSound('wrong');
      }
    },
    
    handleTimeout() {
      // Handle time running out (no answer selected)
      this.playSound('wrong');
    },
    
    endQuiz() {
      this.showResults = true;
      
      // Check if this is a high score
      const category = this.currentScreen;
      if (this.currentScore > this.highScores[category]) {
        this.highScores[category] = this.currentScore;
        this.isHighScore = true;
        this.saveHighScores();
        
        // Play special high score sound
        this.playSound('perfect');
      } else {
        // Play regular completion sound
        this.playSound('complete');
      }
      
      // Trigger confetti effect
      setTimeout(() => {
        if (typeof createConfetti === 'function') {
          createConfetti();
        }
      }, 500);
    },
    
    confirmExit() {
      this.showExitDialog = true;
    },
    
    exitQuiz() {
      this.showExitDialog = false;
      this.goToHome();
    },
    
    playAgain() {
      this.startGame(this.currentScreen);
    },
    
    goToHome() {
      this.currentScreen = 'home';
      this.showResults = false;
      this.showExitDialog = false;
    },
    
    loadHighScores() {
      // Load high scores from localStorage if available
      try {
        const savedScores = localStorage.getItem('learnland-high-scores');
        if (savedScores) {
          this.highScores = JSON.parse(savedScores);
        }
      } catch (e) {
        console.error('Error loading high scores:', e);
      }
    },
    
    saveHighScores() {
      // Save high scores to localStorage
      try {
        localStorage.setItem('learnland-high-scores', JSON.stringify(this.highScores));
      } catch (e) {
        console.error('Error saving high scores:', e);
      }
    },
    
    getRandomItem(array) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },
    
    shuffleArray(array) {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    },
    
    playSound(type) {
      // Play sound using the existing audioPlayer utility
      if (window.audioPlayer && window.audioPlayer.initialized) {
        if (type === 'start') {
          // You can define additional sound types in the audio player if needed
          window.audioPlayer.playCorrect(); // Reuse correct sound for now
        } else if (type === 'correct') {
          window.audioPlayer.playCorrect();
        } else if (type === 'wrong') {
          window.audioPlayer.playWrong();
        } else if (type === 'complete') {
          window.audioPlayer.playComplete();
        } else if (type === 'perfect') {
          window.audioPlayer.playPerfect();
        }
      }
    }
  }
};
</script>

<style>
/* No longer using @apply - moved all styling to the template */
</style> 