
//  Global Veriables
let questionsRemaining = 25;    //  tracks end of game condition
const categoryNames = ['Geography', 'History', 'Sports & Leisure', 'Entertainment', 'Arts & Literature'];
let idString = ''   //  used to identify corresponding object in questionObjects to selected question div
let playerTurn = 0  //  tracks current active player; who gets to choose next question

//  insertNewColumn: creates a new div, sets class and id values to arguements given or defaults,
//  and then inserts div into given target. Returns the new column as well.
function insertNewColumn(insertTarget, classValueAsString = 'noClassGiven', idValueAsString = 'noIdGiven') {
    let newColumn = document.createElement('div');
    newColumn.setAttribute('class', classValueAsString);
    newColumn.setAttribute('id', idValueAsString);
    insertTarget.appendChild(newColumn);
    return newColumn;
}

//  createGrid: Takes 2 numbers and element as input. 2 numbers are the number of Columns
//  and Rows desired in the grid. A column is created by calling insertnewColumn, then the
//  specified number of child divs are created, given attributes, and appended to the parent column.
function createGrid(numberOfColumns, numberOfRows, insertTarget) {
    for (let i = 0; i < numberOfColumns; i++) {
        let newColumn = insertNewColumn(insertTarget, 'categoryColumn', "column" + categoryNames[i]);
        for (let y = 0; y < numberOfRows; y++) {
            let newBox = document.createElement('div');
            newBox.setAttribute('class', 'questionBox');
            if (y == 0) {
                newBox.textContent = categoryNames[i];
                newColumn.appendChild(newBox);
            } else {
                newBox.textContent = y * 100;
                let iString = i.toString()
                newBox.setAttribute('id', iString.concat(y * 100));
                newColumn.appendChild(newBox);
                newBox.addEventListener('click', populateModal)
            };
        }
    }
};

//  populateModal: Populates modal div by getting id from this. div, using id to look up data from
//  questionObjects array, populates questions and answers with data, creates 
//  event listeners on answer divs. It sets the global varialbe, idString to this.id.
function populateModal() {
    document.getElementsByClassName('modalContainer')[0].style.display = 'flex';
    idString = this.getAttribute('id'); 
    this.textContent = '';
    this.removeEventListener('click', populateModal);
    let questionContainer = document.getElementsByClassName('question')[0];
    let questionText = questionObjects[idString].question;
    questionContainer.textContent = questionText;
    for (let i = 0; i < 4; i++) {
        let answerContainer = document.getElementsByClassName('answer')[i];
        let answerText = questionObjects[idString].answers[i];
        answerContainer.textContent = answerText;
        answerContainer.addEventListener('click', answerTruthPointsClearWin);
    }
}

//  check_display_WinCondition: decrements the global variable questionsRemaining. Checks if
//  questionsRemaining equals 0, which indicates end of game.
//  Then makes modal visible, the top two answer boxes are set to display players scores,
//  and whoever has highest score is named in the displayed win message.
function check_display_WinCondition() {

    questionsRemaining -= 1;

    if (questionsRemaining == 0) {
        document.getElementsByClassName('modalContainer')[0].style.display = 'flex';
        let answerContainer0 = document.getElementsByClassName('answer')[0];
        let answerContainer1 = document.getElementsByClassName('answer')[1];
        let questionContainer = document.getElementsByClassName('question')[0];
        let player1currentScore = document.getElementsByClassName('playerScore')[0].textContent
        let player2currentScore = document.getElementsByClassName('playerScore')[1].textContent
        answerContainer0.textContent = "Player 1 Final Score: " + player1currentScore;
        answerContainer1.textContent = "Player 2 Final Score: " + player2currentScore;
        if (Number(player1currentScore) > Number(player2currentScore)) {
            questionContainer.textContent = "Congrats Player 1";
        } else if(Number(player2currentScore) > Number(player1currentScore)){
            questionContainer.textContent = "Congrats Player 2";
        } else{
            questionContainer.textContent = "It's a tie: Thunderdome to decide winnner!"
        }
    }
}

