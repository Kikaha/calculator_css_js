// const one = document.querySelector('.number.one').addEventListener('click',event=>{
//     console.log(event.target.innerText);
// })
let sign = "";
const finalResult = (result,sign) =>{
    switch(sign){
        case "+": return result[0]+result[1];
        case "-": return result[0]-result[1];
        case "/": return result[0]/result[1];
        case "x": return result[0]*result[1];
    }
}

let display = document.querySelector('.calculator__display');
const calcKeys = document.querySelector('.calculator__keys').addEventListener('click',event=>{
    const key = event.target;
    const keyValue = event.target.innerText;
    const className = key.className.toString().split(" ")[0];
  
    if(display.innerText === "0" && className === "number"){
        display.innerText = keyValue;
    }else{
        if(className === "equal"){
                let result = display.innerText.split(sign);
                let final = finalResult(result,sign);
                return display.innerText = parseFloat(final).toFixed(7).toString();
        }
        if(className !== "number"){
            sign = keyValue;  
        }
        display.innerText+=keyValue;
           
    }

})