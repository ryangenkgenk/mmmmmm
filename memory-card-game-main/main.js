// ============================ all Variables ============================
let game = document.querySelector("#game"), 
    allCards = game.querySelectorAll("li"),
    scoreEl = document.querySelector(".score"),
    chanceLeftEl = document.querySelector(".chance-left"),
    gameOver = document.querySelector(".game-over"),
    gameResult = document.querySelector(".game-result"),
    retryBtn = document.querySelector(".retry"),
    yourScore = document.querySelector("#score"),
    firstStar = document.querySelector(".first"),
    secondStar = document.querySelector(".second"),
    thirdStar = document.querySelector(".third"),
    titleOfResult = gameResult.querySelector(".title"),
    // =========================== game play variables ===========================
    gamePlay = document.querySelector(".game-play"),
    play = gamePlay.querySelector("#play"),
    // ====================== registration and log in variables ======================
    registration = document.querySelector(".registration"),
    logIn = document.querySelector(".log-in"),
    userName = document.querySelector("#user-name"),
    email = registration.querySelector("#email"),
    password = registration.querySelector("#password"),
    confirmPassword = registration.querySelector("#confirm-pass"),
    form = registration.querySelector(".form"),
    formLogin = logIn.querySelector(".form"),
    eye = document.querySelectorAll(".eye"),
    signInToSignUp = document.querySelector("#signin-to-signup"),
    signUpToSignIn = document.querySelector("#signup-to-signin"),
    userNameLogIn = document.querySelector("#user-name-login"),
    passwordLogIn = document.querySelector("#password-login"),
    logInBtn = document.querySelector(".log-in-btn"),
    noStorage = document.querySelector(".noStorage"),
    // ================================ game Menu variables ================================
    gameMenu = document.querySelector(".game-menu"),
    profile = document.querySelector(".profile"),
    highScore = profile.querySelector(".scor"),
    showProfile = document.querySelectorAll(".show-profile"),
    hideProfile = profile.querySelector(".cancel"),
    logOutBtn = document.querySelectorAll(".log-out-btn"),
    name = document.querySelectorAll(".user"),
    // rank variables
    ranking = document.querySelector(".ranking"),
    rankinCancel = document.querySelector(".ranking .cancel"),
    ulRankPlayers = document.querySelector(".leaderboard ul"),
    rankTitle = document.querySelectorAll(".rank-title"),
    searchYourName = ranking.querySelector("#search");
    // play button clicked hide game play and show registration and show form registration
    play.addEventListener("click",()=>{
        gamePlay.classList.add("hide")
        registration.classList.add("show")
        form.classList.add("show")
    })
