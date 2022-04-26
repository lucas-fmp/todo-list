/* eslint-disable no-shadow */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable no-inner-declarations */
/* eslint-disable complexity */
/* eslint-disable no-param-reassign */
/* eslint-disable sonarjs/cognitive-complexity */
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
  // Selecionando as tarefas ============================
  for (let i = 0; i < ol.childNodes.length; i += 1) {
    ol.childNodes[i].addEventListener('click', changeColor);
  }
  function changeColor(event) {
    for (let i = 0; i < ol.childNodes.length; i += 1) {
      ol.childNodes[i].classList.remove('active');
    }
    event.target.classList.add('active');
  }
  // ====================================================

  // Marcando as tarefas como concluídas ================
  for (let i = 0; i < ol.childNodes.length; i += 1) {
    let activated = true;
    ol.childNodes[i].addEventListener('dblclick', (event) => {
      event.target.className = activated ? 'completed' : '';
      activated = !activated;
    });
  }
  // ====================================================
});
// =====================================================

// Botão de apagar tudo ================================
const buttonClear = document.querySelector('#apaga-tudo');

buttonClear.addEventListener('click', () => {
  while (ol.hasChildNodes()) {
    ol.removeChild(ol.firstChild);
  }
});
// ======================================================

// Botão de remover finalizados =========================
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
// ======================================================

// Botão de salvar a lista ==============================
const buttonSaveList = document.querySelector('#salvar-tarefas');
const arrayClass = [];
const arrayText = [];
buttonSaveList.addEventListener('click', () => {
  for (let i = 0; i < ol.childNodes.length; i += 1) {
    arrayClass.push(ol.childNodes[i].className);
    arrayText.push(ol.childNodes[i].innerText);
  }
  localStorage.setItem('class', JSON.stringify(arrayClass));
  localStorage.setItem('text', JSON.stringify(arrayText));
});
// ======================================================

// Renderização inicial =================================
function initialRenderization() {
  if (localStorage.getItem('class') === null && localStorage.getItem('text') === null) {
    localStorage.setItem('class', JSON.stringify([]));
    localStorage.setItem('text', JSON.stringify([]));
  } else {
    for (let i = 0; i < JSON.parse(localStorage.getItem('class')).length; i += 1) {
      const stringText = localStorage.getItem('text');
      const newArrayText = JSON.parse(stringText);
      const stringClass = localStorage.getItem('class');
      const newArrayClass = JSON.parse(stringClass);
      const li = document.createElement('li');
      li.innerText = newArrayText[i];
      li.className = `tarefa ${newArrayClass[i]}`;
      ol.appendChild(li);
      // Selecionando as tarefas
      for (let i = 0; i < ol.childNodes.length; i += 1) {
        ol.childNodes[i].addEventListener('click', changeColor);
      }
      function changeColor(event) {
        for (let i = 0; i < ol.childNodes.length; i += 1) {
          ol.childNodes[i].classList.remove('active');
        }
        event.target.classList.add('active');
      }

      // Marcando as tarefas como concluídas
      for (let i = 0; i < ol.childNodes.length; i += 1) {
        let activated = true;
        ol.childNodes[i].addEventListener('dblclick', (event) => {
          event.target.className = activated ? 'completed' : '';
          activated = !activated;
        });
      }
    }
  }
}
// ======================================================

// Botão de mover pra cima ==============================
const buttonUp = document.querySelector('#mover-cima');
buttonUp.addEventListener('click', () => {
  const selected = ol.childNodes;
  for (let index = 1; index < ol.childNodes.length; index += 1) {
    let selectedClassList = JSON.stringify(selected[index].classList);
    if (selectedClassList.includes('active') === true) {
      let text1 = selected[index].innerText;
      let text2 = selected[index - 1].innerText;
      let class1 = selected[index].className;
      let class2 = selected[index - 1].className;
      selected[index].previousSibling.innerText = text1;
      selected[index].previousSibling.className = class1;
      selected[index].innerText = text2;
      selected[index].className = class2;
      console.log(selected[index]);
    }
  }
});
// ======================================================

// Botão de mover pra baixo =============================
const buttonDown = document.querySelector('#mover-baixo');
buttonDown.addEventListener('click', () => {
  const selected = ol.childNodes;
  for (let index = 0; index < ol.childNodes.length - 1; index += 1) {
    let selectedClassList = JSON.stringify(selected[index].classList);
    if (selectedClassList.includes('active') === true) {
      let text1 = selected[index].innerText;
      let text2 = selected[index].nextSibling.innerText;
      let class1 = selected[index].className;
      let class2 = selected[index].nextSibling.className;
      selected[index].nextSibling.innerText = text1;
      selected[index].nextSibling.className = class1;
      selected[index].innerText = text2;
      selected[index].className = class2;
      break;
    }
  }
});
// ======================================================

// Botão de apagar selecionado ==========================
const buttonClearSelected = document.querySelector('#remover-selecionado');

buttonClearSelected.addEventListener('click', () => {
  const selected = ol.childNodes;
  for (let index = 0; index < ol.childNodes.length; index += 1) {
    let className = JSON.stringify(selected[index].className);
    if (className.includes('active')) {
      ol.removeChild(selected[index]);
    }
  }
})
// ======================================================

window.onload = function () {
  initialRenderization();
};
