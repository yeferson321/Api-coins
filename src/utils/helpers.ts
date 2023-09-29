export const changeColorIcon = (uuid: string, name: string, localCoinStorage: string[]) => {
    if (localCoinStorage.includes(`&uuids[]=${uuid}&name=${name.toLowerCase()}`)) {
        return 'fill-red-600';
    } else {
        return 'fill-blue-500/50';
    };
};

export const convertToDollar = (amount: number): string => {
    const options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
    };

    return amount.toLocaleString('en-US', options).replace('$', '$ ');
};

export const formatCurrencyWithSuffix = (amount: number): string => {
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