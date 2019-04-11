

//  Build Columns and question boxes that fill out game container

let gameContainer = document.getElementsByClassName('gameContainer')[0];

for(let i = 0;i < 5;i++){
    let newColumn = document.createElement('div');
    newColumn.setAttribute('class','categoryColumn');
    newColumn.setAttribute('id','category' + i);
    gameContainer.appendChild(newColumn);
    for(let y = 0; y < 6; y++){
        let newBox = document.createElement('div');
        newBox.setAttribute('class','questionBox');
        if(y == 0){
            newBox.textContent = 'Category'
        } else{newBox.textContent = y*100;};
        iString = i.toString()
        newBox.setAttribute('id',iString.concat(y*100));
        newColumn.appendChild(newBox);
    }

};

//  modal creation
let modalObj = document.getElementsByClassName('modalContainer')[0];
let buttonObj = document.getElementById('modalBtn');

buttonObj.addEventListener('click', populateModal);

function populateModal (){
    modalObj.style.display = 'flex';
    let questionContainer = document.getElementsByClassName('question')[0];
    let quesitonText = questionObjects['0100'].question;
    questionContainer.textContent = quesitonText;
    for(let i = 0; i < 4; i++){
        let answerContainer = document.getElementsByClassName('answer')[i];
        let answerText = questionObjects['0100'].answers[i];
        answerContainer.textContent = answerText;
    }

}

window.addEventListener('click',function(event){
    if(event.target == modalObj){
        modalObj.style.display = 'none';
    }
}); // window. and event.target credited to https://www.w3schools.com/howto/howto_css_modals.asp


questionObjects = {
    '0100' :    {   pointValue : 100,
                    question : "What's my name?",
                    answers : ['Snoop Dog','Ebenezer','Sparticus','Slade'],
                    correctAnswer : 'Slade'
                },
    '0200' :    {   pointValue: 200,
                    question:   "Who won 2019 NCAA MBB Tourney?",
                    answers:    ["UNC","UVA","TT","Pitt"],
                    correntAnswer:  "UVA"
                }    
}
