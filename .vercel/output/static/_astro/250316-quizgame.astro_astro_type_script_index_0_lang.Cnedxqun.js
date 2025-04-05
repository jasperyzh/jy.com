import{a as t}from"./custom-tone.Bi7vN0l5.js";import{c as T,r as i,a as h,o as f}from"./runtime-dom.esm-bundler.D5Xpk69B.js";function E(){const l=document.getElementById("confetti-container");if(!l)return;const r=["#667eea","#764ba2","#48bb78","#38a169","#f56565","#e53e3e","#fbd38d","#ed8936"],n=200;l.innerHTML="";for(let a=0;a<n;a++){const e=document.createElement("div"),o=Math.random()*10+5;e.style.position="absolute",e.style.width=`${o}px`,e.style.height=`${o}px`,e.style.backgroundColor=r[Math.floor(Math.random()*r.length)],e.style.borderRadius=Math.random()>.5?"50%":"0",e.style.opacity=`${Math.random()*.8+.2}`,e.style.left=`${Math.random()*100}vw`,e.style.top=`-${o}px`,e.style.transform=`rotate(${Math.random()*360}deg)`;const c=Math.random()*3+2,u=Math.random()*2;e.style.animation=`fall ${c}s ease-in ${u}s forwards`,l.appendChild(e),setTimeout(()=>{e.remove()},(c+u)*1e3)}if(!document.getElementById("confetti-animation")){const a=document.createElement("style");a.id="confetti-animation",a.textContent=`
                        @keyframes fall {
                            0% { transform: translateY(0) rotate(0deg); }
                            100% { transform: translateY(100vh) rotate(720deg); }
                        }
                    `,document.head.appendChild(a)}}const L={setup(){const l=[{question:"What is the capital of France?",options:["Paris","London","Berlin","Madrid"],correctAnswer:"Paris"},{question:"Which planet is known as the Red Planet?",options:["Venus","Mars","Jupiter","Saturn"],correctAnswer:"Mars"},{question:"What is the largest mammal in the world?",options:["Elephant","Blue Whale","Giraffe","Hippopotamus"],correctAnswer:"Blue Whale"},{question:"Which element has the chemical symbol 'O'?",options:["Gold","Oxygen","Osmium","Oganesson"],correctAnswer:"Oxygen"},{question:"Who wrote 'Romeo and Juliet'?",options:["Charles Dickens","William Shakespeare","Jane Austen","Mark Twain"],correctAnswer:"William Shakespeare"}],r=i("start"),n=i(0),a=i(0),e=i(4),o=i(!1),c=i(""),u=i(null),v=i(""),m=i([]),y=i(null),g=i(0),b=h(()=>l[n.value]),k=h(()=>n.value/l.length*100+"%"),z=h(()=>e.value/4*100+"%");f(()=>{console.log("Quiz component mounted");const s=document.querySelector(".start-screen button");s&&s.addEventListener("click",async()=>{if(!t.initialized)try{await t.init(),t.setVolume(.4),console.log("Audio initialized on start button click")}catch(p){console.error("Failed to initialize audio:",p)}})});const A=()=>{r.value="playing",n.value=0,a.value=0,w()},w=()=>{e.value=4,clearInterval(u.value),u.value=setInterval(()=>{e.value--,e.value<=0&&Q()},1e3)},Q=()=>{clearInterval(u.value),o.value||(o.value=!0,setTimeout(()=>{S()},1500))},x=s=>{o.value||(c.value=s,o.value=!0,clearInterval(u.value),s===b.value.correctAnswer?(a.value++,t.initialized&&t.playCorrect()):t.initialized&&t.playWrong(),setTimeout(()=>{S()},1500))},S=()=>{o.value=!1,c.value="",n.value<l.length-1?(n.value++,w()):M()},M=()=>{clearInterval(u.value),r.value="result",t.initialized&&(a.value===l.length?t.playPerfect():t.playComplete()),setTimeout(()=>{E()},500)},q=()=>{if(!v.value.trim()){alert("Please enter your name");return}const s=[...m.value];s.push({name:v.value,score:a.value,date:new Date().toLocaleDateString()}),s.sort((d,I)=>I.score-d.score),m.value=s,y.value=s.findIndex(d=>d.name===v.value&&d.score===a.value)+1;const p=s.filter(d=>d.name===v.value);g.value=p.length>0?Math.max(...p.map(d=>d.score)):0,r.value="leaderboard"},C=()=>{r.value="start"};return f(()=>{m.value=[{name:"Alice",score:5,date:"2025-03-15"},{name:"Bob",score:4,date:"2025-03-14"},{name:"Charlie",score:3,date:"2025-03-13"},{name:"David",score:2,date:"2025-03-12"},{name:"Eve",score:1,date:"2025-03-11"}]}),f(()=>()=>clearInterval(u.value)),{gameState:r,currentQuestionIndex:n,currentQuestion:b,score:a,timeLeft:e,isFlipped:o,selectedAnswer:c,progressPercentage:k,timeProgress:z,userName:v,leaderboard:m,userRank:y,userTopScore:g,questions:l,startQuiz:A,selectAnswer:x,submitScore:q,restartQuiz:C}},template:`
                    <div class="quiz-container">
                        <!-- Start Screen -->
                        <div v-if="gameState === 'start'" class="start-screen">
                            <h2>Flash Card Quiz</h2>
                            <p>Test your knowledge with 5 questions. You have 4 seconds to answer each question.</p>
                            <p>1 point for each correct answer. Good luck!</p>
                            <button @click="startQuiz">Start Quiz</button>
                        </div>

                        <!-- Playing Screen -->
                        <div v-if="gameState === 'playing'" class="playing-screen">
                            <div class="progress-bar">
                                <div class="progress" :style="{ width: progressPercentage }"></div>
                            </div>
                            <div class="question-counter">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</div>
                            
                            <div class="timer">
                                <div>Time left: {{ timeLeft }}s</div>
                                <div class="progress-bar">
                                    <div class="progress" :style="{ width: timeProgress }"></div>
                                </div>
                            </div>
                            
                            <div class="card" :class="{ flipped: isFlipped }">
                                <div class="card-inner">
                                    <div class="card-front">
                                        <div>{{ currentQuestion.question }}</div>
                                    </div>
                                    <div class="card-back">
                                        <div>Answer: {{ currentQuestion.correctAnswer }}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="answer-buttons">
                                <button 
                                    v-for="option in currentQuestion.options" 
                                    :key="option"
                                    @click="selectAnswer(option)"
                                    :disabled="isFlipped"
                                    :class="{ 
                                        'correct': isFlipped && option === currentQuestion.correctAnswer,
                                        'incorrect': isFlipped && option === selectedAnswer && option !== currentQuestion.correctAnswer
                                    }"
                                >
                                    {{ option }}
                                </button>
                            </div>
                        </div>

                        <!-- Result Screen -->
                        <div v-if="gameState === 'result'" class="result-screen">
                            <h2>Quiz Completed!</h2>
                            <div class="score-display">
                                Your Score: {{ score }} / {{ questions.length }}
                            </div>
                            <div class="name-input">
                                <label for="user-name">Enter your name to submit your score:</label>
                                <input 
                                    id="user-name" 
                                    v-model="userName" 
                                    type="text" 
                                    placeholder="Your Name"
                                />
                            </div>
                            <div class="controls">
                                <button @click="submitScore">Submit Score</button>
                                <button @click="restartQuiz">Try Again</button>
                            </div>
                        </div>

                        <!-- Leaderboard Screen -->
                        <div v-if="gameState === 'leaderboard'" class="leaderboard">
                            <h2>Leaderboard</h2>
                            <div class="user-stats">
                                <p>Your Score: {{ score }} / {{ questions.length }}</p>
                                <p>Your Top Score: {{ userTopScore }}</p>
                                <p>Your Rank: {{ userRank }}</p>
                            </div>
                            <table class="leaderboard-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Score</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(entry, index) in leaderboard" :key="index"
                                        :class="{ 'user-row': entry.name === userName && entry.score === score }">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ entry.name }}</td>
                                        <td>{{ entry.score }}</td>
                                        <td>{{ entry.date }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="controls">
                                <button @click="restartQuiz">Play Again</button>
                                <button @click="() => window.location.href = '/'">Back to Home</button>
                            </div>
                        </div>
                    </div>
                `};document.addEventListener("DOMContentLoaded",()=>{T(L).mount("#quiz-app");const r=document.getElementById("volume-slider"),n=document.getElementById("mute-toggle");if(r&&n){const a=async()=>{try{t.initialized||(console.log("Initializing audio on user interaction"),await t.init(),t.setVolume(.4))}catch(e){console.error("Failed to initialize audio:",e)}};r.addEventListener("input",async e=>{await a();const o=e.target;if(!o)return;const c=Number(o.value)/100;t.setVolume(c),n.textContent=c===0?"🔇":"🔊"}),n.addEventListener("click",async()=>{await a(),t.isMuted?(t.unmute(),n.textContent="🔊",r.value=String(t.volume*100)):(t.mute(),n.textContent="🔇")})}});
