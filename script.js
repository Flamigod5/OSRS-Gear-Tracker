document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // TAB SWITCHING
  // ===============================
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tabContents.forEach(section => {
        section.classList.toggle("active", section.id === target);
      });
    });
  });

  // ===============================
  // RESTORE SELECTIONS
  ===============================
  restoreSelections();

  // ===============================
  // GEAR SLOT CLICK HANDLING
  // ===============================
  document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('click', () => {
      slot.classList.toggle('selected');
      saveSelections();
    });
  });

  // ===============================
  // CONTENT ROW CLICK HANDLING
  // ===============================
  document.querySelectorAll('.content-table tbody tr').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.toggle('selected-row');
      saveSelections();
    });
  });

});


// ===============================
// SAVE SELECTIONS
// ===============================
function saveSelections() {
  const selectedSlots = [...document.querySelectorAll('.slot.selected')]
    .map(slot => slot.dataset.name);

  const selectedRows = [...document.querySelectorAll('.content-table tbody tr.selected-row')]
    .map(row => [...row.parentNode.children].indexOf(row));

  localStorage.setItem('selectedSlots', JSON.stringify(selectedSlots));
  localStorage.setItem('selectedRows', JSON.stringify(selectedRows));
}


// ===============================
// RESTORE SELECTIONS
// ===============================
function restoreSelections() {
  const selectedSlots = JSON.parse(localStorage.getItem('selectedSlots') || "[]");
  const selectedRows = JSON.parse(localStorage.getItem('selectedRows') || "[]");

  selectedSlots.forEach(name => {
    const slot = document.querySelector(`.slot[data-name="${name}"]`);
    if (slot) slot.classList.add('selected');
  });

  const rows = document.querySelectorAll('.content-table tbody tr');
  selectedRows.forEach(index => {
    if (rows[index]) rows[index].classList.add('selected-row');
  });
}