// =========================== game score and chances ===========================
let score = JSON.parse(localStorage.getItem("score"));
let chances = JSON.parse(localStorage.getItem("chance"));
// if no score score = 0
if(!score){
    score= 0;
}
// if no chances chances = 4
if(!chances){
    chances = 4;
}
scoreEl.innerHTML = `score : ${score}`;
chanceLeftEl.innerHTML = `chances : ${chances < 9 ? "0" + chances : chances}`;
// ================================ game logic ================================
let cardOne, cardTwo;
let matchedCard = 0;
let disabledCard = false;
function cardChange(e){
    let card = e.target;
    if(card !== cardOne && !disabledCard){
        card.classList.add("change");
        if(!cardOne){
            return cardOne = card;
        }
        disabledCard = true;
        cardTwo = card;
        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
            sameCards(cardOneImg, cardTwoImg);
    }
}
// two cards is matched or not matched  
function sameCards(img1, img2){
    if(img1 === img2){
        matchedCard ++;
        score+=10;
        localStorage.setItem("score",JSON.stringify(score));
        score = JSON.parse(localStorage.getItem("score"));
        scoreEl.innerHTML = `score : ${score}`;
        if(matchedCard == 8){
            setTimeout(() => {
                return gameOverAndRestartGame();
            }, 500);
        }
       setTimeout(() => {
            cardOne.classList.add("hide");
            cardTwo.classList.add("hide");
            cardOne = cardTwo = "";
        }, 500);
        return disabledCard = false;
    }
    score-=5;
    chances--;
    localStorage.setItem("score",JSON.stringify(score));
    score = JSON.parse(localStorage.getItem("score"));
    scoreEl.innerHTML = `score : ${score}`;
    localStorage.setItem("chance",JSON.stringify(chances));
    chances = JSON.parse(localStorage.getItem("chance"));
    chanceLeftEl.innerHTML = `chances : ${chances < 9 ? "0" + chances : chances}`;
    if(chances == 0){
       setTimeout(() => {
        return gameOverAndRestartGame();
       }, 400);
    }
    // adding shake if is not matched after 500milsec
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake"); 
    }, 500);

    // removing shake and change after 1sec
    setTimeout(() => {
        cardOne.classList.remove("shake", "change");
        cardTwo.classList.remove("shake", "change");
        // cardOne and cardTwo value empty 
        cardOne = cardTwo = ""; 
        disabledCard = false;
    }, 1000);
}
// gameOverAndRestartGame
function gameOverAndRestartGame(){

    gameOver.classList.add("show");
    gameResult.classList.add("show");
    yourScore.innerHTML = `${score}`;
    userScore = score;
// =========================== highest Score in game over ===========================
    userInformation.forEach((user)=>{
        let userValue = user.userName;
        name.forEach((use)=>{
            // if user active is === user storage user name 
            if(use.innerHTML === userValue){
                // if score is grather then user_Score default all users user_score = 0
                if(score > user.user_Score){
                    // user.user_Score = score value
                    user.user_Score = score;
                    highScore.innerHTML = user.user_Score;
                }
            }
        })
    })
    // update localStorage
    rankinValues();
    userData();
    if(score < 10){
        titleOfResult.innerHTML = `Please Try Again You <span>Lose!</span>`;
    }
    if(score >= 10){
        firstStar.style="color: #ffd700";
    }
    if(score > 26){
        firstStar.style="color: #ffd700";
        secondStar.style="color: #ffd700";
    } 
    if(score > 52){
        firstStar.style="color: #ffd700";
        secondStar.style="color: #ffd700";
        thirdStar.style="color: #ffd700";
    }
    retryBtn.addEventListener("click",()=>{
        localStorage.removeItem("score");
        localStorage.removeItem("chance");
        score = JSON.parse(localStorage.getItem("score"));
        chances = JSON.parse(localStorage.getItem("chance"));
        gameOver.classList.remove("show");
        gameResult.classList.remove("show");
        cardOne = cardTwo = "";
        disabledCard = false;
        matchedCard = 0;
        firstStar.style="color: rgba(0,0,0,0.8)";
        secondStar.style="color: rgba(0,0,0,0.8)";
        thirdStar.style="color: rgba(0,0,0,0.8)";
        if(!score){
            score= 0;
        }
        if(!chances){
            chances = 4;
        }
        scoreEl.innerHTML = `score : ${score}`;
        chanceLeftEl.innerHTML = `chances : ${chances < 9 ? "0" + chances : chances}`;
        allCards.forEach((card)=>{
            card.classList.remove("hide","change")
        })
        rondomCards();
    })
}
// ====================================== allCards ======================================
allCards.forEach((card)=>{
    card.addEventListener("click", cardChange)
})

// ===================================== rondomCards =====================================
function rondomCards(){
    let array = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    array.sort(() =>Math.random() > 0.5 ? 1 : -1);
    allCards.forEach((card, index)=>{
        let cardImg = card.querySelector("img");
        cardImg.src=`img/img-${array[index]}.png`;
    })
}
rondomCards();

// ======================================== Forms validation ========================================

