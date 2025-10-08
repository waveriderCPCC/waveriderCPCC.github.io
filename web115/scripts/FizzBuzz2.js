const firstDivisor = 3;
const secondDivisor = 5;

function checkDivision(number, value) {
    return number % value === 0;
}

function useForm(event) {
    event.preventDefault(); // this stops the page from refreshing.
    const first = document.getElementById("first");
    const mid = document.getElementById("mid");
    const last = document.getElementById("last");
    console.log(first, mid, last);
    if (first.value==="" || last.value==="") {
        console.log("form is empty. exiting...");
        return true;
    } else {
        const welcomeMessage = document.getElementById("welcome_message");
        welcomeMessage.innerText = "welcome to waverider's site, "+first.value;
        if (!(mid.value==="")) {
            welcomeMessage.innerText += " "+mid.value+".";
        }
        welcomeMessage.innerText += " "+last.value+"!";
        var dd = document.getElementById("datas");
        var val = "";
        for (let i=1; i<=140; i++) {
            val = "";
            q = false;
            if (checkDivision(i, firstDivisor)) {
                val+="WOAH";
                q=true;
            } 
            if (checkDivision(i, secondDivisor)) {
                val+="CODE";
                q=true;
            }
            if (q===false) {
                val = "robots";
            }
            dd.innerHTML = dd.innerHTML
                + "<li>" + val + "!</li>";
        }
        return false;
    }
}

var form = document.getElementById("form");
form.addEventListener('submit', useForm);
