// Robinson HVAC Tech Inc. — Financial Data (all figures in $000s)

export const shipmentData = [
  { month: "Oct '22", forecast: 13016, actual: 12854, forecastMay: null },
  { month: "Nov '22", forecast: 12438, actual: 12616, forecastMay: null },
  { month: "Dec '22", forecast: 12500, actual: 12034, forecastMay: null },
  { month: "Jan '23", forecast: 12148, actual: 12354, forecastMay: null },
  { month: "Feb '23", forecast: 11992, actual: 12028, forecastMay: null },
  { month: "Mar '23", forecast: 12582, actual: 10412, forecastMay: null },
  { month: "Apr '23", forecast: 13030, actual: 8344, forecastMay: null },
  { month: "May '23", forecast: 13664, actual: 7508, forecastMay: null },
  { month: "Jun '23", forecast: 13518, actual: null, forecastMay: 25362 },
  { month: "Jul '23", forecast: 13290, actual: null, forecastMay: 14748 },
  { month: "Aug '23", forecast: 12956, actual: null, forecastMay: 14402 },
  { month: "Sep '23", forecast: 12866, actual: null, forecastMay: 14788 },
];

export const incomeStatements = [
  { month: "Aug '22", netSales: 12668, cogs: 9988, grossProfit: 2680, opEx: 1546, da: 240, interest: 0, ebt: 894, tax: 224, netIncome: 670 },
  { month: "Sep '22", netSales: 11966, cogs: 9454, grossProfit: 2512, opEx: 1526, da: 240, interest: 0, ebt: 746, tax: 187, netIncome: 559 },
  { month: "Oct '22", netSales: 12854, cogs: 10006, grossProfit: 2848, opEx: 1554, da: 240, interest: 50, ebt: 1004, tax: 251, netIncome: 753 },
  { month: "Nov '22", netSales: 12616, cogs: 9828, grossProfit: 2788, opEx: 1576, da: 240, interest: 50, ebt: 922, tax: 231, netIncome: 691 },
  { month: "Dec '22", netSales: 12034, cogs: 9390, grossProfit: 2644, opEx: 1466, da: 240, interest: 50, ebt: 888, tax: 222, netIncome: 666 },
  { month: "Jan '23", netSales: 12354, cogs: 9630, grossProfit: 2724, opEx: 1456, da: 240, interest: 50, ebt: 978, tax: 245, netIncome: 733 },
  { month: "Feb '23", netSales: 12028, cogs: 9384, grossProfit: 2644, opEx: 1488, da: 240, interest: 50, ebt: 866, tax: 217, netIncome: 649 },
  { month: "Mar '23", netSales: 10412, cogs: 8174, grossProfit: 2238, opEx: 1370, da: 240, interest: 50, ebt: 578, tax: 145, netIncome: 433 },
  { month: "Apr '23", netSales: 8344, cogs: 6430, grossProfit: 1914, opEx: 1174, da: 240, interest: 50, ebt: 450, tax: 113, netIncome: 337 },
  { month: "May '23", netSales: 7508, cogs: 5752, grossProfit: 1756, opEx: 1132, da: 240, interest: 50, ebt: 334, tax: 84, netIncome: 250 },
  // Forecasts Jun–Sep 2023
  { month: "Jun '23*", netSales: 21414, cogs: 16715, grossProfit: 4699, opEx: 1800, da: 240, interest: 74, ebt: 2585, tax: 646, netIncome: 1939 },
  { month: "Jul '23*", netSales: 18696, cogs: 14578, grossProfit: 4118, opEx: 1800, da: 240, interest: 74, ebt: 2004, tax: 501, netIncome: 1503 },
  { month: "Aug '23*", netSales: 14402, cogs: 11216, grossProfit: 3186, opEx: 1800, da: 480, interest: 74, ebt: 832, tax: 208, netIncome: 624 },
  { month: "Sep '23*", netSales: 14788, cogs: 11517, grossProfit: 3271, opEx: 1800, da: 480, interest: 74, ebt: 917, tax: 229, netIncome: 688 },
];

