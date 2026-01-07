export function detectCardSystem(cardNumber) {
    if (!cardNumber || typeof cardNumber !== 'string') {
      return 'unknown';
    }
    
    // Удаляем все нецифровые символы
    const cleaned = cardNumber.replace(/\D/g, '');
    
    if (cleaned.length === 0) {
      return 'unknown';
    }
    
    // Определение платежной системы по первым цифрам
    const firstDigit = cleaned.charAt(0);
    const firstTwoDigits = cleaned.substring(0, 2);
    const firstFourDigits = cleaned.substring(0, 4);
    
    // Visa: начинается с 4, длина 13, 16 или 19
    if (firstDigit === '4') {
      return 'visa';
    }
    
    // Mastercard: начинается с 51-55, или 2221-2720, длина 16
    if ((firstTwoDigits >= '51' && firstTwoDigits <= '55') || 
        (firstFourDigits >= '2221' && firstFourDigits <= '2720')) {
      return 'mastercard';
    }
    
    // Mir: начинается с 2200-2204, длина 16
    if (firstFourDigits >= '2200' && firstFourDigits <= '2204') {
      return 'mir';
    }
    
    // American Express: начинается с 34 или 37, длина 15
    if (firstTwoDigits === '34' || firstTwoDigits === '37') {
      return 'amex';
    }
    
    // Discover: начинается с 6011, 644-649 или 65, длина 16-19
    if (firstFourDigits === '6011' || 
        (firstTwoDigits >= '64' && firstTwoDigits <= '65') ||
        cleaned.substring(0, 3) >= '644' && cleaned.substring(0, 3) <= '649') {
      return 'discover';
    }
    
    // JCB: начинается с 3528-3589, длина 16-19
    if (firstFourDigits >= '3528' && firstFourDigits <= '3589') {
      return 'jcb';
    }
    
    // Diners Club: начинается с 300-305, 36 или 38, длина 14
    if ((firstTwoDigits >= '30' && firstTwoDigits <= '30') ||
        firstTwoDigits === '36' || firstTwoDigits === '38') {
      return 'diners';
    }
    
    return 'unknown';
  }