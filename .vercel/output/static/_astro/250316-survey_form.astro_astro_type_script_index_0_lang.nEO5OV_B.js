import{a as s}from"./custom-tone.Bi7vN0l5.js";import{c as S,r as a,a as r,o as w}from"./runtime-dom.esm-bundler.D5Xpk69B.js";const I={setup(){const t=a(0),n=[["I feel confident using new technology.","I prefer digital communication over in-person meetings.","I believe artificial intelligence will improve our lives significantly.","I am concerned about my online privacy."],["Social media has a positive impact on society.","Remote work is more productive than office work.","Online learning is as effective as traditional classroom learning.","I regularly take breaks from screen time to protect my mental health."]],d=[{value:5,label:"Strongly Agree"},{value:4,label:"Agree"},{value:3,label:"Neutral"},{value:2,label:"Disagree"},{value:1,label:"Strongly Disagree"}],i=a({page1:Array(n[0].length).fill(null),page2:Array(n[1].length).fill(null),userInfo:{email:"",name:"",phone:""}}),p=r(()=>i.value.page1.every(e=>e!==null)),g=r(()=>i.value.page2.every(e=>e!==null)),c=r(()=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value.userInfo.email)),b=a(!1),u=a(!1),m=()=>{l("start"),t.value=1},h=e=>{l("navigation"),t.value=e},f=()=>{c.value&&(l("success"),u.value=!0,t.value=4)},y=()=>{const e=[...i.value.page1,...i.value.page2];return(e.reduce((P,x)=>P+x,0)/e.length).toFixed(1)},k=e=>{const o=d.find(v=>v.value===e);return o?o.label:"Not Answered"},l=e=>{if(s)switch(e){case"start":s.playMelody([{note:"C4",duration:"8n"},{note:"E4",duration:"8n"},{note:"G4",duration:"4n"}]);break;case"navigation":s.playMelody([{note:"E4",duration:"8n"},{note:"G4",duration:"8n"}]);break;case"success":s.playCorrect();break;case"error":s.playMelody([{note:"E4",duration:"8n"},{note:"C4",duration:"4n"}]);break}};return w(()=>{const e=async()=>{try{s&&(await s.init(),s.setVolume(.5),console.log("Audio initialized successfully"))}catch(o){console.error("Audio initialization failed:",o)}};document.addEventListener("click",e,{once:!0})}),{currentPage:t,questions:n,responseOptions:d,responses:i,isPage1Valid:p,isPage2Valid:g,isUserInfoValid:c,showDebug:b,isSubmitted:u,startSurvey:m,goToPage:h,submitSurvey:f,getSatisfactionScore:y,getResponseLabel:k}},template:`
      <div class="survey-container">
        <!-- Welcome Page -->
        <div v-if="currentPage === 0" class="welcome-page">
          <h1>Welcome to Our Survey</h1>
          <div class="card">
            <h2>Your Opinion Matters</h2>
            <p>This survey aims to collect your thoughts on technology and digital life. It will take approximately 3-5 minutes to complete.</p>
            <p>Your responses will help us understand how people interact with and feel about technology in their daily lives.</p>
            <button class="btn btn-primary" @click="startSurvey">Start Survey</button>
          </div>
        </div>
        
        <!-- Questions Page 1 -->
        <div v-if="currentPage === 1" class="questions-page">
          <h2>Part 1: Technology Usage</h2>
          <div class="progress-bar">
            <div class="progress" style="width: 25%"></div>
          </div>
          <div class="card">
            <div v-for="(question, index) in questions[0]" :key="'q1-'+index" class="question-item">
              <h3>{{ index + 1 }}. {{ question }}</h3>
              <div class="options-grid">
                <div 
                  v-for="option in responseOptions" 
                  :key="option.value"
                  class="option-item"
                  :class="{ selected: responses.page1[index] === option.value }"
                  @click="responses.page1[index] = option.value"
                >
                  {{ option.label }}
                </div>
              </div>
            </div>
            <div class="navigation-buttons">
              <button class="btn btn-secondary" @click="goToPage(0)">Back</button>
              <button class="btn btn-primary" @click="goToPage(2)" :disabled="!isPage1Valid">Next</button>
            </div>
          </div>
        </div>
        
        <!-- Questions Page 2 -->
        <div v-if="currentPage === 2" class="questions-page">
          <h2>Part 2: Digital Life</h2>
          <div class="progress-bar">
            <div class="progress" style="width: 50%"></div>
          </div>
          <div class="card">
            <div v-for="(question, index) in questions[1]" :key="'q2-'+index" class="question-item">
              <h3>{{ index + 5 }}. {{ question }}</h3>
              <div class="options-grid">
                <div 
                  v-for="option in responseOptions" 
                  :key="option.value"
                  class="option-item"
                  :class="{ selected: responses.page2[index] === option.value }"
                  @click="responses.page2[index] = option.value"
                >
                  {{ option.label }}
                </div>
              </div>
            </div>
            <div class="navigation-buttons">
              <button class="btn btn-secondary" @click="goToPage(1)">Back</button>
              <button class="btn btn-primary" @click="goToPage(3)" :disabled="!isPage2Valid">Next</button>
            </div>
          </div>
        </div>
        
        <!-- User Info Page -->
        <div v-if="currentPage === 3" class="user-info-page">
          <h2>Almost Done!</h2>
          <div class="progress-bar">
            <div class="progress" style="width: 75%"></div>
          </div>
          <div class="card">
            <p>Please provide your contact information. Only email is required.</p>
            
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                v-model="responses.userInfo.email" 
                placeholder="your@email.com" 
                required
              >
              <div class="form-error" v-if="responses.userInfo.email && !isUserInfoValid">
                Please enter a valid email address
              </div>
            </div>
            
            <div class="form-group">
              <label for="name">Full Name (Optional)</label>
              <input 
                type="text" 
                id="name" 
                v-model="responses.userInfo.name" 
                placeholder="John Doe"
              >
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number (Optional)</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="responses.userInfo.phone" 
                placeholder="+123 456 7890"
              >
            </div>
            
            <div class="form-group checkbox-group">
              <input type="checkbox" id="debug" v-model="showDebug">
              <label for="debug">Show debug information</label>
            </div>
            
            <div class="navigation-buttons">
              <button class="btn btn-secondary" @click="goToPage(2)">Back</button>
              <button class="btn btn-success" @click="submitSurvey()" :disabled="!isUserInfoValid">Submit Survey</button>
            </div>
          </div>
        </div>
        
        <!-- Thank You & Results Page -->
        <div v-if="currentPage === 4" class="results-page">
          <div class="card thank-you-card">
            <h2>Thank You for Completing the Survey!</h2>
            <div class="progress-bar">
              <div class="progress" style="width: 100%"></div>
            </div>
            <p>Your responses have been recorded successfully.</p>
            <p>Your overall satisfaction score: <span class="highlight">{{ getSatisfactionScore() }} / 5</span></p>
            
            <!-- Debug Information -->
            <div v-if="showDebug" class="debug-section">
              <h3>Debug Information</h3>
              <div class="debug-card">
                <h4>User Information:</h4>
                <pre>{{ JSON.stringify(responses.userInfo, null, 2) }}</pre>
                
                <h4>Question Responses:</h4>
                <table class="responses-table">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Response</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, index) in responses.page1" :key="'p1-'+index">
                      <td>{{ index + 1 }}. {{ questions[0][index] }}</td>
                      <td>{{ getResponseLabel(value) }}</td>
                      <td>{{ value }}</td>
                    </tr>
                    <tr v-for="(value, index) in responses.page2" :key="'p2-'+index">
                      <td>{{ index + 5 }}. {{ questions[1][index] }}</td>
                      <td>{{ getResponseLabel(value) }}</td>
                      <td>{{ value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <button class="btn btn-primary" @click="goToPage(0)">Start a New Survey</button>
          </div>
        </div>
      </div>
    `};document.addEventListener("DOMContentLoaded",()=>{S(I).mount("#app")});
