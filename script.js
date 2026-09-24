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

  restoreSelections();

  document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('click', () => {
      slot.classList.toggle('selected');
      saveSelections();
    });
  });

  document.querySelectorAll('.content-table tbody tr').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.toggle('selected-row');
      saveSelections();
    });
  });

});


function saveSelections() {
  const selectedSlots = [...document.querySelectorAll('.slot.selected')]
    .map(slot => slot.dataset.id);

  const selectedRows = [...document.querySelectorAll('.content-table tbody tr.selected-row')]
    .map(row => [...row.parentNode.children].indexOf(row));

  localStorage.setItem('selectedSlots', JSON.stringify(selectedSlots));
  localStorage.setItem('selectedRows', JSON.stringify(selectedRows));
}


function restoreSelections() {
  const selectedSlots = JSON.parse(localStorage.getItem('selectedSlots') || "[]");
  const selectedRows = JSON.parse(localStorage.getItem('selectedRows') || "[]");

  selectedSlots.forEach(uid => {
    const slot = document.querySelector(`.slot[data-id="${uid}"]`);
    if (slot) slot.classList.add('selected');
  });

  const rows = document.querySelectorAll('.content-table tbody tr');
  selectedRows.forEach(index => {
    if (rows[index]) rows[index].classList.add('selected-row');
  });
}
