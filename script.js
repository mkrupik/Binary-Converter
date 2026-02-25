// I/O
const input = document.getElementById("input");
const output = document.getElementById("output");
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const verDisplay = document.getElementById("verDisplay");
const copyBtn = document.createElement("button");
copyBtn.textContent = "Copy";
copyBtn.style.marginTop = "0.5rem";
copyBtn.classList.add("inputBtns");

// Settings
const binToTxtInput = document.getElementById("binToTxtInput");
const txtToBinInput = document.getElementById("txtToBinInput");

// Vars
let unsupportedNums = ["2", "3", "4", "5", "6", "7", "8", "9"];

// Binary to text
function binToText(){
    let binNumber = input.value.trim();
    binNumber = binNumber.replace(/ /g, "");
    let binNumLength = binNumber.length;

    if(unsupportedNums.some((character) => {return binNumber.includes(character)}) == true){
        output.textContent = "Output: Invalid Number";
        setTimeout(() => {
            output.textContent = "Output: ";
        }, 2000);
    }

    if(binNumber.includes("0") || binNumber.includes("1")){
        if(binNumLength < 8 || binNumLength % 8 != 0){
            output.textContent = "Output: Invalid Number";
            setTimeout(() => {
                output.textContent = "Output: ";
            }, 2000);
        }

        if(binNumLength >= 8 && binNumLength % 8 == 0 && output.textContent == "Output: "){
            let char;
            binNumber = binNumber.match(/.{8}/g).join(" ");
            char = binNumber.split(" ");

            for(var i = 0; i < binNumLength; i++){
                let result = parseInt(char[i], 2);
                result = String.fromCharCode(result);           
                output.textContent += result;
            }

            if(i == binNumLength){
                document.body.appendChild(copyBtn);
            }

            copyBtn.onclick = function(){
                copy();
            }

        }
    }

    if(input.value == ""){
        output.textContent = "Output: ";
    }
}

// Text to binary
function textToBin(){
    let textInput = input.value.trim();
    let textLenght = textInput.length;

    if(output.textContent == "Output: "){
        for(var i = 0; i < textLenght; i++){
            let result;
            result = (textInput[i].charCodeAt(0).toString(2) + " ").padStart(9, "0");
            if(!result.includes("00000000")){
                output.textContent += result;
            }
        }
    }

    if(i == textLenght){
        document.body.appendChild(copyBtn);
    }
    
    if(input.value == ""){
        output.textContent = "Output: ";
    }

    copyBtn.onclick = function(){
        copy();
    }
}

function copy(){
    let textToCopy = output.textContent.replace("Output: ", "").trim();
    navigator.clipboard.writeText(textToCopy).then(() =>{
        copyBtn.textContent = "Copied";
    }).catch(() => {
        copyBtn.textContent = "Failed";
    })
    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 2000)
}

// Convert
convertBtn.onclick = function(){
    if(binToTxtInput.checked){
        output.textContent = "Output: ";
        binToText();
    }

    if(txtToBinInput.checked){
        output.textContent = "Output: ";
        textToBin();
    }
}

clearBtn.onclick = function(){
    input.value = "";
    output.textContent = "Output: ";
    copyBtn.textContent = "Copy";
    document.body.removeChild(copyBtn);
}