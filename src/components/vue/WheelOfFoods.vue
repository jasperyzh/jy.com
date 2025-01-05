<template>
    <div class="wheel-container">
        <div class="wheel" :style="{ transform: `rotate(${rotation}deg)` }">
            <div v-for="(cuisine, index) in cuisines" :key="index" class="segment" :style="getSegmentStyle(index)">
                <span class="segment-text">{{ cuisine }}</span>
            </div>
        </div>
        <div class="pointer"></div>
    </div>

    <button @click="spinWheel" :disabled="isSpinning">Spin the Wheel</button>

    <div v-if="winner" class="result">
        <h2>Winner: {{ winner }}</h2>
        <div class="confetti"></div>
    </div>
    <pre>{{ rotation }}</pre>
</template>

<script>
export default {
    data() {
        return {
            cuisines: [
                "Italian",
                "Chinese",
                "Indian",
                "Mexican",
                "Japanese",
                "Thai",
                "French",
                "Mediterranean"
            ],
            rotation: 0,
            isSpinning: false,
            winner: null,

        };
    },
    methods: {
        getSegmentStyle(index) {
            const segmentAngle = 360 / this.cuisines.length;
            return {
                transform: `rotate(${index * segmentAngle}deg)`,
                backgroundColor: index % 2 === 0 ? "#f8b400" : "#ffe8a1"
            };
        },
        spinWheel() {
            if (this.isSpinning) return;

            this.isSpinning = true;
            this.winner = null;

            const spins = Math.floor(Math.random() * 5) + 5; // Random spins: 5 to 9
            const randomAngle = Math.random() * 360; // Random offset angle
            const totalRotation = spins * 360 + randomAngle;

            const segmentAngle = 360 / this.cuisines.length; // Angle of each segment
            const pointerCorrection = segmentAngle / 2; // Align pointer to the center of a segment
            const initialOffset = -80; // Adjust for initial -90-degree offset

            const finalAngle = (this.rotation + totalRotation) % 360; // Final rotation angle
            const adjustedAngle =
                (finalAngle + pointerCorrection + initialOffset) % 360; // Correct for pointer and offset

            // Calculate the winning segment index
            const winnerIndex = Math.floor(
                (this.cuisines.length - adjustedAngle / segmentAngle) % this.cuisines.length
            );

            this.rotation += totalRotation;

            // Match timeout duration with the CSS transition
            setTimeout(() => {
                this.winner = this.cuisines[winnerIndex];
                this.isSpinning = false;
                this.showConfetti();
            }, 5000);
        },
        showConfetti() {
            const confettiContainer = document.querySelector(".confetti");
            if (!confettiContainer) return;

            confettiContainer.innerHTML = "";
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement("div");
                confetti.className = "confetti-piece";
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.left = Math.random() * 100 + "%";
                confetti.style.animationDelay = Math.random() + "s";
                confettiContainer.appendChild(confetti);
            }

            setTimeout(() => {
                confettiContainer.innerHTML = "";
            }, 3000);
        }
    }
};
</script>

<style scoped>
.wheel-container {
    position: relative;
    margin: 20px auto;
    width: 300px;
    height: 300px;
}

.wheel {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border: 5px solid #333;
    transform-origin: 50% 50%;
    /* transition: transform 5s cubic-bezier(0.17, 0.67, 0.83, 0.67); */

    transition: transform 5s ease-out;
    /* Smooth deceleration */
    overflow: hidden;
}

/* Each segment forms a wedge. */
.segment {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 50% 50%;
    clip-path: polygon(50% 50%, 0% 0%, 50% 0%);
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.segment-text {
    transform: rotate(90deg) translate(-10px, -8px);
    transform-origin: 0% bottom;
    margin-top: 0px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    width: 60px;
}

.pointer {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 25px solid red;
    top: -10px;
    left: 50%;
    transform: translateX(-31%) rotate(-180deg);
    z-index: 10;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
}

.result {
    margin-top: 20px;
    text-align: center;
    position: relative;
}

.confetti {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 999;
}

.confetti-piece {
    position: absolute;
    width: 10px;
    height: 10px;
    animation: fall 3s linear forwards;
    opacity: 0;
}

@keyframes fall {
    0% {
        transform: translateY(-50px) rotate(0deg);
        opacity: 1;
    }

    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
</style>