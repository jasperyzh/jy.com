<template>
  <div id="memory-game">
    <div v-if="!gameStarted" class="overlay">
      <div class="overlay-content">
        <h1>Memory Card Game</h1>
        <p>Match all the pairs as quickly as possible!</p>
        <button @click="startGame">Start Game</button>
      </div>
    </div>

    <div :class="{ 'game-area-disabled': !gameStarted }">
      <h1>Memory Card Game</h1>
      <div class="timer">Time: {{ timer }}s</div>
      <div class="game-board">
        <div
          v-for="(card, index) in shuffledCards"
          :key="index"
          class="card"
          :class="{ flipped: card.isFlipped || card.isMatched, matched: card.isMatched }"
          @click="flipCard(index)"
        >
          <div class="card-front">{{ card.isFlipped || card.isMatched ? card.value : '?' }}</div>
          <div class="card-back">?</div>
        </div>
      </div>
      <div v-if="isGameComplete && gameStarted" class="game-complete-message">
        <h2>Congratulations! You completed the game in {{ timer }} seconds!</h2>
        <button @click="resetGame">Play Again</button>
      </div>
      <div v-else class="game-controls">
        <button @click="resetGame">Reset Game</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { value: 'A', isFlipped: false, isMatched: false },
        { value: 'A', isFlipped: false, isMatched: false },
        { value: 'B', isFlipped: false, isMatched: false },
        { value: 'B', isFlipped: false, isMatched: false },
        { value: 'C', isFlipped: false, isMatched: false },
        { value: 'C', isFlipped: false, isMatched: false },
        { value: 'D', isFlipped: false, isMatched: false },
        { value: 'D', isFlipped: false, isMatched: false },
        { value: 'E', isFlipped: false, isMatched: false },
        { value: 'E', isFlipped: false, isMatched: false },
        { value: 'F', isFlipped: false, isMatched: false },
        { value: 'F', isFlipped: false, isMatched: false },
      ],
      shuffledCards: [],
      flippedCards: [],
      timer: 0,
      timerInterval: null,
      gameStarted: false,
    };
  },
  computed: {
    isGameComplete() {
      return this.shuffledCards.every((card) => card.isMatched);
    },
  },
  methods: {
    shuffleCards() {
      this.shuffledCards = [...this.cards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card }));
    },
    flipCard(index) {
      const card = this.shuffledCards[index];

      if (card.isFlipped || card.isMatched || this.flippedCards.length >= 2 || !this.gameStarted) {
        return;
      }

      card.isFlipped = true;
      this.flippedCards.push({ ...card, index });

      if (this.flippedCards.length === 2) {
        this.checkForMatch();
      }
    },
    checkForMatch() {
      const [card1, card2] = this.flippedCards;
      if (card1.value === card2.value) {
        this.shuffledCards[card1.index].isMatched = true;
        this.shuffledCards[card2.index].isMatched = true;
        this.addMatchEffect(card1.index, card2.index);
      } else {
        setTimeout(() => {
          this.shuffledCards[card1.index].isFlipped = false;
          this.shuffledCards[card2.index].isFlipped = false;
        }, 1000);
      }
      this.flippedCards = [];

      if (this.isGameComplete) {
        clearInterval(this.timerInterval);
      }
    },
    addMatchEffect(index1, index2) {
      setTimeout(() => {
        this.shuffledCards[index1].isMatched = true;
        this.shuffledCards[index2].isMatched = true;
      }, 500);
    },
    resetGame() {
      this.flippedCards = [];
      this.shuffleCards();
      this.timer = 0;
      clearInterval(this.timerInterval);
      this.startTimer();
    },
    startGame() {
      this.gameStarted = true;
      this.shuffleCards();
      this.startTimer();
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timerInterval);
  },
};
</script>

<style scoped>
#memory-game {
  text-align: center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 10;
}

.overlay-content {
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  text-align: center;
}

.game-area-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.timer {
  margin-bottom: 10px;
  font-size: 1.2em;
  font-weight: bold;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 10px;
  justify-content: center;
}

.card {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  perspective: 1000px;
  transition: transform 0.3s;
}

.card.flipped .card-front {
  transform: rotateY(0);
}

.card.flipped .card-back {
  transform: rotateY(180deg);
}

.card.matched {
  background-color: lightgreen;
  transform: scale(1.1);
  transition: transform 0.3s, background-color 0.3s;
}

.card .card-front,
.card .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card .card-front {
  background-color: white;
  transform: rotateY(180deg);
}

.card .card-back {
  background-color: lightblue;
}

.game-controls {
  margin-top: 20px;
}

.game-complete-message {
  margin-top: 20px;
}
</style>
