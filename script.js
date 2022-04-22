/* eslint-disable no-use-before-define */
/* eslint-disable max-lines-per-function */
const buttonAdd = document.querySelector('#criar-tarefa');
const inputTask = document.querySelector('#texto-tarefa');
const ol = document.querySelector('#lista-tarefas');

// Adicionar uma tarefa na lista
buttonAdd.addEventListener('click', () => {
  const li = document.createElement('li');
  li.innerText = inputTask.value;
  li.classList.add('tarefa');
  ol.appendChild(li);
  inputTask.value = '';
  const listaDeTarefas = document.querySelectorAll('.tarefa');

  // Selecionando as tarefas
  for (let i = 0; i < listaDeTarefas.length; i += 1) {
    listaDeTarefas[i].addEventListener('click', changeColor);
  }
  function changeColor(event) {
    for (let i = 0; i < listaDeTarefas.length; i += 1) {
      listaDeTarefas[i].classList.remove('active');
    }
    event.target.classList.add('active');
  }

  // Marcando as tarefas como concluídas
  for (let i = 0; i < listaDeTarefas.length; i += 1) {
    let activated = true;
    listaDeTarefas[i].addEventListener('dblclick', (event) => {
      event.target.className = activated ? 'completed' : '';
      activated = !activated;
    });
  }
});
