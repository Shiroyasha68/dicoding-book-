document.addEventListener('DOMContentLoaded', function () {
  const submitForm /* HTMLFormElement */ = document.getElementById('input-data');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    jalan();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener('ondatasaved', () => {});

document.addEventListener('ondataloaded', () => {
  refreshDataFromTodos();
});
