const buttonAdd = document.querySelector('#criar-tarefa');
const inputTask = document.querySelector('#texto-tarefa');
const ol = document.querySelector('#lista-tarefas');

buttonAdd.addEventListener('click', () => {
  const li = document.createElement('li');
  li.innerText = inputTask.value;
  ol.appendChild(li);
  inputTask.value = '';
})