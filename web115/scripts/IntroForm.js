function initCourseForm() {
    let courseEntries = document.getElementById('courseEntries');

    if (!courseEntries) {
        console.warn("initCourseForm(): elements not yet loaded");
        return;
    }

    function updatePreview(input, target) {
        let file = input.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function () {
            document.getElementById(target).src = reader.result;
        };
    }

    document
      .getElementById('addCourseButton')
      .addEventListener('click', () => {
        const i = courseEntries.children.length;
        const courseEntry = document.createElement('div');

        courseEntry.innerHTML = `
            <label for="course${i}">Course:</label>
            <input type="text" id="course${i}" name="course">

            <br>

            <label for="reason${i}">Reason:</label>
            <textarea id="reason${i}" name="reason"></textarea>
            
            <br><br>

            <button type="button" class="removeCourseButton">Remove</button>
        `;

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

        const form = document.getElementById('form');
        const formData = new FormData(form);

        let o = `<h2>results:</h2><br>`;
        o += `<figure style="float: right;">
            <img id="figure" src="images/driving.png" alt="${formData.get('caption')}">
            <figcaption><i>${formData.get('caption')}</i></figcaption>
        </figure>`;

        o += `<h2>${formData.get('hi')}</h2>`;
        o += `<p>${formData.get('bio')}</p>`;
        o += `<ul>
            <li><strong>Personal Background:</strong> ${formData.get('personal')}</li>
            <li><strong>Professional Background:</strong> ${formData.get('professional')}</li>
            <li><strong>Academic Background:</strong> ${formData.get('academic')}</li>
            <li><strong>Primary Computer:</strong> ${formData.get('computer')}</li>
        `;

        const courses = formData.getAll("course");
        const reasons = formData.getAll("reason");

        o += `<li><strong>Courses I’m Taking, & Why:</strong><ul>`;
        for (let i = 0; i < courses.length; i++) {
            o += `<li><strong>${courses[i]}:</strong> ${reasons[i]}</li>`;
        }
        o += `</ul>`;

        o += `<li><strong>Funny/Interesting Item to Remember Me by:</strong> ${formData.get('funny')}</li>`;
        o += `<li><strong>I’d Also Like to Share:</strong> ${formData.get('extra')}</li>`;

        document.getElementById('results').innerHTML = o;

        const imgInput = document.getElementById('imagesrc');
        if (imgInput.files.length !== 0) {
            const reader = new FileReader();
            reader.readAsDataURL(imgInput.files[0]);
            reader.onload = () => {
                document.getElementById('figure').src = reader.result;
            };
        }
    });
}

// i wrapped everything so it re-registers our event listeners when we dynamically update index2
initCourseForm();
