let gameContainer = document.getElementsByClassName('gameContainer')[0];

for(let i = 0;i < 5;i++){
    let newColumn = document.createElement('div');
    newColumn.className = 'categoryColumn';
    gameContainer.appendChild(newColumn);
    for(let i = 0; i < 6; i++){
        let newBox = document.createElement('div');
        newBox.className = 'questionBox';
        if(i == 0){
            newBox.textContent = 'Category'
        } else{newBox.textContent = i*100;}
        newColumn.appendChild(newBox);
    }

};