// ================================= registration validation =================================
 // userNameChek function
 function userNameChek(){
    let errorUserName = document.querySelector(".error.user-name");
    let succesUserName = document.querySelector(".succes.user-name");
    if(userName.value.trim() === ''){
        errorUserName.classList.add("show");
        userName.classList.add("show");
        errorUserName.innerHTML = `<i class='bx bx-error-circle'></i> Please enter user name`;
    }
    else if(userName.value.length <= 2){
        succesUserName.classList.remove("show");
        errorUserName.classList.add("show");
        userName.classList.add("show");
        errorUserName.innerHTML = `<i class='bx bx-error-circle'></i> Please enter at least 3 charecter`
    }
    else if(userName.value.length >= 3){
        errorUserName.classList.remove("show");
        succesUserName.classList.add("show");
        userName.classList.remove("show");
    }
    if(userName.value.length >= 15){
        succesUserName.classList.remove("show");
        userName.classList.add("show");
        errorUserName.classList.add("show");
        errorUserName.innerHTML = `<i class='bx bx-error-circle'></i> Please enter max 15 charecter`
    }
}
// userNameChek eventListener
userName.addEventListener("keyup",userNameChek);
// emailCheck function
function emailCheck(){
    let errorEmail = document.querySelector(".error.email");
    let succesEmail = document.querySelector(".succes.email");
    const regularExpresion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.value.trim() === ''){
        errorEmail.classList.add("show");
        email.classList.add("show");
        errorEmail.innerHTML = `<i class='bx bx-error-circle'></i> Please enter your email`;
    }
    else if(regularExpresion.test(email.value.trim())){
        errorEmail.classList.remove("show");
        email.classList.remove("show");
        succesEmail.classList.add("show");
    }else{
        succesEmail.classList.remove("show");
        errorEmail.classList.add("show");
        email.classList.add("show");
        errorEmail.innerHTML = `<i class='bx bx-error-circle'></i> Please enter a valid email`;
    }
}
// emailChek eventListener
email.addEventListener("input",emailCheck);
// passwordChek function
function passwordChek(){
    let errorPassword = document.querySelector(".error.password");
    if(password.value.trim() === ''){
        errorPassword.classList.add("show");
        password.classList.add("show");
        errorPassword.innerHTML = `<i class='bx bx-error-circle'></i> Please enter password`;
    }
    else if(password.value.length <= 5){
        errorPassword.classList.add("show");
        password.classList.add("show");
        errorPassword.innerHTML = `<i class='bx bx-error-circle'></i> Please enter at least 6 charecter or number and symbol`
    }
    else if(password.value.length >= 6){
        errorPassword.classList.remove("show");
        password.classList.remove("show");
    }
    if(password.value.length >= 12){
        password.classList.add("show");
        errorPassword.classList.add("show");
        errorPassword.innerHTML = `<i class='bx bx-error-circle'></i> Please enter max 12 charecter or number and symbol`
    }
}
// passwordChek eventListener
password.addEventListener("keyup",passwordChek);
// confirmPassCheck function
function confirmPassCheck(){
    let errorConfrimPassword = document.querySelector(".error.confirm-pass");
    if(confirmPassword.value.trim() === ''){
        errorConfrimPassword.classList.add("show");
        confirmPassword.classList.add("show");
        errorConfrimPassword.innerHTML = `<i class='bx bx-error-circle'></i> Please enter Confirm password`;
    }
    else if(password.value !== confirmPassword.value){
        confirmPassword.classList.add("show");
        errorConfrimPassword.classList.add("show");
        errorConfrimPassword.innerHTML = `<i class='bx bx-error-circle'></i> Password don't match`;
    }else{
        confirmPassword.classList.remove("show");
        errorConfrimPassword.classList.remove("show");
    }
}
// confirmPassCheck eventListener
confirmPassword.addEventListener("keyup",confirmPassCheck);

// ================================ log in validation ================================ 
 // userNameLogInChek function
 function userNameLogInChek(){
    let errorUserName = formLogin.querySelector(".error.user-name");
    let succesUserName = formLogin.querySelector(".succes.user-name");
    if(userNameLogIn.value.trim() === ''){
        errorUserName.classList.add("show");
        userNameLogIn.classList.add("show");
        errorUserName.innerHTML = `<i class='bx bx-error-circle'></i> Please enter user name`;
    }
    else if(userNameLogIn.value.length <= 2){
        succesUserName.classList.remove("show");
        errorUserName.classList.add("show");
        userNameLogIn.classList.add("show");
        errorUserName.innerHTML = `<i class='bx bx-error-circle'></i> Please enter at least 3 charecter`
    }
    else if(userNameLogIn.value.length >= 3){
        errorUserName.classList.remove("show");
        succesUserName.classList.add("show");
        userNameLogIn.classList.remove("show");
    }
    if(userNameLogIn.value.length >= 15){
        succesUserName.classList.remove("show");
        userNameLogIn.classList.add("show");
        errorUserName.classList.add("show");
        errorUserName.innerHTML = `<i class='bx bx-error-circle'></i> Please enter max 15 charecter`
    }
}
// userNameChek eventListener
userNameLogIn.addEventListener("keyup",userNameLogInChek);

