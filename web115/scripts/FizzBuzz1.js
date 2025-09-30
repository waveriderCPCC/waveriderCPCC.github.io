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
        const welcome_message = document.getElementById("welcome_message");
        welcome_message.innerText = "welcome to waverider's site, "+first.value;
        if (!(mid.value==="")) {
            welcome_message.innerText += " "+mid.value+".";
        }
        welcome_message.innerText += " "+last.value+"!";
        // console.log("updated title.");
        // console.log(welcome_message.innerText);
        // var amt = prompt("How high do you want to count, "+first.value+"?");
        var dd = document.getElementById("datas");
        var val = "";
        for (let i=1; i<=140; i++) {
            val = "";
            q = 0;
            if (i % 3 === 0) {
                val+="WOAH";
                q=1;
            } 
            if (i % 5 === 0) {
                val+="CODE"
                q=1;
            }
            if (q===0) {
                val = "robots";
            }
            // dd.innerHTML = dd.innerHTML+
            // "<li><span class=\"fc\">fun code</span>"
            // +" - "
            // +"the number is "
            // +val
            // +"</li>";
            dd.innerHTML = dd.innerHTML
                + "<li>" + val + "!</li>"
        }
        return false;
    }
}

var form = document.getElementById("form");
form.addEventListener('submit', useForm);
