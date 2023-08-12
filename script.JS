let generated_password=document.querySelector("[output]");
let displaylength=document.querySelector(".length");
let inputslider=document.querySelector(".slider");
let uppercasecheck=document.querySelector("#uppercase");
let lowercasecheck=document.querySelector("#lowercase");
let symbolcheck=document.querySelector("#symbols");
let numberscheck=document.querySelector("#numbers");
let allCheckboxes = document.querySelectorAll("input[type='checkbox']");
let generate_button=document.querySelector(".generatebutton");
let copyicon=document.querySelector("#copy");
let copied_text=document.querySelector(".copied_text");
let indicator=document.querySelector(".strength_color");
let alert=document.querySelector('#pop_up');
 
let password="";
let password_length=10;
let totalcheck=0;

let symbolString="~`!@#$%^&*()_+-{}[]'?/.,;:><\|";

handleslider();
function handleslider(){
    inputslider.value=password_length;
    displaylength.innerText=password_length;
}

function setindicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

setindicator("#ccc");

function getRndInt(min,max){
   return Math.floor(( (Math.random()*(max-min))+min));
}

function generate_number(){
     return getRndInt(0,10);
}
function generate_symbol(){
    let number= getRndInt(0,symbolString.length);
    return symbolString[number];
}

function generate_uppercase(){
    return String.fromCharCode(getRndInt(97,123));
}

function generate_lowercase(){
    return String.fromCharCode(getRndInt(65,91));
}

function shufflePassword(Array){
     for(let i=Array.length-1;i>0;i--){
        const j=Math.floor(Math.random() *(i+1));
        const temp=Array[i];
        Array[i]=Array[j];
        Array[j]=temp;
     }
     let str="";
     Array.forEach((el)=>{
        str+=el;
     })
     return str;
}

function calStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasSymbol=false;
    let hasnumber=false;

    if(uppercasecheck.checked) hasUpper=true;
    if(lowercasecheck.checked) hasLower=true;
    if(numberscheck.checked) hasnumber=true;
    if(symbolcheck.checked) hasSymbol=true;

    if(hasLower && hasUpper && (hasSymbol || hasnumber) && password_length>=8){
        setindicator('#0f0');
    }

    else if((hasLower || hasUpper) && (hasSymbol || hasnumber) && password_length>=6){
        setindicator('#ff0');
    }

    else{
        setindicator('#f00');
    }

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(generated_password.value);
        copied_text.innerText=("copied");

    }
    catch(e){

        copied_text.value=("Failed");
    }

    copied_text.classList.add("active");
    setTimeout(()=>{
        copied_text.classList.remove("active");
    },2000);
}

inputslider.addEventListener('input',(e)=>{
    password_length=e.target.value ;
    handleslider();
})

copyicon.addEventListener('click',()=>{
    if(generated_password.value){
        copyContent(); 
    }
})

function handleCheckBoxChange(){
    totalcheck=0;
    allCheckboxes.forEach((checkbox)=>{
        if(checkbox.checked) totalcheck++;
    })

    if(password_length<totalcheck){
        password_length=totalcheck;
        handleslider();
    }
}

allCheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

generate_button.addEventListener('click',()=>{
    
    if(totalcheck<=0){
        alert.classList.add("active");
        
        setTimeout(()=>{
            alert.classList.remove("active");
        },1500);
    }

    if(password_length<totalcheck){
        password_length=totalcheck;
        handleslider();
    }
    //

    password="";

    let funcArr=[];

    if(uppercasecheck.checked) funcArr.push(generate_uppercase);

    if(lowercasecheck.checked) funcArr.push(generate_lowercase);

    if(numberscheck.checked) funcArr.push(generate_number);

    if(symbolcheck.checked) funcArr.push(generate_symbol);

    //compulsory addition done

    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }


    for(let i=0;i<password_length-funcArr.length;i++){
        let randIndex=getRndInt(0,funcArr.length);
        password+=funcArr[randIndex]();
    }

    //shuffle password

    password=shufflePassword(Array.from(password));



    generated_password.value=password;


    calStrength();
})

//  additional code  start


const reset=document.querySelector('.reset');

reset.addEventListener('click',()=>{
    generated_password.value="";
})
