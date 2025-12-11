const header = document.querySelector("header");
const main = document.querySelector("main");

let currentId = "home";

// i've added this async/await function
// since htmlinclude wouldnt work from here
// this works tho
async function loadInto(el, url) {
    const html = await fetch(url).then((r) => r.text());
    el.innerHTML = html;
    // console.log(el.innerHTML);
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
}  

async function switchPage(id,href) {
  if (id.includes("reload")) {
    console.log("leaving page");
    window.location.href = href;
  } else { 
    // console.log(main.innerHTML);
    // only update if we are going to a different place
    if (id !== currentId) {
      main.innerHTML = ''; 
      currentId = id;
      // load content
      await loadInto(main, `components/pages/${id}.html`);
      const h2 = document.querySelector("h2");
      if (h2) {
        const title = `liam oppenheimer's leaping oryx ^ web115 ^ ${h2.innerText}`;
        // update title
        document.title = title;
      }
      // push page state to browser stack
      // this doesn't help if we cant load the new url
      // const stateObj = { info: 'updated-url-without-reload', page: id };
      // history.pushState(stateObj, document.title, `/${id}`);
    }  
  }  
}  

header.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.tagName === 'A') {
    await switchPage(e.target.id, e.target.href);
  }
});  

// bookmarks wont work until i learn how to do something server-side i think

// function handleRouting() {
//     const path = window.location.pathname;

//     if (path === '/') {
//         switchPage('index');
//     } else {
//     } else if (path.startsWith('/product/')) {
//         // Extract the ID from the URL: e.g., '/product/123'
//         const parts = path.split('/');
//         const productId = parts[parts.length - 1];
//         displayContent(`product ID: ${productId}`);
//     } else if (path.startsWith('/about')) {
//         displayContent('about');
//     } else {
//         displayContent('notFound');
//     }
// }

// window.addEventListener('popstate', (event) => {
//     if (event.state && event.state.page) {
//         switchPage(event.state.page, '');
//     } else {
//         switchPage('index');
//     }
// });  

