var userInput = ''
var tempActive = false

function calculate() {
    var temp = document.getElementById('input')
    if(event.keyCode == 13 || event.button == 0) {
        if(temp.value === '' || temp.value === 0){
            printAlert()
        } 
        else
        if(isNum(temp.value)){
             printOutput(temp.value,convertDecToFis(temp.value))
        } 
        else 
        if(isFis(temp.value)){
            printOutput(temp.value,convertFisToDec(temp.value))
        } 
        else 
        if(isExpression(temp.value)){
            var tmp = doMath(temp.value)
            printOutput(temp.value,convertDecToFis(tmp))
            carryoverValue(tmp)
        } 
        else {
            printError(temp.value)
        }
    }
}

function doMath(exp){
    var list = exp.split("+").join("|+|")
        list = list.split("-").join("|-|")
        list = list.split("|")
        
    while(list.length > 1){
        var A = list[0]
        var BPlus = list[1] === '+'
        var BMinus= list[1] === '-'
        var C = list[2]
        
        if(isFis(A)){A = convertFisToDec(A)} 
        if(isFis(C)){C = convertFisToDec(C)} 
        A = Number(A)
        C = Number(C)
        if(BPlus){
            list[0] = A + C
        } 
        else 
        if(BMinus){
            list[0] = A - C
        }
        
        list.splice(1,2)
    }
    return Number(list[0])
}

function convertDecToFis(decimal){
    var temp = revZero(Number(decimal))
    var inchTrue, footTrue, sixTrue, sixRoun
    var foot = 0, inch = 0, six = 0
    var fis, result
    
    footTrue = temp
    inchTrue = temp * 12
    sixTrue  = inchTrue * 16
    sixRoun = Math.round(sixTrue)
    foot = Math.floor((sixRoun / 16) / 12)
    inch = Math.floor(sixRoun / 16) - (foot * 12)
    six  = sixRoun - (((foot * 12) + inch) * 16)
    foot = revZero(foot)
    fis = foot + " - " + inch + " - " + six
    
    return fis
}

function convertFisToDec(fis){
    var temp = fis.split('.')
    var dec
    
    temp[0] = revZero(temp[0])
    temp[1] = temp[1] / 12
    temp[2] = (temp[2] / 16) / 12
    dec = revZero((Number(temp[0]) + temp[1] + temp[2]).toFixed(3))

    return Number(dec)
}

function isNum(x){
    return !isNaN(x)
}

function isFis(z){
    var zArray = z.toString().split('.')
    tempActive = false
    
    if(zArray[0] === '' && zArray.length > 1){
        zArray.splice(0,1)
        tempActive = true
    }
    
    var len   = zArray.length === 3
    var isNumOne = isNum(zArray[0])
    var isNumTwo = isNum(zArray[zArray.length-1])
    var isExp = isExpression(z)
    
    return len && isNumOne && isNumTwo && !isExp
}

function isExpression(y){
    return y.toString().split(/([-+])\w+/g).length > 1
}

function revZero(np) {
    var isNeg = np < 0
    if(tempActive || isNeg){
        if(isNeg){
            tempActive = true
        } else {
            tempActive = false;
        }
        return np * -1
    } else {
        return np
    }
}

var history, output

function historyCheck(h){
    if(!history){
        return h
    } else {
        return h + document.getElementById('result').innerHTML
    }
}

//Print functions
function printOutput(a,b){
    output = "<div class='solution output'>" 
                    + a + " = " + b 
                + "</div>"
    
    //compile history
    document.getElementById('result').innerHTML = historyCheck(output)
    
    //clear input box & user message
    document.getElementById('input').value = ''
    document.getElementById('userMessage').innerHTML = ''
}

function carryoverValue(a){
    document.getElementById('input').value = a
}

function printError(source){
    var errorMsg = "error:" + source + " is not a number or expression"
    output = "<div class='error'>" + errorMsg + "</div>"
    
    //compile history
    document.getElementById('result').innerHTML = historyCheck(output)
    document.getElementById('userMessage').innerHTML = 'enter a number'
    
    //clear input box & user message
    document.getElementById('input').value = ''
    document.getElementById('userMessage').innerHTML = ''
}

function printAlert(){
    document.getElementById('userMessage').innerHTML = 'enter a number'
}