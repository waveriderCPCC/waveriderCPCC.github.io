function checkDivision(number, value) {
  return number % value === 0;
}

function useForm(event) {
  event.preventDefault(); // this stops the page from refreshing.
  const first = document.getElementById("first");
  const mid = document.getElementById("mid");
  const last = document.getElementById("last");
  const n1 = document.getElementById("n1");
  const w1 = document.getElementById("w1");
  const n2 = document.getElementById("n2");
  const w2 = document.getElementById("w2");
  const n3 = document.getElementById("n3");
  const w3 = document.getElementById("w3");
  const lines = document.getElementById("lines");
  const defaultWord = document.getElementById("default_word");
  if (first.value === "" || last.value === "") {
    console.log("form is empty. exiting...");
    return true;
  } else {
    const welcomeMessage = document.getElementById("welcome_message");
    welcomeMessage.innerText = "welcome to waverider's site, " + first.value;
    if (!(mid.value === "")) {
      welcomeMessage.innerText += " " + mid.value + ".";
    }
    welcomeMessage.innerText += " " + last.value + "!";
    var dd = document.getElementById("output");
    var val = "";
    for (let i = 1; i <= lines.value; i++) {
      val = "";
      q = false;
      if (checkDivision(i, n1.value)) {
        val += w1.value;
        q = true;
      }
      if (checkDivision(i, n2.value)) {
        val += w2.value;
        q = true;
      }
      if (checkDivision(i, n3.value)) {
        val += w3.value;
        q = true;
      }
      if (q === false) {
        if (defaultWord.value === "") {
          val = "";
        }
        val += defaultWord.value;
      }
      dd.innerHTML = dd.innerHTML + "<li>" + val + "</li>";
    }
    return false;
  }
}

var form = document.getElementById("form");
form.addEventListener("submit", useForm);
