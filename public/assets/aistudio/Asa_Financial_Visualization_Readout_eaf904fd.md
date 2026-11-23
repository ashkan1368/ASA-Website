# Asa Financial Visualization Readout

## What is visualized

The dashboard visualizes the assumptions from `Asa_Financial_Model.xlsx` across three scenario cases:

- **Conservative:** 8 new customers/month, 5% monthly growth.
- **Base:** 15 new customers/month, 8% monthly growth.
- **Upside:** 25 new customers/month, 12% monthly growth.

The projections apply each scenario’s shopping and medical service assumptions, payment/FX reserve, refund reserve, fixed operating cost, marketing spend, and customer-acquisition spend. Grocery product value is excluded from Asa service revenue and treated as pass-through.

## Key readout

- Base month-12 service revenue is approximately **$1,618**, excluding grocery value.
- Base contribution profit is approximately **$523** before fixed operating costs, marketing, and customer acquisition.
- Base contribution is approximately **$7 per shopping order** and **$13 per medical-companion visit**.
- At the modeled base fixed-cost and marketing burden, break-even requires approximately **789 shopping orders/month** or **403 medical visits/month** if relying on only one service.
- Under the current assumptions, all three scenarios remain cash-negative through month 12 because fixed operating costs, marketing, and customer acquisition spend are much larger than modeled contribution. The upside case produces more revenue but also assumes substantially higher growth and acquisition spend; it therefore shows a more negative cumulative cash position within the first year.

## Decision implication

The current model is best understood as a **diagnostic stress test**, not a launch forecast. It signals that Asa should not scale paid acquisition or carry large fixed costs before validating one of the following:

1. Higher service fees or minimum booking charges.
2. Lower fixed operating costs during the pilot.
3. Lower customer-acquisition spend through referrals and community partnerships.
4. Higher order frequency and repeat purchase.
5. A larger medical-companion service window or higher-value package, while preserving the non-clinical boundary.
6. A tighter service zone that reduces travel and worker idle time.

The most important next experiment is to measure real contribution per completed order—including worker time, travel, payment cost, refunds, and support time—before increasing volume.

## Files

- [Financial dashboard SVG](C:\Users\ashka\Documents\Manus\2026-10-12\oESGyC\Asa_Financial_Dashboard.svg)
- [Scenario projection CSV](C:\Users\ashka\Documents\Manus\2026-10-12\oESGyC\Asa_Scenario_Projections.csv)
- [Editable financial model](C:\Users\ashka\Documents\Manus\2026-10-12\oESGyC\Asa_Financial_Model.xlsx)

**Important:** These are illustrative planning assumptions, not observed sales data, quotes, or a financial forecast. Replace them with provider-approved payment costs, local worker/travel quotes, insurance, tax, and paid-pilot results.
