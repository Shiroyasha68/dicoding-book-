const sudah = document.getElementById('terbaca');
const belum = document.getElementById('belum-terbaca');
const tambah = document.getElementById('tambah-bar');
let TODO_ITEMID = 'itemId';
let hasil = [];
function terbaca() {
  belum.style.display = 'none';
  sudah.style.display = 'block';
}
function belumTerbaca() {
  sudah.style.display = 'none';
  belum.style.display = 'block';
}
function menambah() {
  tambah.style.display = 'block';
}
function keluar() {
  tambah.style.display = 'none';
}

function makeBook(judul, penulis, tahun, isCompleted) {
  const textJudul = document.createElement('p');
  textJudul.classList.add('judul');
  textJudul.innerText = judul;

  const textPenulis = document.createElement('p');
  textPenulis.classList.add('penulis');
  textPenulis.innerText = penulis;

  const textTahun = document.createElement('p');
  textTahun.classList.add('tahun');
  textTahun.innerText = tahun;

  const textDesain = document.createElement('div');
  textDesain.classList.add('text-desain');
  textDesain.append(textJudul, textPenulis, textTahun);

  desain = document.createElement('div');
  desain.classList.add('desain');
  desain.append(textDesain);
  if (isCompleted == true) {
    sudah.append(desain);
    desain.append(buatHapusButton());
  } else {
    belum.append(desain);
    desain.append(buatTerbacaButton(), buatHapusButton());
  }
  return desain;
}
function jalan() {
  const nilaiJudul = document.getElementById('judul').value;
  const nilaiPenulis = document.getElementById('author').value;
  const nilaiTahun = document.getElementById('tahun').value;
  const checkBox = document.getElementById('dibaca').checked;
  const todo = makeBook(nilaiJudul, nilaiPenulis, nilaiTahun, checkBox);
  const todoObject = composeTodoObject(nilaiJudul, nilaiPenulis, nilaiTahun, checkBox);

  todo[TODO_ITEMID] = todoObject.id;
  todos.push(todoObject);
  tambah.style.display = 'none';
  updateDataToStorage();
}

function tombolTerbaca() {
  const baca = document.createElement('button');
  const textBaca = document.createElement('h5');
  textBaca.innerText = 'terbaca';
  baca.append(textBaca);
  desain.append(baca);
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  desain.append(button);
  button.addEventListener('click', function (event) {
    eventListener(event);
  });
  return button;
}

function buatHapusButton() {
  return createButton('hapus', function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}
function buatTerbacaButton() {
  return createButton('terbaca', function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

function removeTaskFromCompleted(taskElement) {
  const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
  todos.splice(todoPosition, 1);
  taskElement.remove();
  alert('Data telah terhapus');
  updateDataToStorage();
}

function addTaskToCompleted(taskElement) {
  const nilaiJudul = taskElement.querySelector('.judul').innerText;
  const nilaiPenulis = taskElement.querySelector('.penulis').innerText;
  const nilaiTahun = taskElement.querySelector('.tahun').innerText;
  const newTodo = makeBook(nilaiJudul, nilaiPenulis, nilaiTahun, true);

  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = true;
  newTodo[TODO_ITEMID] = todo.id;

  sudah.append(newTodo);
  taskElement.remove();

  updateDataToStorage();
}
