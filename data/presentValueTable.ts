// Present Value Table — Appendix E (CIVJI §12.09.5)
// Source: M. Berenblut and H. Rosen, Litigation Accounting,
//         The Quantification of Economic Damages (Carswell, 1995)
// Note the typo in the source material at Year 37: 1.5% - 26.2371 should be 28.2371
//
// British Columbia prescribed discount rates (Law and Equity Act, R.S.B.C. 1996, c. 253, s. 56;
// Law and Equity Regulation, B.C. Reg. 352/81, amended by B.C. Reg. 74/2014 as of April 30, 2014):
//   - 1.5% for future income loss (s. 56(2)(a))
//   - 2.0% for all other future losses e.g. cost of future care (s. 56(2)(b))

// This is a table of present value multipliers for different years and discount rates.
// It is used to calculate the present value of a future loss.
// The table is based on the British Columbia prescribed discount rates.
// The table is used to calculate the present value of a future loss.

export type RateTable = Record<number, number>;
export type PresentValueTable = Record<number, RateTable>;

export const BC_INCOME_LOSS_RATE = 1.5;
export const BC_OTHER_LOSSES_RATE = 2.0;
export const availableRates = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5];

export const presentValueTable: PresentValueTable = {
  1:  { 0.5: 0.9950, 1.0: 0.9901, 1.5: 0.9852, 2.0: 0.9804, 2.5: 0.9756, 3.0: 0.9709, 3.5: 0.9662 },
  2:  { 0.5: 1.9851, 1.0: 1.9704, 1.5: 1.9559, 2.0: 1.9416, 2.5: 1.9274, 3.0: 1.9135, 3.5: 1.8997 },
  3:  { 0.5: 2.9702, 1.0: 2.9410, 1.5: 2.9122, 2.0: 2.8839, 2.5: 2.8560, 3.0: 2.8286, 3.5: 2.8016 },
  4:  { 0.5: 3.9505, 1.0: 3.9020, 1.5: 3.8544, 2.0: 3.8077, 2.5: 3.7620, 3.0: 3.7171, 3.5: 3.6731 },
  5:  { 0.5: 4.9259, 1.0: 4.8534, 1.5: 4.7826, 2.0: 4.7135, 2.5: 4.6458, 3.0: 4.5797, 3.5: 4.5151 },
  6:  { 0.5: 5.8964, 1.0: 5.7955, 1.5: 5.6972, 2.0: 5.6014, 2.5: 5.5081, 3.0: 5.4172, 3.5: 5.3286 },
  7:  { 0.5: 6.8621, 1.0: 6.7282, 1.5: 6.5982, 2.0: 6.4720, 2.5: 6.3494, 3.0: 6.2303, 3.5: 6.1145 },
  8:  { 0.5: 7.8230, 1.0: 7.6517, 1.5: 7.4859, 2.0: 7.3255, 2.5: 7.1701, 3.0: 7.0197, 3.5: 6.8740 },
  9:  { 0.5: 8.7791, 1.0: 8.5660, 1.5: 8.3605, 2.0: 8.1622, 2.5: 7.9709, 3.0: 7.7861, 3.5: 7.6077 },
  10: { 0.5: 9.7304, 1.0: 9.4713, 1.5: 9.2222, 2.0: 8.9826, 2.5: 8.7521, 3.0: 8.5302, 3.5: 8.3166 },
  11: { 0.5: 10.6770, 1.0: 10.3676, 1.5: 10.0711, 2.0: 9.7868, 2.5: 9.5142, 3.0: 9.2526, 3.5: 9.0016 },
  12: { 0.5: 11.6189, 1.0: 11.2551, 1.5: 10.9075, 2.0: 10.5763, 2.5: 10.2578, 3.0: 9.9540, 3.5: 9.6633 },
  13: { 0.5: 12.5562, 1.0: 12.1337, 1.5: 11.7315, 2.0: 11.3484, 2.5: 10.9832, 3.0: 10.6350, 3.5: 10.3027 },
  14: { 0.5: 13.4887, 1.0: 13.0037, 1.5: 12.5434, 2.0: 12.1062, 2.5: 11.6909, 3.0: 11.2961, 3.5: 10.9205 },
  15: { 0.5: 14.4166, 1.0: 13.8651, 1.5: 13.3432, 2.0: 12.8493, 2.5: 12.3814, 3.0: 11.9379, 3.5: 11.5174 },
  16: { 0.5: 15.3399, 1.0: 14.7179, 1.5: 14.1313, 2.0: 13.5777, 2.5: 13.0550, 3.0: 12.5611, 3.5: 12.0941 },
  17: { 0.5: 16.2586, 1.0: 15.5623, 1.5: 14.9076, 2.0: 14.2919, 2.5: 13.7122, 3.0: 13.1661, 3.5: 12.6513 },
  18: { 0.5: 17.1728, 1.0: 16.3983, 1.5: 15.6726, 2.0: 14.9220, 2.5: 14.3534, 3.0: 13.7535, 3.5: 13.1897 },
  19: { 0.5: 18.0824, 1.0: 17.2260, 1.5: 16.4262, 2.0: 15.6785, 2.5: 14.9789, 3.0: 14.3238, 3.5: 13.7098 },
  20: { 0.5: 18.9874, 1.0: 18.0456, 1.5: 17.1686, 2.0: 16.3514, 2.5: 15.5892, 3.0: 14.8775, 3.5: 14.2124 },
  21: { 0.5: 19.8880, 1.0: 18.8570, 1.5: 17.9001, 2.0: 17.0112, 2.5: 16.1845, 3.0: 15.4150, 3.5: 14.6980 },
  22: { 0.5: 20.7841, 1.0: 19.6604, 1.5: 18.6208, 2.0: 17.6580, 2.5: 16.7654, 3.0: 15.9369, 3.5: 15.1671 },
  23: { 0.5: 21.6757, 1.0: 20.4558, 1.5: 19.3309, 2.0: 18.2922, 2.5: 17.3321, 3.0: 16.4436, 3.5: 15.6204 },
  24: { 0.5: 22.5629, 1.0: 21.2434, 1.5: 20.0304, 2.0: 18.9139, 2.5: 17.8850, 3.0: 16.9355, 3.5: 16.0584 },
  25: { 0.5: 23.4456, 1.0: 22.0232, 1.5: 20.7196, 2.0: 19.5235, 2.5: 18.4244, 3.0: 17.4131, 3.5: 16.4815 },
  26: { 0.5: 24.3240, 1.0: 22.7952, 1.5: 21.3986, 2.0: 20.1210, 2.5: 18.9506, 3.0: 17.8768, 3.5: 16.8904 },
  27: { 0.5: 25.1980, 1.0: 23.5596, 1.5: 22.0676, 2.0: 20.7069, 2.5: 19.4640, 3.0: 18.3270, 3.5: 17.2854 },
  28: { 0.5: 26.0677, 1.0: 24.3164, 1.5: 22.7267, 2.0: 21.2813, 2.5: 19.9649, 3.0: 18.7641, 3.5: 17.6670 },
  29: { 0.5: 26.9330, 1.0: 25.0658, 1.5: 23.3761, 2.0: 21.8444, 2.5: 20.4535, 3.0: 19.1885, 3.5: 18.0358 },
  30: { 0.5: 27.7941, 1.0: 25.8077, 1.5: 24.0158, 2.0: 22.3965, 2.5: 20.9303, 3.0: 19.6004, 3.5: 18.3920 },
  31: { 0.5: 28.6508, 1.0: 26.5423, 1.5: 24.6461, 2.0: 22.9377, 2.5: 21.3954, 3.0: 20.0004, 3.5: 18.7363 },
  32: { 0.5: 29.5033, 1.0: 27.2696, 1.5: 25.2671, 2.0: 23.4683, 2.5: 21.8492, 3.0: 20.3888, 3.5: 19.0689 },
  33: { 0.5: 30.3515, 1.0: 27.9897, 1.5: 25.8790, 2.0: 23.9886, 2.5: 22.2919, 3.0: 20.7658, 3.5: 19.3902 },
  34: { 0.5: 31.1955, 1.0: 28.7027, 1.5: 26.4817, 2.0: 24.4986, 2.5: 22.7238, 3.0: 21.1318, 3.5: 19.7007 },
  35: { 0.5: 32.0354, 1.0: 29.4086, 1.5: 27.0756, 2.0: 24.9986, 2.5: 23.1452, 3.0: 21.4872, 3.5: 20.0007 },
  36: { 0.5: 32.8710, 1.0: 30.1075, 1.5: 27.6607, 2.0: 25.4888, 2.5: 23.5563, 3.0: 21.8323, 3.5: 20.2905 },
  37: { 0.5: 33.7025, 1.0: 30.7995, 1.5: 28.2371, 2.0: 25.9695, 2.5: 23.9573, 3.0: 22.1672, 3.5: 20.5705 },
  38: { 0.5: 34.5299, 1.0: 31.4847, 1.5: 28.8051, 2.0: 26.4406, 2.5: 24.3486, 3.0: 22.4925, 3.5: 20.8411 },
  39: { 0.5: 35.3531, 1.0: 32.1630, 1.5: 29.3646, 2.0: 26.9026, 2.5: 24.7303, 3.0: 22.8082, 3.5: 21.1025 },
  40: { 0.5: 36.1722, 1.0: 32.8347, 1.5: 29.9158, 2.0: 27.3555, 2.5: 25.1028, 3.0: 23.1148, 3.5: 21.3551 },
  41: { 0.5: 36.9873, 1.0: 33.4997, 1.5: 30.4590, 2.0: 27.7995, 2.5: 25.4661, 3.0: 23.4124, 3.5: 21.5991 },
  42: { 0.5: 37.7983, 1.0: 34.1581, 1.5: 30.9941, 2.0: 28.2348, 2.5: 25.8206, 3.0: 23.7014, 3.5: 21.8349 },
  43: { 0.5: 38.6053, 1.0: 34.8100, 1.5: 31.5212, 2.0: 28.6616, 2.5: 26.1664, 3.0: 23.9819, 3.5: 22.0627 },
  44: { 0.5: 39.4082, 1.0: 35.4555, 1.5: 32.0406, 2.0: 29.0800, 2.5: 26.5038, 3.0: 24.2543, 3.5: 22.2828 },
  45: { 0.5: 40.2072, 1.0: 36.0945, 1.5: 32.5523, 2.0: 29.4902, 2.5: 26.8330, 3.0: 24.5187, 3.5: 22.4955 },
  46: { 0.5: 41.0022, 1.0: 36.7272, 1.5: 33.0565, 2.0: 29.8923, 2.5: 27.1542, 3.0: 24.7754, 3.5: 22.7009 },
  47: { 0.5: 41.7932, 1.0: 37.3537, 1.5: 33.5532, 2.0: 30.2866, 2.5: 27.4675, 3.0: 25.0247, 3.5: 22.8994 },
  48: { 0.5: 42.5803, 1.0: 37.9740, 1.5: 34.0426, 2.0: 30.6731, 2.5: 27.7732, 3.0: 25.2667, 3.5: 23.0912 },
  49: { 0.5: 43.3635, 1.0: 38.5881, 1.5: 34.5247, 2.0: 31.0521, 2.5: 28.0714, 3.0: 25.5017, 3.5: 23.2766 },
  50: { 0.5: 44.1428, 1.0: 39.1961, 1.5: 34.9997, 2.0: 31.4236, 2.5: 28.3623, 3.0: 25.7298, 3.5: 23.4556 },
};

