'use strict';

const firstInput = document.getElementById('number1');
const secondInput = document.getElementById('number2');
const resultOutput = document.getElementById('result');
const resultPanel = document.querySelector('.result-panel');

// Поддерживаем десятичную точку и запятую, но не пропускаем посторонние символы.
function parseNumber(value) {
  const normalized = value.trim().replace(',', '.');
  if (normalized === '' || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) {
    return null;
  }
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function sum(a, b) { return a + b; }
function difference(a, b) { return a - b; }
function product(a, b) { return a * b; }
function quotient(a, b) { return a / b; }

const operations = { sum, difference, product, quotient };

function showResult(message, isError = false) {
  resultOutput.textContent = message;
  resultPanel.classList.toggle('error', isError);
}

function calculate(operation) {
  const a = parseNumber(firstInput.value);
  const b = parseNumber(secondInput.value);

  if (a === null || b === null) {
    showResult('Ошибка: введите два корректных числа.', true);
    return;
  }
  if (operation === 'quotient' && b === 0) {
    showResult('Ошибка: деление на ноль невозможно.', true);
    return;
  }
  const answer = operations[operation](a, b);
  if (!Number.isFinite(answer)) {
    showResult('Ошибка: результат выходит за допустимый диапазон.', true);
    return;
  }
  // Убираем незначащие погрешности двоичной арифметики для обычных десятичных чисел.
  const formatted = Number(answer.toPrecision(12)).toLocaleString('ru-RU', { maximumFractionDigits: 12 });
  showResult(formatted);
}

document.querySelectorAll('[data-operation]').forEach(button => {
  button.addEventListener('click', () => calculate(button.dataset.operation));
});
