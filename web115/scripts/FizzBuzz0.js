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
        console.log("updated title.");
        console.log(welcomeMessage.innerText);
        var amt = prompt("How high do you want to count, "+first.value+"?");
        var dd = document.getElementById("datas");
        var val = "";
        for (let i=0; i<amt; i++) {
            if (i % 2 === 0) {
                val="even";
            } else {
                val="odd";
            }
            dd.innerHTML = dd.innerHTML+
            "<li><span class=\"fc\">fun code</span>"
            +" - "
            +"the number is "
            +val
            +"</li>";
        }
        return false;
    }
}

var form = document.getElementById("form");
form.addEventListener('submit', useForm);