// passwordChek function
function passwordLogInChek(){
    let errorPassword = formLogin.querySelector(".error.password");
    if(passwordLogIn.value.trim() === ''){
        errorPassword.classList.add("show");
        passwordLogIn.classList.add("show");
        errorPassword.innerHTML = `<i class='bx bx-error-circle'></i> Please enter password`;
    }
    else if(passwordLogIn.value.length <= 5){
        errorPassword.classList.add("show");
        passwordLogIn.classList.add("show");
        errorPassword.innerHTML = `<i class='bx bx-error-circle'></i> Please enter at least 6 charecter or number and symbol`
    }
    else if(passwordLogIn.value.length >= 6){
        errorPassword.classList.remove("show");
        passwordLogIn.classList.remove("show");
    }
    if(passwordLogIn.value.length >= 12){
        passwordLogIn.classList.add("show");
        errorPassword.classList.add("show");
        errorPassword.innerHTML = `<i class='bx bx-error-circle'></i> Please enter max 12 charecter or number and symbol`
    }
}
// passwordChek eventListener
passwordLogIn.addEventListener("keyup",passwordLogInChek);

// show and hide passwords 
eye.forEach((ey)=>{
    ey.addEventListener("click",(e)=>{
        let eye = e.target.parentElement.parentElement.children[0];
        if(eye.type === "password"){
            eye.type = "text";
            e.target.parentElement.innerHTML = `<i class="fa-regular fa-eye"></i>`;
        }else{
            eye.type = "password";
            e.target.parentElement.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
        }
})
})

