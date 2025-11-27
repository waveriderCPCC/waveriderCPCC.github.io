let courseEntries = document.getElementById('courseEntries');

function updatePreview(input, target) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
        let img = document.getElementById(target);
        // can also use "this.result"
        img.src = reader.result;
    };  
}  

document.getElementById('addCourseButton').addEventListener('click', () => {
    // Create a new HTML element to hold the new course entry
    const courseEntry = document.createElement('div');
    
    // Add fields for course and reason to the new course entry
    courseEntry.innerHTML = `
        <label for="course${Object.keys(courseEntries.children).length}">Course:</label>
        <input type="text" id="course${Object.keys(courseEntries.children).length}" name="course">
        <br>
        <label for="reason${Object.keys(courseEntries.children).length}">Reason:</label>
        <textarea id="reason${Object.keys(courseEntries.children).length}" name="reason"></textarea><br><br>
        
        <!-- Add a button to remove the course entry -->
        <button type="button" class="removeCourseButton" data-index="${Object.keys(courseEntries.children).length - 1}">Remove</button>
    `;
    
    // Append the new course entry to the existing entries
    courseEntries.appendChild(courseEntry);
});  

courseEntries.addEventListener('click', (e) => {
    if (e.target.classList.contains('removeCourseButton')) {
        e.preventDefault();
        e.target.closest("div").remove();
    }
});

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get the form data
    const formData = new FormData(document.getElementById('form'));
    
    // Process the form data (for example, send it to a server)

    console.log(formData);

    
    let o = `<h2>results:</h2><br>`;
    o += `<figure style="float: right;">
        <img id="figure" src="images/driving.png" alt="${formData.get('caption')}">
        <figcaption><i>${formData.get('caption')}</i></figcaption>
      </figure>`;
    o += `<h2>${formData.get('hi')}</h2>`;
    o += `<p>${formData.get('bio')}</p>`;
    o += `<ul><li><strong>Personal Background:</strong> ${formData.get('personal')}</li>
    <li><strong>Professional Background:</strong> ${formData.get('professional')}</li>
    <li><strong>Academic Background:</strong> ${formData.get('academic')}</li>
    <li><strong>Primary Computer:</strong> ${formData.get('computer')}</li>`;  
    if (document.getElementById('imagesrc').files.length !== 0) {
    let file = document.getElementById('imagesrc').files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
        document.getElementById('figure').src = reader.result;
    };  

    } 

    const courses = formData.getAll("course");
    const reasons = formData.getAll("reason");

    o += `<li><strong>Courses I’m Taking, & Why:</strong><ul>`;

    for (let i=0; i<courses.length; i++) {
        o += `<li><strong>${courses[i]}</strong> ${reasons[i]}</li>`;
    }  

    o += `</ul>`;
    o += `<li><strong>Funny/Interesting Item to Remember Me by:</strong> ${formData.get('funny')}</li>`;
    o += `<li><strong>I’d Also Like to Share</strong> ${formData.get('extra')}</li>`;
    
    document.getElementById('results').innerHTML = o;
});  