//  clearhideModal: Hides the modal, sets question div and answer divs to display an empty
//  string. Sets background to jeopardy blue of answer divs to undo correct and incorrect
//  answer indication background changes made in answerTruthPointsClearWin.
function clearhideModal() {
    document.getElementsByClassName('modalContainer')[0].style.display = 'none';    
    document.getElementsByClassName('question')[0].textContent = ""
    for (let i = 0; i < 4; i++) {
        let answerContainer = document.getElementsByClassName('answer')[i];
        let answerText = "";
        answerContainer.textContent = answerText;
        answerContainer.style.backgroundColor = '#060CE9';
    }
}

//  isAnswerCorrect: truth check between arguement (selectedAnswer), and
//  correctAnswer value of questionsObject corresponding to global variable idString.
//  Returns boolean.
function isAnswerCorrect(selectedAnswer) {
    let correctAnswer = questionObjects[idString].correctAnswer
    return selectedAnswer == correctAnswer;
}

//  getPlayerTurn: returns the global variable playerTurn.
function getPlayerTurn(){
    return playerTurn;
}

//  setPlayerTurn: modifies the global variable playerTurn to given number.
//  Makes sure input number is 0 or 1
function setPlayerTurn(number){
    if(number === 0 || number === 1){
        playerTurn = number;
    }
}

//  indicateCurrentPlayerTurn: Changes .playerStatus backgrounds to indicate
//  current player turn
function indicateCurrentPlayerTurn(){
    let currentPlayer = getPlayerTurn()
    let playerBox = document.getElementsByClassName('playerStatus')[currentPlayer]
    playerBox.style.backgroundColor = '#FFE466';
    let otherPlayer = currentPlayer*-1 + 1
    let otherPlayerBox = document.getElementsByClassName('playerStatus')[otherPlayer]
    otherPlayerBox.style.backgroundColor = '#060CE9'
}

//  switchPlayerTurn: modifies global variable playerTurn to indicate current
//  active player
function switchPlayerTurn(){
    let currentPlayer = getPlayerTurn()
    let newCurrentPlayer = currentPlayer*-1 + 1
    setPlayerTurn(newCurrentPlayer);

}

//  getCurrentScore: Gets current player to know which player score to get, then returns
//  text content of appropriate playerScore div. Player score will eventually be moved
//  to an object instaed of in the DOM.
function getCurrentScore() {
    let player = getPlayerTurn();
    let currentScoreValue = Number(document.getElementsByClassName('playerScore')[player].textContent)
    return currentScoreValue
}

//  getCurrentPointValue: uses global variable idString to return 
//  pointValue out of corresponding object in questionObjects.
function getCurrentPointValue() {
    let currentPointValueVar = Number(questionObjects[idString].pointValue)
    return currentPointValueVar
}

//  addToScore: saves output of two callback functions and 
//  sets current players playerScore div their sum. Callback functions 
//  will be getCurrentScore and getCurrentPointValue.
function addToScore(callback1, callback2) {
    let player = getPlayerTurn();
    let num1 = callback1()  // wtf
    let num2 = callback2()  // wtf
    document.getElementsByClassName('playerScore')[player].textContent = Number(num1) + Number(num2);
}

//  subtractFromScore: saves output of two callback functions and 
//  sets current players playerScore div their difference. Callback functions 
//  will be getCurrentScore and getCurrentPointValue.
function subtractFromScore(callback1, callback2) {
    let player = getPlayerTurn();
    let num1 = callback1()
    let num2 = callback2()
    document.getElementsByClassName('playerScore')[player].textContent = Number(num1) - Number(num2);
}