let userInformation = JSON.parse(localStorage.getItem("user"));
// ================================ registration form submit ================================ 
form.addEventListener("submit",(e)=>{
    // variables and values
    e.preventDefault();
    let user_name = userName.value,
    email_user = email.value,
    password_user = password.value,
    confrim_password_user = confirmPassword.value;
    let userTable;
    // function of validation check 
    userNameChek();
    emailCheck();
    passwordChek();
    confirmPassCheck();
    if(isValidForm() === true){
        // form.submit();
        if(!userInformation){
            userInformation = [];
        }
        userTable = {userName:user_name, email:email_user, password:password_user, confirmPassword:confrim_password_user, user_Score:0};
        userInformation.push(userTable);
        rankinValues();
        // profile name
        name.forEach((user)=>{
            user.innerHTML = user_name;
        })
        userData();
        registration.classList.remove("show")
        form.classList.remove("show")
        gameMenu.classList.add("show")
        game.classList.add("show")
        gamePlay.classList.add("hide")

    // =========================== highest Score in regestration in ===========================
            userInformation.forEach((user)=>{
                let userValue = user.userName;
                name.forEach((use)=>{
                    if(use.innerHTML === userValue){
                            highScore.innerHTML = user.user_Score;
                    }
                })
            })
    }else{
        e.preventDefault();
    }
})
// ================================ log in form submit ================================ 
formLogin.addEventListener("submit",(e)=>{
    // variables and values
    e.preventDefault();
    let userNameValue = userNameLogIn.value;
    let passwordvalue = passwordLogIn.value;

    let errorUserName = formLogin.querySelector(".error.user-name");
    let errorPassword = formLogin.querySelector(".error.password");
    // function of validation check 
    userNameLogInChek();
    passwordLogInChek();
    if(isValidForm() === true){
        if(!userInformation){
            userInformation = [];
            noStorage.classList.add("show")
        }
        userInformation.forEach((user)=>{
            // variables
            let userNameInStorage = user.userName;
            let passwordInStorage = user.password;
            if(userNameValue === userNameInStorage && passwordvalue === passwordInStorage){
                // formLogin.submit();

                logIn.classList.remove("show")
                formLogin.classList.remove("show")
                gameMenu.classList.add("show")
                game.classList.add("show")
                gamePlay.classList.add("hide")
                rankinValues();
                userData();
                let name = document.querySelectorAll(".user");
                    name.forEach((user)=>{
                    user.innerHTML = userNameValue;
    // =========================== highest Score in log in ===========================
                userInformation.forEach((user)=>{
                    let userValue = user.userName;
                    name.forEach((use)=>{
                        if(use.innerHTML === userValue){
                             highScore.innerHTML = user.user_Score;
                     }
                 })
                })
            })
            }else{
                userNameLogIn.classList.add("show");
                passwordLogIn.classList.add("show");
                errorUserName.classList.add("show")
                errorPassword.classList.add("show")
                errorUserName.innerHTML = `<i class='bx bx-error-circle'></i> User name is wrong`;
                errorPassword.innerHTML = `<i class='bx bx-error-circle'></i> Password is wrong`;
            }
        })
       
    }else{
        e.preventDefault();
    }
})
// isValidForm check
function isValidForm(){
    let inputs = document.querySelectorAll("input");
    let res = true;
    inputs.forEach((input)=>{
        if(input.classList.contains("show")){
            res = false;
        }
    })
    return res;
}
// ================================ sign in and sign up ================================
// signIn To SignUp / log in to registeration
signInToSignUp.addEventListener("click",()=>{
    logIn.classList.remove("show")
    formLogin.classList.remove("show")
    registration.classList.add("show")
    form.classList.add("show")
    userNameLogIn.value = '';
    passwordLogIn.value = '';
    userNameLogIn.classList.remove("show");
    passwordLogIn.classList.remove("show");
})
// signUp To SignIn / registration to log in
signUpToSignIn.addEventListener("click",()=>{
    registration.classList.remove("show")
    form.classList.remove("show")
    logIn.classList.add("show")
    formLogin.classList.add("show")
    userName.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    userName.classList.remove("show");
    email.classList.remove("show");
    password.classList.remove("show");
    confirmPassword.classList.remove("show");
})
// =================================== game menu ===================================
// user name or icon clicked show Profile user 
showProfile.forEach(el => {
    el.addEventListener("click",()=>{
        profile.classList.add("show")
    })
});
// cancel icon clicked hide profile
hideProfile.addEventListener("click",()=>{
    profile.classList.remove("show")
})
// log out btn clicked show game play
logOutBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        gamePlay.classList.remove("hide");
        window.location.reload();
    })
})

// ranking
rankTitle.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        ranking.classList.add("show")
    })
})
rankinCancel.addEventListener("click",()=>{
    ranking.classList.remove("show")
})
// ==================================== rankin players ====================================
function rankinValues(){
    let users = [];
let li = '';
let no = 0;
// ranking sortin by one above the other user score values 
userInformation.sort((a, b)=> a.user_Score - b.user_Score).reverse();
userInformation.forEach((user)=>{
    no ++;
        li += `<li>
                    <div class="no">${no}</div>
                    <div class="name">${user.userName}</div>
                    <div class="score-ranking">${user.user_Score},000</div>
               </li>`;
    users.push(user.userName)
})
ulRankPlayers.innerHTML = li;
}
// searchYourName
searchYourName.addEventListener("keyup",()=>{
    let searchValue = searchYourName.value.toLowerCase();
    let li = ulRankPlayers.querySelectorAll("li");
    li.forEach((element)=>{
        let username = element.children[1].innerText;
        if(username.toLowerCase().indexOf(searchValue) != -1){
            element.classList.add("show")
            element.classList.remove("hide")
        }else{
            element.classList.add("hide")
            element.classList.remove("show")
        }
    })
})
// ========================== user data storing in localStorage ==========================
function userData(){
    localStorage.setItem("user",JSON.stringify(userInformation));
}

// let y = [{user:"cali"},{user:"yaxye"},{user:"dahir"},{user:"nuur"},{user:"aweys"}];
// console.log(y);
// let i = "yaxye";
// y.forEach((us)=>{
//     console.log(us.user);
//     if(us.user === i){
//         console.log("same");
//     }else{
//         console.log("not same");
//     }
// })