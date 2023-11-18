// This function formats a number as a dollar amount
export const formatAmountToDollar = (amount: number) => {
    // If the number is not a valid number, returns a string indicating an unavailable value
    if (isNaN(amount)) return "$ --";

    // Options to format the number as a dollar amount with a minimum and maximum number of decimal digits
    const options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 3 };
    // Use the toLocaleString function to format the dollar amount and replace the '$' symbol with '$' leaving a space
    return amount.toLocaleString('en-US', options).replace('$', '$ ');
};

// This function formats a number with a suffix (K, Million, Billion, etc.)
export const formatAmountWithSuffixe = (amount: number) => {
    // If the number is not a valid number, returns a string indicating an unavailable value
    if (isNaN(amount)) return "$ --";

    // Suffixes for different numerical scales (K, Million, Billion, Trillion)
    const suffixes = ["", "K", "Million", "Billion", "Trillion"];
    let index = 0;

    // Iterates to find the appropriate suffix based on the scale of the number
    while (amount >= 1000 && index < suffixes.length - 1) {
        amount /= 1000;
        index++;
    };

    // Returns the number formatted with the corresponding suffix
    return `${amount.toFixed(2)} ${suffixes[index]}`;
};