/**
 * Look up a present value multiplier by years and discount rate.
 * @param years - Years to retirement (1–50)
 * @param rate  - Discount rate as a percentage (0.5, 1.0, 1.5, 2.0, 2.5, 3.0, or 3.5)
 */
export function getMultiplier(years: number, rate: number): number {
  const rateTable = presentValueTable[years];
  if (!rateTable) {
    throw new Error(`No data for ${years} years. Valid range is 1–50.`);
  }
  const multiplier = rateTable[rate];
  if (multiplier === undefined) {
    throw new Error(
      `No multiplier for rate ${rate}% at ${years} years. Available rates: ${availableRates.join(", ")}`
    );
  }
  return multiplier;
}

/**
 * Returns multipliers across all available rates for a given number of years.
 * Useful for cross-rate comparison (e.g. across provinces).
 */
export function compareRates(years: number): Record<number, number> {
  return Object.fromEntries(
    availableRates.map(rate => [rate, getMultiplier(years, rate)])
  );
}

/**
 * Calculate the lump sum present value of an LTD claim (BC income loss rate).
 * Uses the legislated BC rate of 1.5% for future income loss.
 * @param monthlyAmount  - Monthly benefit amount in dollars
 * @param years          - Years from policy start to retirement
 */
export function calculateBCIncomeLoss(monthlyAmount: number, years: number): number {
  const multiplier = getMultiplier(years, BC_INCOME_LOSS_RATE);
  return monthlyAmount * 12 * multiplier;
}

/**
 * Calculate the lump sum present value of other future losses (BC rate).
 * Uses the legislated BC rate of 2.0% for future care and other losses.
 * @param annualAmount - Annual future loss amount in dollars
 * @param years        - Number of years the loss will continue
 */
export function calculateBCOtherLosses(annualAmount: number, years: number): number {
  const multiplier = getMultiplier(years, BC_OTHER_LOSSES_RATE);
  return annualAmount * multiplier;
}
