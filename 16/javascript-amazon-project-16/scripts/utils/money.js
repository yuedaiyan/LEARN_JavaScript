export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
    // return (priceCents / 100).toFixed(2);
}

// console.log(formatCurrency(-2000));
// -20.00
