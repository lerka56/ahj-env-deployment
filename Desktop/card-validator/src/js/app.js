import { luhnCheck } from './cardValidator.js';
import { detectCardSystem } from './cardSystemDetector.js';

export default class CardValidatorWidget {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.cardNumber = '';
    this.cardSystem = 'unknown';
    this.isValid = false;
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="card-validator">
        <h2>Проверка банковской карты</h2>
        <div class="input-container">
          <input 
            type="text" 
            id="card-input" 
            placeholder="Введите номер карты"
            maxlength="19"
          >
          <button id="validate-btn">Проверить</button>
        </div>
        <div class="card-preview">
          <div class="card-icons">
            <img src="./images/visa.png" alt="Visa" class="card-icon" data-system="visa">
            <img src="./images/mastercard.png" alt="Mastercard" class="card-icon" data-system="mastercard">
            <img src="./images/mir.png" alt="Мир" class="card-icon" data-system="mir">
            <img src="./images/amex.png" alt="American Express" class="card-icon" data-system="amex">
          </div>
          <div class="validation-result">
            <div id="card-system-display"></div>
            <div id="card-validity"></div>
          </div>
        </div>
        <div class="examples">
          <p>Примеры тестовых номеров:</p>
          <ul>
            <li>Visa: 4111 1111 1111 1111</li>
            <li>Mastercard: 5555 5555 5555 4444</li>
            <li>Мир: 2200 0000 0000 0004</li>
            <li>American Express: 3782 822463 10005</li>
          </ul>
        </div>
      </div>
    `;
  }
  
  bindEvents() {
    const input = document.getElementById('card-input');
    const button = document.getElementById('validate-btn');
    
    input.addEventListener('input', (e) => {
      this.handleInput(e);
    });
    
    button.addEventListener('click', () => {
      this.validateCard();
    });
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.validateCard();
      }
    });
  }
  
  handleInput(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    // Форматирование с пробелами через каждые 4 цифры
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    event.target.value = value;
    this.cardNumber = value.replace(/\s/g, '');
    
    // Определяем платежную систему по мере ввода
    this.cardSystem = detectCardSystem(this.cardNumber);
    this.updateCardIcons();
  }
  
  validateCard() {
    this.isValid = luhnCheck(this.cardNumber);
    this.displayResult();
  }
  
  updateCardIcons() {
    const icons = document.querySelectorAll('.card-icon');
    icons.forEach(icon => {
      if (icon.dataset.system === this.cardSystem) {
        icon.classList.add('active');
      } else {
        icon.classList.remove('active');
      }
    });
  }
  
  displayResult() {
    const systemDisplay = document.getElementById('card-system-display');
    const validityDisplay = document.getElementById('card-validity');
    
    const systemNames = {
      visa: 'Visa',
      mastercard: 'Mastercard',
      mir: 'Мир',
      amex: 'American Express',
      discover: 'Discover',
      jcb: 'JCB',
      diners: 'Diners Club',
      unknown: 'Неизвестная платежная система'
    };
    
    systemDisplay.textContent = `Платежная система: ${systemNames[this.cardSystem] || 'Неизвестна'}`;
    
    if (this.cardNumber.length < 13) {
      validityDisplay.textContent = 'Номер карты слишком короткий';
      validityDisplay.className = 'invalid';
    } else if (this.isValid) {
      validityDisplay.textContent = '✅ Номер карты валиден';
      validityDisplay.className = 'valid';
    } else {
      validityDisplay.textContent = '❌ Номер карты невалиден';
      validityDisplay.className = 'invalid';
    }
  }
}