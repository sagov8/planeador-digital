import quotes from '../data/quotes.json';

export function getQuote() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use the day number to select a quote from the array (cycling if necessary)
    const quoteIndex = dayOfYear % quotes.length;
    
    return quotes[quoteIndex];
};

