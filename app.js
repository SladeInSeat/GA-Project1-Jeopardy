

//  Build Columns and QA Boxes that fill out game container. Hardcoded Categories
//  and point values.

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