//  On click of Answer box, answerTruthPointsClearWin does these things:
//  gets text value of answer container clicked
//  compares text value to corresponding correct answer in data array
//  adds or subtacts points from player point total
//  closes and clears modal,
//  clears clicked on question box of text and event listener
//  updates qeustionsRemaining variable to keep track of how many questions are left in game
//  when qeustionsRemaining hits zero, brings up modal to display win/lose message and score
function answerTruthPointsClearWin() {
    let selectedAnswer = this.textContent;
    if (isAnswerCorrect(selectedAnswer)) {
        addToScore(getCurrentScore, getCurrentPointValue);
        this.style.backgroundColor = 'green';
        console.log('picked correctly')
    } else {
        this.style.backgroundColor = 'red';
        subtractFromScore(getCurrentScore, getCurrentPointValue);
        switchPlayerTurn()
        indicateCurrentPlayerTurn()
        for(i = 0; i < 4; i++){ //  finds correct answer in div, changes background to green
            let answerContainer = document.getElementsByClassName('answer')[i];
            let answerText = answerContainer.textContent;
            if(isAnswerCorrect(answerText)){
                answerContainer.style.backgroundColor = 'green'
            }
        }
        console.log('WRONG');
    }
    setTimeout(clearhideModal, 1500)
    setTimeout(check_display_WinCondition, 1500)
};

//  Start game on page load
createGrid(5, 6, document.getElementsByClassName('gameContainer')[0]);
indicateCurrentPlayerTurn()

// data from http://www.freepubquiz.co.uk/trivial-pursuit.html


let playersData = {
    'player1' : {
        'name'  : 'Player1',
        'score' :   0,
        'isActive': 1
    },
    'player2'   : {
        'name'      : 'Player2',
        'score'     :   0,
        'isActive'  :   0    
    }
}

