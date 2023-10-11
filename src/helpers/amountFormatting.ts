export const formatAmountToDollar = (amount: number) => {
    if (isNaN(amount)) { return "$ --" }

    const options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 3 };
    return amount.toLocaleString('en-US', options).replace('$', '$ ');
};

export const formatAmountCoins = (amount: number) => {
    if (isNaN(amount)) { return "$ --" };

    const suffixes: string[] = ["", "K", "Million", "Billion", "Trillion"];
    const precision: number = 2;
    const symbol: string = "$";

    let index: number = 0;

    while (amount >= 1000 && index < suffixes.length - 1) {
        amount /= 1000;
        index++;
    };

    return `${symbol} ${amount.toFixed(precision)} ${suffixes[index]}`;
};

export const formatAmountStats = (amount: number, error: boolean = false) => {
    if (error) { return "--" } 

    if (isNaN(amount)) { return "Loading..." };

    const suffixes: string[] = ["", "K", "Million", "Billion", "Trillion"];
    const precision: number = 2;
    const symbol: string = "$";

    let index: number = 0;

    while (amount >= 1000 && index < suffixes.length - 1) {
        amount /= 1000;
        index++;
    };

    return `${symbol} ${amount.toFixed(precision)} ${suffixes[index]}`;
};

export const formatAmountToLocaleString = (amount: number, error: boolean) => {
    if (error) { return "--"}
    
    if (amount === 0) { return "Loading..." };

    const options = { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 };
    return amount.toLocaleString('en-US', options);
}