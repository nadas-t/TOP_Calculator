
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
    n1=parseInt(n1)
    n2=parseInt(n2)
    switch(op){
        case "+":
            rsp=add(n1,n2)
            rsp=String(rsp)
            return rsp
        case "-":
            rsp=sub(n1,n2)
            rsp=String(rsp)
            return rsp
        case "/":
            if(n2==0){
                return false;
            }
            rsp=divide(n1,n2)
            rsp=String(rsp)
            return rsp
        case "*":
            rsp=mult(n1,n2)
            rsp=String(rsp)
            return rsp
    }
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
        if(operation.length==1){
            proximo=false
            operation.push(numOp)
            
        }
        else if(operation.length==2){
            operation[1]=numOp
        }
        else if(operation.length==3){
            equalBtn.click()
            operation.push(numOp)
        }
        updateVisor(operation[1])
    })
})

numbers.forEach(number=>{
    number.addEventListener("click",(e)=>{
        num=String(e.target.textContent)
        // console.log(isNaN(num(operation[0])))
        if(operation[0]=="0" || isNaN(operation[0] || proximo)){
            proximo=false
            operation[0]=String(num)
            updateVisor(operation[0])
        }
        else if(operation.length==1 &&  !proximo){
            operation[0]=operation[0]+num
            updateVisor(operation[0])

        }
        else if(operation.length==2){
            operation.push(num)
            updateVisor(operation[2])
        }
        else if(operation.length==3){
            operation[2]=operation[2]+num
            updateVisor(operation[2])
        }
        else{
            updateVisor("erro")
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
        console.log(operation)
    }
})