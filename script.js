// Functions for editing the operations

function addSub (array){
  let tempArray = array
  for (let i = 0; i < tempArray.length; i++){    
    if (tempArray[i] == '+'){ // check if current array item is operator
      if(!(tempArray[i + 1])) { // check if there is another element after the operator
        tempArray.splice(i,2) // if no other opperand, remove operator
        break; // and break loop
      }
      //make a temp output variable and use the operator on either side of array (opperands)
      let outcome = parseInt(tempArray[i - 1]) + parseInt(tempArray[i + 1])
      tempArray.splice(i - 1, 3, outcome) // cut out the whole operator and opperands
      i--; //step back through the for loop one iteration to stay in line
    }else if (tempArray[i] == '-'){
      if(!(tempArray[i + 1])) {
        tempArray.splice(i,2) 
        break;
      }
      let outcome = parseInt(tempArray[i - 1]) - parseInt(tempArray[i + 1])
      tempArray.splice(i - 1, 3, outcome)
      i--;
    }
  }
  return tempArray
}

function multiDiv (array) {
  let tempArray = array
  for (let i = 0; i < tempArray.length; i++){    
    if (tempArray[i] == '÷'){   
      let outcome = parseInt(tempArray[i - 1]) / parseInt(tempArray[i + 1])
      tempArray.splice(i - 1, 3, outcome)
      i--;
    }else if (tempArray[i] == 'x'){
      let outcome = parseInt(tempArray[i - 1]) * parseInt(tempArray[i + 1])
      tempArray.splice(i - 1, 3, outcome)
      i--;
    }
  }
  return tempArray
}

function operate (equation){
  equation = multiDiv(equation)
  equation = addSub(equation)

  return equation
}

//Event Listeners

document.querySelectorAll('.operator').forEach( e => {
  e.addEventListener('click', b => {
    equation.innerText += ` ${b.target.innerText} `
  })
})

document.querySelectorAll('.num').forEach(e => {
  e.addEventListener('click', b => {
    equation.innerText += `${b.target.innerText}`
  })
})

document.querySelector('#opEqual').addEventListener('click', e => {
  let equation = document.getElementById('equation').innerText.split(' ')  
  let output = document.getElementById('output')

  output.innerText = operate(equation)
})

document.getElementById('clear').addEventListener('click', e => {
  let equation = document.getElementById('equation')
  let output = document.getElementById('output')

  equation.innerText = ''
  output.innerText = ''
})

// ! TODO / use cases to fix
// - Hitting equal sign when ending with an operator produces NaN
// - Add snarky message whenever dividing by 0
// - Add support for decible numbers (floating point) and round them to some # of digits
// - rewrite operator functions into 1 calc function
// - rewrite event listeners to pull from global const for equation and output