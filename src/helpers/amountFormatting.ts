export const formatAmountToDollar = (amount: number) => {
    if (isNaN(amount)) return "$ --";

    const options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 3 };
    return amount.toLocaleString('en-US', options).replace('$', '$ ');
};

export const formatAmountWithSuffixe = (amount: number) => {
    if (isNaN(amount)) return "$ --";

    const suffixes = ["", "K", "Million", "Billion", "Trillion"];
    let index = 0;

    while (amount >= 1000 && index < suffixes.length - 1) {
        amount /= 1000;
        index++;
    }

    return `${amount.toFixed(2)} ${suffixes[index]}`;
};