// Formats an amount to a dollar currency format.
export const formatAmountToDollar = (amount: number) => {
    if (isNaN(amount)) return "$ --";

    const options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 3 };
    // Formats the amount to a dollar currency format and adds a space after the dollar symbol.
    return amount.toLocaleString('en-US', options).replace('$', '$ ');
};

// Formats an amount with a suffix (K, Million, Billion, Trillion).
export const formatAmountWithSuffixe = (amount: number) => {
    if (isNaN(amount)) return "$ --";

    // Array of suffixes for different scales.
    const suffixes = ["", "K", "Million", "Billion", "Trillion"];
    let index = 0;

    // Finds the appropriate suffix based on the amount's scale.
    while (amount >= 1000 && index < suffixes.length - 1) {
        amount /= 1000;
        index++;
    };

    // Formats the amount with the determined suffix.
    return `${amount.toFixed(2)} ${suffixes[index]}`;
};

