// Interactions & state
const menuBtn = document.getElementById('hamburger');
const menu = document.getElementById('menu');
if(menuBtn && menu){
  const toggle = () => menu.classList.toggle('open');
  menuBtn.addEventListener('click', toggle);
  menuBtn.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' ') toggle(); });
  document.addEventListener('click', (e)=>{
    if(!menu.contains(e.target) && !menuBtn.contains(e.target)) menu.classList.remove('open');
  });
}

function initProfileFromStorage(){
  const name = localStorage.getItem('ap_fullname') || '';
  const sid  = localStorage.getItem('ap_studentid') || '';
  const email= localStorage.getItem('ap_email') || '';

  // 1) Header profile name (this shows whoever signed in)
  const profName = document.getElementById('profileName');
  if (profName) profName.textContent = name || 'Student';

  // 2) Optional other fields on the page (if present)
  const displayName = document.getElementById('displayName');
  const studentName = document.getElementById('studentName');
  const fullNameBox = document.getElementById('fullNameBox');
  const studentIdEl = document.getElementById('studentId');

  if (displayName) displayName.textContent = name || displayName.textContent;
  if (studentName) studentName.textContent = name || studentName.textContent;
  if (fullNameBox) fullNameBox.textContent = name || fullNameBox.textContent;
  if (studentIdEl && sid) studentIdEl.textContent = sid;

  // 3) LOCK the Select Student dropdown to just blank + "Taylor S. Johnson"
  const sel = document.getElementById('studentSelect');
  if (sel) {
    sel.innerHTML = '<option value=""></option><option value="Taylor S. Johnson">Taylor S. Johnson</option>';
    sel.value = ''; // keep blank by default
  }
}

// keep your existing listener, or add this if you don’t have one:
document.addEventListener('DOMContentLoaded', initProfileFromStorage);


const studentSelect = document.getElementById('studentSelect');
if(studentSelect){
  studentSelect.addEventListener('change', () => {
    const name = studentSelect.value;
    const displayName = document.getElementById('displayName');
    const studentName = document.getElementById('studentName');
    const fullNameBox = document.getElementById('fullNameBox');
    if(displayName) displayName.textContent = name;
    if(studentName) studentName.textContent = name;
    if(fullNameBox) fullNameBox.textContent = name;
  });
}

document.querySelectorAll('.tabbar a').forEach(a=>{
  a.addEventListener('click', () => {
    document.querySelectorAll('.tabbar a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', initProfileFromStorage);

// "Taylor S. Johnson" -> "Johnson, S Taylor"
function formatLastInitialFirst(full){
  if(!full) return "";
  full = full.replace(/\./g,"").trim().replace(/\s+/g," ");
  const parts = full.split(" ");
  if(parts.length < 2) return full;
  const first = parts[0];
  const last  = parts[parts.length-1];
  const middle = parts.slice(1,-1);
  const initial = middle.length ? (middle[0][0] || "") : "";
  return last + (initial ? ", " + initial + " " : ", ") + first;
}

function updateStudentCard(){
  // Always set fixed Student ID
  const idEl = document.getElementById('studentId');
  if (idEl) idEl.textContent = "03266419";

  // Show name only when Taylor is selected, formatted as "Johnson, S Taylor"
  const nameEl = document.getElementById('studentName');
  const sel = document.getElementById('studentSelect');
  if (!nameEl) return;
  if (sel && sel.value === "Taylor S. Johnson"){
    nameEl.textContent = formatLastInitialFirst(sel.value);
  } else {
    nameEl.textContent = ""; // blank when not selected
  }
}

// run on load and whenever the dropdown changes
document.addEventListener('DOMContentLoaded', updateStudentCard);
window.addEventListener('change', function(e){
  if (e.target && e.target.id === 'studentSelect') updateStudentCard();
});

<script>
(function () {
  const FIXED_NAME = "Taylor S. Johnson";

  // 1) Lock the dropdown to blank + Taylor
  const sel = document.getElementById('studentSelect');
  if (sel) {
    sel.innerHTML = '<option value=""></option>' +
                    '<option value="' + FIXED_NAME + '">' + FIXED_NAME + '</option>';
    // pick what you want selected by default (blank or Taylor):
    sel.value = FIXED_NAME; // or "" if you want blank selected initially
  }

  // 2) Always show Taylor in the Student card (ignore signed-in name)
  const nameEl = document.getElementById('studentName');
  if (nameEl) nameEl.textContent = FIXED_NAME;

  // 3) If you want the card to reflect the dropdown (but still never show the login name):
  if (sel && nameEl) {
    sel.addEventListener('change', () => {
      nameEl.textContent = sel.value || FIXED_NAME; // blank -> still show Taylor
    });
  }
})();
</script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const FIXED = "Taylor S. Johnson";
  const sel = document.getElementById('studentSelect');
  if (!sel) return;

  // Replace any existing options with just Taylor and select it
  sel.innerHTML = `<option value="${FIXED}" selected>${FIXED}</option>`;

  // If you also mirror the name into the Student card:
  const nameEl = document.getElementById('studentName');
  if (nameEl) nameEl.textContent = FIXED;
});
</script>

