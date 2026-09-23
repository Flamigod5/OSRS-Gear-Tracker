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
