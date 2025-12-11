const header = document.querySelector("header");
const main = document.querySelector("main");

// i've added this async/await function
// since htmlinclude wouldnt work from here
// this works tho
async function loadInto(el, url) {
    const html = await fetch(url).then((r) => r.text());
    el.innerHTML = html;
    console.log(el.innerHTML);
    // lets get the scripts so we can run them
    const scripts = el.querySelectorAll("script");
    // iterate through them to move them to document root
    for (const oldScript of scripts) {
        const newScript = document.createElement("script");
        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.textContent = oldScript.textContent;
        }  
        // copy attributes (cursed)
        for (const attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
        }

        // replace so it actually executes
        oldScript.replaceWith(newScript);
    }  
    document.title = `liam oppenheimer's leaping oryx ^ web115 ^ ${document.querySelector("h2").innerText}`
}  

function switchPage(a) {
  if (a.id.includes("reload")) {
    console.log("leaving page");
    window.location.href = a.href;
  } else {
    main.innerHTML = '';  
    console.log(main.innerHTML);
    loadInto(main, `components/pages/${a.id}.html`);
  }
}  

header.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === 'A') {
    switchPage(e.target);
  }
});  