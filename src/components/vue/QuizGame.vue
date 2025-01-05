<template>
    <div>
        <!-- Quiz Questions -->
        <div v-if="currentQuestionIndex < questions.length">
            <h2>{{ questions[currentQuestionIndex].question }}</h2>
            <ul>
                <li v-for="option in questions[currentQuestionIndex].options" :key="option">
                    <button @click="selectAnswer(option)">{{ option }}</button>
                </li>
            </ul>
        </div>

        <!-- User Data Form -->
        <div v-else>
            <form @submit.prevent="submitQuiz">
                <input v-model="userData.fullName" placeholder="Full Name" required />
                <input v-model="userData.email" type="email" placeholder="Email" required />
                <!-- Additional fields can be added here... -->
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Define reactive variables for quiz data and user responses
const questions = ref([
    {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        sound: 'path/to/sound.mp3' // Optional sound for the question
    },
    {
        id: 2,
        question: 'What is the capital of Mongolia?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        sound: 'path/to/sound.mp3' // Optional sound for the question
    },
    {
        id: 3,
        question: 'What is the capital of UK?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        sound: 'path/to/sound.mp3' // Optional sound for the question
    },
    {
        id: 4,
        question: 'What is the capital of Malaysia?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        sound: 'path/to/sound.mp3' // Optional sound for the question
    },
    {
        id: 5,
        question: 'What is the capital of Russia?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        sound: 'path/to/sound.mp3' // Optional sound for the question
    },
    
]);

const currentQuestionIndex = ref(0);
const userAnswers = ref([]);
const score = ref(0);
const userData = reactive({
    fullName: '',
    email: '',
    // Additional fields can be added here...
});

// Define methods to handle the quiz flow
const selectAnswer = (option) => {
    userAnswers.value.push(option);

    // Check if the answer is correct
    if (option === questions.value[currentQuestionIndex.value].correctAnswer) {
        score.value++;
    }

    // Play sound if available
    playSound(questions.value[currentQuestionIndex.value].sound);

    // Move to the next question
    currentQuestionIndex.value++;
};

const playSound = (soundPath) => {
    if (soundPath) {
        try {
            const audio = new Audio(soundPath);
            audio.play();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }
};

const submitQuiz = () => {
    const quizResult = {
        score: score.value,
        totalQuestions: questions.value.length,
        userAnswers: userAnswers.value,
        userData: { ...userData },
    };

    // Send data to your server or API endpoint
    sendData(quizResult);
};

const sendData = (data) => {
    // Example of sending data using fetch (you could also use axios)
    fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Quiz submitted successfully:', response);
        })
        .catch((error) => {
            console.error('There was an error submitting the quiz:', error);
            console.log(data)
        });
};
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>