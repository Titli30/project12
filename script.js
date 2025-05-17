function addEdu() {
  const container = document.getElementById('eduContainer');
  const div = document.createElement('div');
  div.classList.add('edu');
  div.innerHTML = `
    <input type="text" placeholder="Degree" class="degree"/>
    <input type="text" placeholder="Institute" class="institute"/>
    <input type="text" placeholder="Year" class="year"/>
    <input type="text" placeholder="Grade" class="grade"/>
  `;
  container.appendChild(div);
}

function addExp() {
  const container = document.getElementById('expContainer');
  const div = document.createElement('div');
  div.classList.add('exp');
  div.innerHTML = `
    <input type="text" placeholder="Position" class="position"/>
    <input type="text" placeholder="Company" class="company"/>
    <textarea placeholder="Details" class="expDetails"></textarea>
  `;
  container.appendChild(div);
}

function addProject() {
  const container = document.getElementById('projectContainer');
  const div = document.createElement('div');
  div.classList.add('project');
  div.innerHTML = `
    <input type="text" placeholder="Project Title" class="projTitle"/>
    <input type="url" placeholder="Project Link" class="projLink"/>
    <textarea placeholder="Project Description" class="projDesc"></textarea>
  `;
  container.appendChild(div);
}

function generateCV() {
  const preview = document.getElementById('cvPreview');
  const name = document.getElementById('name').value;
  const guardian = document.getElementById('guardian').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const github = document.getElementById('github').value;
  const skills = document.getElementById('skills').value.split(',');
  const languages = document.getElementById('languages').value.split(',');
  const hobbies = document.getElementById('hobbies').value.split(',');
  const summary = document.getElementById('summary').value;

  const educations = [...document.querySelectorAll('.edu')].map(edu => {
    return {
      degree: edu.querySelector('.degree').value,
      institute: edu.querySelector('.institute').value,
      year: edu.querySelector('.year').value,
      grade: edu.querySelector('.grade').value
    };
  });

  const experiences = [...document.querySelectorAll('.exp')].map(exp => {
    return {
      position: exp.querySelector('.position').value,
      company: exp.querySelector('.company').value,
      details: exp.querySelector('.expDetails').value
    };
  });

  const projects = [...document.querySelectorAll('.project')].map(p => {
    return {
      title: p.querySelector('.projTitle').value,
      link: p.querySelector('.projLink').value,
      desc: p.querySelector('.projDesc').value
    };
  });

  const reader = new FileReader();
  const file = document.getElementById('imgUpload').files[0];

  reader.onloadend = () => {
    preview.innerHTML = `
      <div style="display:flex; gap:30px;">
        <div>
          <img src="${reader.result}" alt="Photo"/>
          <p><strong>${name}</strong><br>Guardian: ${guardian}</p>
          <p>📞 ${phone}<br>📧 ${email}<br>📍 ${address}</p>
          <p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>
          <p><strong>Skills:</strong> ${skills.join(', ')}</p>
          <p><strong>Languages:</strong> ${languages.join(', ')}</p>
          <p><strong>Hobbies:</strong> ${hobbies.join(', ')}</p>
        </div>
        <div>
          <h2>Profile</h2>
          <p>${summary}</p>
          <h2>Education</h2>
          ${educations.map(e => `<p><strong>${e.degree}</strong>, ${e.institute} (${e.year})<br>Grade: ${e.grade}</p>`).join('')}
          <h2>Experience</h2>
          ${experiences.filter(e => e.position).map(e => `<p><strong>${e.position}</strong> at ${e.company}<br>${e.details}</p>`).join('')}
          <h2>Projects</h2>
          ${projects.filter(p => p.title).map(p => `<p><strong>${p.title}</strong><br>${p.desc}<br><a href="${p.link}" target="_blank">${p.link}</a></p>`).join('')}
        </div>
      </div>
    `;
  };
  if (file) reader.readAsDataURL(file);
}

function downloadPDF() {
  const element = document.getElementById('cvPreview');
  html2pdf().from(element).save('resume.pdf');
}
