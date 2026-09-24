document.addEventListener("DOMContentLoaded", () => {

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

  document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('click', () => {
      slot.classList.toggle('selected');
    });
  });

});

document.querySelectorAll('.content-table tbody tr').forEach(row => {
  row.addEventListener('click', () => {
    row.classList.toggle('selected-row');
  });
});

// ===============================
// SAVE SELECTIONS
// ===============================
function saveSelections() {
  // Save selected gear slots
  const selectedSlots = [...document.querySelectorAll('.slot.selected')]
    .map(slot => slot.dataset.name);

  // Save selected content rows
  const selectedRows = [...document.querySelectorAll('.content-table tr.selected-row')]
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

  // Restore gear slot selections
  selectedSlots.forEach(name => {
    const slot = document.querySelector(`.slot[data-name="${name}"]`);
    if (slot) slot.classList.add('selected');
  });

  // Restore content row selections
  const rows = document.querySelectorAll('.content-table tbody tr');
  selectedRows.forEach(index => {
    if (rows[index]) rows[index].classList.add('selected-row');
  });
}

// ===============================
// HOOK INTO CLICK EVENTS
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  restoreSelections();

  // Gear slots
  document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('click', () => {
      slot.classList.toggle('selected');
      saveSelections();
    });
  });

  // Content rows
  document.querySelectorAll('.content-table tbody tr').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.toggle('selected-row');
      saveSelections();
    });
  });
});
