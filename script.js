
function add(n1,n2){
    return n1+n2
}

function sub(n1,n2){
    return n1-n2
}

function mult(n1,n2){
    return n1*n2
}

function divide(n1,n2){ 
    return n1/n2
}

function operator(n1,n2,op){
    n1=Number.isInteger(Number(n1))?parseInt(n1) : parseFloat(n1)
    n2=Number.isInteger(Number(n2))?parseInt(n2) : parseFloat(n2)
    switch(op){
        case "+":
            result=add(n1,n2)
            break
        case "-":
            result=sub(n1,n2)
            break
        case "/":
            if(n2==0){
                return false;
            }
            result=divide(n1,n2)
            break
        case "x":
            result=mult(n1,n2)
            break
    }
    return Number.isInteger(result) ? String(result) : String(parseFloat(result.toFixed(7)));
}

let visor=document.querySelector(".visor")
let numbers=document.querySelectorAll(".number:not(.igual)")
let operators=document.querySelectorAll(".operator:not(.notVisor)");
let operation=[visor.textContent];
let number1;
let num;
let numOp;
let equalBtn=document.querySelector(".number.igual")
let proximo=false;


operators.forEach(operator=>{
    operator.addEventListener("click",(e)=>{
        numOp=e.target.textContent
        if(operation.length==1 && !isNaN(operation[0])){
            proximo=false
            operation.push(numOp)
            
        }
        else if(operation.length==2){
            operation[1]=numOp
        }
        else if(operation.length==3){
            equalBtn.click()
            operation.push(numOp)
            proximo=false
        }
        updateVisor(operation[1])
    })
})

numbers.forEach(number=>{
    number.addEventListener("click",(e)=>{
        num=String(e.target.textContent)
        // console.log(isNaN(num(operation[0])))
        if(operation[0]=="0" || isNaN(operation[0]) || proximo  ){
            if(operation[0]=="0" && num=="."){
                operation[0]=operation[0]+num
            }
            else{
                operation[0]=String(num)
            }
            proximo=false
            updateVisor(operation[0])
        }
        else if(operation.length==1 &&  !proximo){
            if(num=="."){
                if(operation[0].includes(".")){
                    true
                }
                else{
                    operation[0]=operation[0]+num
                }   
            }
            else{
                operation[0]=operation[0]+num
            }                    
            updateVisor(operation[0])

        }
        else if(operation.length==2){
            if(num=="."){
                operation.push("0"+num)
            }
            else{
                operation.push(num)
            }
            updateVisor(operation[2])
        }
        else if(operation.length==3){
            if(num=="."){
                if(operation[2].includes(".")){
                    true
                }
                else{
                    operation[2]=operation[2]+num
                }   
            }
            else{
                operation[2]=operation[2]+num
            }                    
            updateVisor(operation[2])
        }
        else{
            updateVisor("erro")
            console.log(proximo )
        }

    })
})

function updateVisor(x){
    visor.textContent=x
}

    let AC=document.querySelector(".notVisor.AC")
    AC.addEventListener("click",()=>{
        operation=["0"]
        updateVisor(operation[0])
    })


    let Del=document.querySelector(".notVisor.Del")
    Del.addEventListener("click",()=>{
        let indexOperation=operation.length -1
        let indexOperationInside=operation[indexOperation].length -1
        if(indexOperation==0 && operation[indexOperation]=="0"){
            true
        }
        else{
            if(indexOperationInside>0){
                operation[indexOperation]=operation[indexOperation].slice(0,-1)                
                updateVisor(operation[indexOperation])                    
            }
            else if (indexOperationInside==0){
                if(indexOperation==0){
                    operation[indexOperation]="0"                    
                    updateVisor(operation[indexOperation])                    
                }
                else{
                    updateVisor(operation[indexOperation-1])                    
                    operation.pop()                                       
                }
            }
                               
        }
    }
    )


equalBtn.addEventListener("click",(e)=>{
    if(operation.length==3){
        let result;
        if (!operator(operation[0],operation[2],operation[1])){
            result="You cannot divide by 0"
        }
        else{
            result=operator(operation[0],operation[2],operation[1])
        }
        proximo=true
        updateVisor(result)
        operation[0]=result
        operation.splice(1,2)
        // console.log(operation)
        // console.log("igual foi clicado")
    }
})