let questionObjects = {
    '0100': { pointValue: 100, question: 'How many hills is Sheffield said to be built on?', answers: ['Eleventeen', 'Seven', 'Zero', 'One Billion'], correctAnswer: 'Seven' },
    '0200': { pointValue: 200, question: 'Which Australian city was established in 1835 at the lower stretches of the Yarra River', answers: ['Atlanta', 'Miami', 'Melbourne', 'Syndey'], correctAnswer: 'Melbourne' },
    '0300': { pointValue: 300, question: 'The national flag of Cuba consists of how many alternating stripes?', answers: ['Five', 'One', 'Eleventeen', 'Googleplex'], correctAnswer: 'Five' },
    '0400': { pointValue: 400, question: 'The Hindu Kush is a mountain range that stretches near the border of which two countries', answers: ['Texas and New Mexico', 'USA and Canada', 'Germany and Saudi Arabia', 'Afghanistan and Pakistan'], correctAnswer: 'Afghanistan and Pakistan' },
    '0500': { pointValue: 500, question: 'Which geological period was named after the English county where rocks from this period were first studied?', answers: ['Peleo', 'Crustation', 'Klingon', 'Devonian'], correctAnswer: 'Devonian' },
    '1100': { pointValue: 100, question: 'Which Kings defeat ended the War of the Roses?', answers: ['Richard III', 'George XXL', 'Robert Baretheon', 'Joffery'], correctAnswer: 'Richard III' },
    '1200': { pointValue: 200, question: 'Spanish Town was the capital of which island from 1534 until 1872?', answers: ['Spain', 'Jamaica', 'Brazil', 'Berlin'], correctAnswer: 'Jamaica' },
    '1300': { pointValue: 300, question: 'Which battle fought on 6 July 1685, took place near Bridgwater in Somerset?', answers: ['Battle of Sedgmoor', 'Battle of 5 Armies', 'Battle of Endor', 'Clegaine Bowl'], correctAnswer: 'Battle of Sedgmoor' },
    '1400': { pointValue: 400, question: 'How is Martha Canary, who died in 1903, better known?', answers: ['Martha', 'Big Momma', 'Big Poppa', 'Calamity Jane'], correctAnswer: 'Calamity Jane' },
    '1500': { pointValue: 500, question: 'What was the codename for the Dunkirk evacuations in 1940?', answers: ['Operation GTFO', 'Operation Run Away', 'Operation Advance Backwards', 'Operation Dynamo'], correctAnswer: 'Operation Dynamo' },
    '2100': { pointValue: 100, question: 'What nationality was Greg Rusedski before he became a British tennis star?', answers: ['Thai', 'Columbian', 'Canadian', 'Austrialian'], correctAnswer: 'Canadian' },
    '2200': { pointValue: 200, question: 'How many hurdles must be cleared in 110m hurdles?', answers: ['Ten', 'One Giant Hurdle', 'Eleventeen', 'Eleven'], correctAnswer: 'Ten' },
    '2300': { pointValue: 300, question: 'The Borg-Warner Trophy, introduced in 1936, is awarded to the winner of which race?', answers: ['The Great Race', 'Indianapolis 500', 'Ititarod', '100M Dash'], correctAnswer: 'Indianapolis 500' },
    '2400': { pointValue: 400, question: 'In 1930, which country won the first football World Cup?', answers: ['Luxemborg', 'Uruguay', 'Rhode Island', 'London'], correctAnswer: 'Uruguay' },
    '2500': { pointValue: 500, question: 'What word links a ski lift with a round plastic disc at the end of a long pole and a former Formula One World Champion?', answers: ['Pole', 'Snow', 'Button', 'Crash'], correctAnswer: 'Button' },
    '3100': { pointValue: 100, question: 'Who won the Eurovision Song Contest for the United Kingdom in 1997 with the song Love Shine a Light?', answers: ['Katrina and the Waves', 'The Muppets', 'Enrique Iglesias', 'Ozzy Ozbourne'], correctAnswer: 'Katrina and the Waves' },
    '3200': { pointValue: 200, question: 'Sharon Stone was nominated for the Academy Award for Best Actress for her performance in which 1995 film?', answers: ['Basic Instinct', 'Land Before Time', 'Casino', 'Avatar'], correctAnswer: 'Casino' },
    '3300': { pointValue: 300, question: 'Who starred as Lady Violet Crawley, Dowager Countess of Grantham in the series Downton Abbey?', answers: ['Maggie Smith', 'Sigourne Weaver', 'Samuel L Jackson', 'John Travolta'], correctAnswer: 'Maggie Smith' },
    '3400': { pointValue: 400, question: 'In 1990, which soap actor reached number 2 in the UK Charts with the song Mona?', answers: ['George Clooney', 'Craig McLachlan', 'The Rock', 'Martin Luther King Jr'], correctAnswer: 'Craig McLachlan' },
    '3500': { pointValue: 500, question: 'Gordon Gekko is a fictional character in which 1987 film?', answers: ['Citzen Cane', 'Lost In Translation', 'Wall Street', 'Rashomon'], correctAnswer: 'Wall Street' },
    '4100': { pointValue: 100, question: 'The Walker Art Gallery can be visited in which city?', answers: ['London', 'Devonshire', 'The Shire', 'Liverpool'], correctAnswer: 'Liverpool' },
    '4200': { pointValue: 200, question: 'Who is by far the most famous creation of Michael Bond?', answers: ['James Bond', 'Q', 'Austin Powers', 'Paddington Bear'], correctAnswer: 'Paddington Bear' },
    '4300': { pointValue: 300, question: 'What title is shared by an oil painting by Johannes Vermeer and a 2003 romantic drama directed by Peter Webber?', answers: ['The Life of Peter Weber', 'Dirty Rotten Scoundrels', 'Girl With a Pearl Earring', 'Amelie'], correctAnswer: 'Girl With a Pearl Earring' },
    '4400': { pointValue: 400, question: 'Which Jules Verne novel was inspired by a book written by British geologist, Charles Lyell, in 1863?', answers: ['Ball Four', 'Journey to the Center of the Earth', 'Think and Grow Rich', 'The Giving Tree'], correctAnswer: 'Journey to the Center of the Earth' },
    '4500': { pointValue: 500, question: 'What was the best-selling novel of the 19th century?', answers: ['Uncle Toms Cabin', 'The Bible', 'Where is Waldo', 'Atlas Shrugged'], correctAnswer: 'Uncle Toms Cabin' }
}
