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

// Botão de apagar tudo
const buttonClear = document.querySelector('#apaga-tudo');

buttonClear.addEventListener('click', () => {
  while (ol.hasChildNodes()) {
    ol.removeChild(ol.firstChild);
  }
});

// Botão de remover finalizados
const buttonClearCompleted = document.querySelector('#remover-finalizados');

buttonClearCompleted.addEventListener('click', () => {
  for (let i = 0; i < ol.childNodes.length; i += 1) {
    const listaDeClasses1 = ol.childNodes[i];
    const compare1 = listaDeClasses1.classList.contains('completed');
    if (compare1 === true) {
      ol.removeChild(ol.childNodes[i]);
      i = 0;
    }
  }
});
