
let items = [];
let nextId = 1;

const form = document.getElementById("itemForm");
const input = document.getElementById("itemInput");
const list = document.getElementById("list");
const counter = document.getElementById("counter");


function render() {
 
  list.innerHTML = "";

 
  counter.textContent = `Items: ${items.length}`;


  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.dataset.id = item.id;

    if (item.done) li.classList.add("done");

   
    const btn = document.createElement("button");
    btn.textContent = "✖";
    btn.className = "remove";
    li.appendChild(btn);

    list.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return;

  items.push({ id: nextId++, name, done: false });
  input.value = "";
  render();
});


list.addEventListener("click", e => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);
  const item = items.find(i => i.id === id);

  if (e.target.classList.contains("remove")) {
    
    items = items.filter(i => i.id !== id);
  } else {
    
    item.done = !item.done;
  }
  render();
});

// Initial render
render();