export const balanceSheets = [
  { month: "Aug '22", cash: 11700, ar: 11586, inventory: 14308, prepaid: 484, currentAssets: 38078, grossPPE: 91000, accDep: 60736, netPPE: 30264, totalAssets: 68342, ap: 9954, notesPayable: 0, accruedTax: 504, otherAccrued: 3000, customerAdv: 3302, totalLiab: 16760, equity: 51582 },
  { month: "Sep '22", cash: 7306, ar: 11938, inventory: 14728, prepaid: 116, currentAssets: 34088, grossPPE: 91000, accDep: 60976, netPPE: 30024, totalAssets: 64112, ap: 10394, notesPayable: 10000, accruedTax: 191, otherAccrued: 3084, customerAdv: 3302, totalLiab: 26971, equity: 37141 },
  { month: "Oct '22", cash: 7696, ar: 12842, inventory: 15048, prepaid: 46, currentAssets: 35632, grossPPE: 91000, accDep: 61216, netPPE: 29784, totalAssets: 65416, ap: 10694, notesPayable: 10000, accruedTax: 442, otherAccrued: 3084, customerAdv: 3302, totalLiab: 27522, equity: 37894 },
  { month: "Nov '22", cash: 9672, ar: 11702, inventory: 14438, prepaid: 90, currentAssets: 35902, grossPPE: 91000, accDep: 61456, netPPE: 29544, totalAssets: 65446, ap: 10704, notesPayable: 10000, accruedTax: 673, otherAccrued: 3084, customerAdv: 2400, totalLiab: 26861, equity: 38585 },
  { month: "Dec '22", cash: 9380, ar: 12018, inventory: 14554, prepaid: 94, currentAssets: 36046, grossPPE: 91000, accDep: 61696, netPPE: 29304, totalAssets: 65350, ap: 10220, notesPayable: 10000, accruedTax: 395, otherAccrued: 3084, customerAdv: 2400, totalLiab: 26099, equity: 39251 },
  { month: "Jan '23", cash: 10666, ar: 12340, inventory: 14194, prepaid: 104, currentAssets: 37304, grossPPE: 91000, accDep: 61936, netPPE: 29064, totalAssets: 66368, ap: 10260, notesPayable: 10000, accruedTax: 640, otherAccrued: 3084, customerAdv: 2400, totalLiab: 26384, equity: 39984 },
  { month: "Feb '23", cash: 11274, ar: 11212, inventory: 15058, prepaid: 130, currentAssets: 37674, grossPPE: 91000, accDep: 62176, netPPE: 28824, totalAssets: 66498, ap: 10324, notesPayable: 10000, accruedTax: 857, otherAccrued: 3084, customerAdv: 1600, totalLiab: 25865, equity: 40633 },
  { month: "Mar '23", cash: 9084, ar: 10394, inventory: 16742, prepaid: 92, currentAssets: 36312, grossPPE: 91000, accDep: 62416, netPPE: 28584, totalAssets: 64896, ap: 10244, notesPayable: 10000, accruedTax: 502, otherAccrued: 2284, customerAdv: 1600, totalLiab: 24630, equity: 40266 },
  { month: "Apr '23", cash: 13714, ar: 6730, inventory: 22468, prepaid: 92, currentAssets: 43004, grossPPE: 91000, accDep: 62656, netPPE: 28344, totalAssets: 71348, ap: 12446, notesPayable: 10000, accruedTax: 615, otherAccrued: 2284, customerAdv: 5400, totalLiab: 30745, equity: 40603 },
  { month: "May '23", cash: 11148, ar: 7488, inventory: 24326, prepaid: 108, currentAssets: 43070, grossPPE: 91000, accDep: 62896, netPPE: 28104, totalAssets: 71174, ap: 11938, notesPayable: 10000, accruedTax: 699, otherAccrued: 2284, customerAdv: 5400, totalLiab: 30321, equity: 40853 },
  // Forecasts
  { month: "Jun '23*", cash: 7378, ar: 11751, inventory: 23106, prepaid: 108, currentAssets: 42344, grossPPE: 91000, accDep: 63136, netPPE: 27864, totalAssets: 70208, ap: 9800, notesPayable: 10000, accruedTax: 646, otherAccrued: 2284, customerAdv: 3086, totalLiab: 25816, equity: 44392 },
  { month: "Jul '23*", cash: 7881, ar: 11751, inventory: 21886, prepaid: 108, currentAssets: 41627, grossPPE: 91000, accDep: 63376, netPPE: 27624, totalAssets: 69251, ap: 9800, notesPayable: 10000, accruedTax: 501, otherAccrued: 2284, customerAdv: 771, totalLiab: 23356, equity: 45894 },
  { month: "Aug '23*", cash: 9141, ar: 11751, inventory: 20666, prepaid: 108, currentAssets: 41666, grossPPE: 91000, accDep: 63856, netPPE: 27144, totalAssets: 68810, ap: 9800, notesPayable: 14800, accruedTax: 208, otherAccrued: 2284, customerAdv: 0, totalLiab: 27092, equity: 41718 },
  { month: "Sep '23*", cash: 11550, ar: 11751, inventory: 19446, prepaid: 108, currentAssets: 42855, grossPPE: 91000, accDep: 64336, netPPE: 26664, totalAssets: 69519, ap: 9800, notesPayable: 14800, accruedTax: 229, otherAccrued: 2284, customerAdv: 0, totalLiab: 27113, equity: 42406 },
];

export const cashFlowData = [
  { month: "Sep '22", cfops: 606, cfinv: 0, cffin: -5000, netChange: -4394 },
  { month: "Oct '22", cfops: 390, cfinv: 0, cffin: 0, netChange: 390 },
  { month: "Nov '22", cfops: 1976, cfinv: 0, cffin: 0, netChange: 1976 },
  { month: "Dec '22", cfops: -292, cfinv: 0, cffin: 0, netChange: -292 },
  { month: "Jan '23", cfops: 1286, cfinv: 0, cffin: 0, netChange: 1286 },
  { month: "Feb '23", cfops: 608, cfinv: 0, cffin: 0, netChange: 608 },
  { month: "Mar '23", cfops: -1390, cfinv: 0, cffin: 800, netChange: -590 },
  { month: "Apr '23", cfops: 4630, cfinv: 0, cffin: 0, netChange: 4630 },
  { month: "May '23", cfops: -2566, cfinv: 0, cffin: 0, netChange: -2566 },
  { month: "Jun '23*", cfops: -5370, cfinv: 0, cffin: 0, netChange: -5370 },
  { month: "Jul '23*", cfops: 503, cfinv: -4800, cffin: 4800, netChange: 503 },
  { month: "Aug '23*", cfops: 1260, cfinv: 0, cffin: 0, netChange: 1260 },
  { month: "Sep '23*", cfops: 2409, cfinv: 0, cffin: -14800, netChange: -12391 },
];

export const altmanZScore = {
  wc: 11148,
  ta: 71174,
  re: 40853,
  ebit: 9192,
  mve: 50000,
  tl: 30321,
  sales: 135341,
  zScore: 6.9,
};

export const keyMetrics = {
  currentCashMay23: 11148,
  forecastCashJun23: 7378,
  forecastCashSep23: 11550,
  existingLoan: 10000,
  capexLoan: 4800,
  totalDebt: 14800,
  altmanZ: 6.9,
  equityMay23: 40853,
  inventoryBuildupExcess: 4880,
};
