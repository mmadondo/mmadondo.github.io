/**
https://cassidoo.co/
**/

/* Dark Mode */
function setModeEventListener() {
  let list = document.body.classList;
  document.getElementById("toggler").addEventListener("change", event => {
    event.target.checked ? list.add("dark-mode") : list.remove("dark-mode");
  });
}
