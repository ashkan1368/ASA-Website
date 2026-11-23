import { Language, CurrencyCode, formatPrice } from '../data/catalogData';

export interface OfficialDossierPayload {
  referenceCode: string;
  recipientName: string;
  residenceAddress: string;
  deliveryWindow: string;
  passThroughTotalUsd: number;
  asaServiceFeeUsd: number;
  grandTotalUsd: number;
  gatewayName: string;
  specialInstructions?: string;
  personalMessageCard?: string;
  hasVoiceNote?: boolean;
  itemsSummary: { title: string; qtyOrType: string; priceFormatted: string }[];
  stageLabel: string;
  lang: Language;
  currency: CurrencyCode;
}

/**
 * Generates and downloads an official luxury gold-bordered Asa Receipt & Family Update Dossier
 * as a self-contained printable HTML/PDF-ready document without using window.open or window.alert.
 */
export function downloadOfficialAsaDossier(payload: OfficialDossierPayload): void {
  const isFa = payload.lang === 'fa';
  const passFmt = formatPrice(payload.passThroughTotalUsd, payload.lang, '', '', payload.currency).amount;
  const feeFmt = formatPrice(payload.asaServiceFeeUsd, payload.lang, '', '', payload.currency).amount;
  const grandFmt = formatPrice(payload.grandTotalUsd, payload.lang, '', '', payload.currency).amount;

  const itemsRowsHtml = payload.itemsSummary
    .map(
      (item, idx) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #2A302C; font-family: monospace; color: #C8A96A;">${
          idx + 1
        }</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #2A302C; color: #F5F2EB;">${
          item.title
        }</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #2A302C; color: #9E988E;">${
          item.qtyOrType
        }</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #2A302C; font-family: monospace; color: #C8A96A; text-align: left;">${
          item.priceFormatted
        }</td>
      </tr>`
    )
    .join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="${isFa ? 'fa' : 'en'}" dir="${isFa ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8" />
  <title>ASA Official Receipt & Family Dossier — ${payload.referenceCode}</title>
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700&family=Cormorant+Garamond:wght@600;700&display=swap" rel="stylesheet" />
  <style>
    @page { size: A4; margin: 14mm; }
    body {
      background: #0D0F0E;
      color: #F5F2EB;
      font-family: 'Vazirmatn', sans-serif;
      margin: 0;
      padding: 28px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .dossier-frame {
      max-width: 820px;
      margin: 0 auto;
      background: #121614;
      border: 2px solid #C8A96A;
      padding: 32px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.75);
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid rgba(200,169,106,0.35);
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 28px;
      color: #F5F2EB;
      margin: 0;
      letter-spacing: 0.08em;
    }
    .brand-motto {
      font-size: 13px;
      color: #C8A96A;
      margin-top: 4px;
      font-weight: 600;
    }
    .badge {
      display: inline-block;
      background: rgba(62,123,94,0.22);
      border: 1px solid #3E7B5E;
      color: #8FE3B8;
      padding: 6px 12px;
      font-size: 12px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      background: #0D0F0E;
      border: 1px solid rgba(255,255,255,0.1);
      padding: 18px;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .meta-label { color: #9E988E; display: block; margin-bottom: 3px; font-size: 11px; }
    .meta-val { color: #F5F2EB; font-weight: 600; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 13px;
    }
    th {
      background: #1A201D;
      color: #C8A96A;
      padding: 10px 12px;
      text-align: inherit;
      border-bottom: 1px solid #C8A96A;
    }
    .summary-box {
      background: #0D0F0E;
      border: 1px solid rgba(200,169,106,0.45);
      padding: 18px;
      margin-bottom: 20px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
    }
    .summary-total {
      border-top: 1px solid rgba(200,169,106,0.4);
      margin-top: 8px;
      padding-top: 10px;
      font-size: 16px;
      font-weight: 700;
      color: #C8A96A;
    }
    .print-bar {
      text-align: center;
      margin-bottom: 18px;
    }
    .print-btn {
      background: #C8A96A;
      color: #0D0F0E;
      border: none;
      padding: 10px 24px;
      font-family: inherit;
      font-weight: 700;
      cursor: pointer;
      font-size: 13px;
    }
    @media print { .print-bar { display: none; } }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">
      ${isFa ? 'چاپ یا ذخیره مستقیم به عنوان PDF (Print / Save as PDF)' : 'Print or Save as Official PDF'}
    </button>
  </div>
  <div class="dossier-frame">
    <div class="header-bar">
      <div>
        <h1 class="brand-title">${isFa ? 'آسـا | ASA' : 'ASA FAMILY STEWARDSHIP'}</h1>
        <div class="brand-motto">${
          isFa ? 'آسایش · سهولت · آرامش — پرونده رسمی سفارش و گزارش خانواده' : 'COMFORT · EASE · PEACE OF MIND — Official Receipt & Family Update Dossier'
        }</div>
      </div>
      <div style="text-align: end;">
        <div class="badge">${payload.stageLabel}</div>
        <div style="font-family: monospace; color: #C8A96A; margin-top: 8px; font-size: 14px;">
          REF: ${payload.referenceCode}
        </div>
      </div>
    </div>

    <div class="meta-grid">
      <div>
        <span class="meta-label">${isFa ? 'گیرنده خدمت (والدین گرامی):' : 'Family Recipient:'}</span>
        <span class="meta-val">${payload.recipientName}</span>
      </div>
      <div>
        <span class="meta-label">${isFa ? 'بازه زمانی هماهنگ‌شده:' : 'Scheduled Window:'}</span>
        <span class="meta-val">${payload.deliveryWindow}</span>
      </div>
      <div>
        <span class="meta-label">${isFa ? 'نشانی محل سکونت در تهران:' : 'Tehran Residence:'}</span>
        <span class="meta-val">${payload.residenceAddress}</span>
      </div>
      <div>
        <span class="meta-label">${isFa ? 'درگاه تسویه و تضمین فاکتور:' : 'Settlement Gateway & Audit:'}</span>
        <span class="meta-val">${payload.gatewayName} (0% Grocery Markup)</span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>${isFa ? 'شرح خدمت یا کالای سوپرمارکتی' : 'Service or Provision Item'}</th>
          <th>${isFa ? 'تعداد / نوع' : 'Qty / Type'}</th>
          <th style="text-align: left;">${isFa ? 'مبلغ' : 'Amount'}</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRowsHtml}
      </tbody>
    </table>

    <div class="summary-box">
      <div class="summary-row">
        <span>${isFa ? 'بهای خالص کالاها (دقیقاً طبق فاکتور رسمی فروشگاه - ۰٪ سود پنهان):' : 'Pass-Through Store Receipt Goods (0% Markup):'}</span>
        <strong style="font-family: monospace;">${passFmt}</strong>
      </div>
      <div class="summary-row">
        <span>${isFa ? 'کارمزد خدمات، هماهنگی و اعزام همراه آسا:' : 'Asa Service & Stewardship Coordination Fee:'}</span>
        <strong style="font-family: monospace; color: #C8A96A;">${feeFmt}</strong>
      </div>
      <div class="summary-row summary-total">
        <span>${isFa ? 'مجموع کل تسویه‌شده:' : 'Total Settled Amount:'}</span>
        <span style="font-family: monospace;">${grandFmt}</span>
      </div>
    </div>

    ${
      payload.specialInstructions
        ? `<div style="background:#0D0F0E; border:1px solid rgba(255,255,255,0.12); padding:14px; margin-bottom:14px; font-size:12px;">
            <strong style="color:#C8A96A; display:block; margin-bottom:4px;">${
              isFa ? 'دستورات ویژه و ملاحظات رژیم غذایی والدین:' : 'Dietary & Special Care Instructions:'
            }</strong>
            <span>${payload.specialInstructions}</span>
          </div>`
        : ''
    }

    ${
      payload.personalMessageCard
        ? `<div style="background:#171B18; border:1px solid #C8A96A; padding:14px; margin-bottom:14px; font-size:12px;">
            <strong style="color:#C8A96A; display:block; margin-bottom:4px;">${
              isFa
                ? 'متن کارت تبریک خوشنویسی در پاکت طلاکوب برای والدین:'
                : 'Personal Calligraphy Card Message Delivered in Gold Envelope:'
            }</strong>
            <em>“${payload.personalMessageCard}”</em>
            ${
              payload.hasVoiceNote
                ? `<div style="color:#8FE3B8; margin-top:6px;">✓ ${
                    isFa
                      ? 'پیام صوتی ۳۰ ثانیه‌ای فرزند پیوست پرونده همراه آسا گردید.'
                      : '30-second personal voice note attached for steward playback.'
                  }</div>`
                : ''
            }
          </div>`
        : ''
    }

    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; font-size: 11px; color: #9E988E; display: flex; justify-content: space-between;">
      <span>${
        isFa
          ? 'تاییدشده توسط واحد ممیزی فاکتور و تضمین کیفیت آسا (کلارا رستمی و رکسانا بختیاری)'
          : 'Audited by ASA Quality & Receipt Verification Desk (Clara Rostami & Roxana Bakhtiari)'
      }</span>
      <span>ASA · آسایش · سهولت · آرامش</span>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${payload.referenceCode}-Asa-Official-Dossier.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

export interface StoreReceiptLineItem {
  nameFa: string;
  nameEn: string;
  qtyLabelFa: string;
  qtyLabelEn: string;
  priceUsd: number;
}

export interface OfficialStoreReceiptInput {
  referenceCode: string;
  recipientName: string;
  residenceAddress: string;
  deliveryWindow: string;
  createdAt: string;
  items: StoreReceiptLineItem[];
  passThroughTotalUsd: number;
  asaServiceFeeUsd: number;
  lang: Language;
  currency: CurrencyCode;
  stewardNameFa?: string;
  stewardNameEn?: string;
}

/**
 * Generates a high-resolution HTML5 Canvas representing the Official Pass-Through Store Receipt
 * with ASA 0% Markup Audit Seal and returns the rendered HTMLCanvasElement.
 */
export function renderOfficialStoreReceiptCanvas(
  input: OfficialStoreReceiptInput
): HTMLCanvasElement {
  const isFa = input.lang === 'fa';
  const width = 880;
  const lineHeight = 46;
  const itemsCount = Math.max(input.items.length, 1);
  const height = Math.max(1060, 740 + itemsCount * lineHeight);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Paper / Luxury Dark-Parchment Receipt Surface (Crisp light ivory receipt framed in Asa dark gold obsidian)
  ctx.fillStyle = '#0D0F0E';
  ctx.fillRect(0, 0, width, height);

  // Outer Gold Border Frame
  ctx.strokeStyle = '#C8A96A';
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, width - 36, height - 36);

  // Inner Fine Border
  ctx.strokeStyle = 'rgba(200, 169, 106, 0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Ivory Official Store Receipt Slip inside the obsidian frame
  const slipX = 48;
  const slipY = 48;
  const slipW = width - 96;
  const slipH = height - 96;

  ctx.fillStyle = '#F7F3EA';
  ctx.fillRect(slipX, slipY, slipW, slipH);

  // Top Header Strip inside slip
  ctx.fillStyle = '#151816';
  ctx.fillRect(slipX, slipY, slipW, 138);

  // Top Gold Accent Bar
  ctx.fillStyle = '#C8A96A';
  ctx.fillRect(slipX, slipY, slipW, 6);

  ctx.textBaseline = 'middle';

  // Brand Title Left / Right
  ctx.fillStyle = '#C8A96A';
  ctx.font = 'bold 28px Vazirmatn, Georgia, serif';
  ctx.textAlign = isFa ? 'right' : 'left';
  ctx.fillText(
    isFa ? 'آسـا | ASA' : 'ASA FAMILY STEWARDSHIP',
    isFa ? slipX + slipW - 32 : slipX + 32,
    slipY + 46
  );

  ctx.fillStyle = '#F5F2EB';
  ctx.font = '600 15px Vazirmatn, sans-serif';
  ctx.fillText(
    isFa
      ? 'فاکتور رسمی فروشگاه همکار + ممیزی ۰٪ سود آسا'
      : 'OFFICIAL PARTNER STORE RECEIPT · 0% MARKUP VERIFIED',
    isFa ? slipX + slipW - 32 : slipX + 32,
    slipY + 82
  );

  ctx.fillStyle = '#9E988E';
  ctx.font = '13px Vazirmatn, sans-serif';
  ctx.fillText(
    isFa
      ? 'آسایش · سهولت · آرامش  |  واحد ممیزی: کلارا رستمی'
      : 'COMFORT · EASE · PEACE OF MIND  |  Audited by Clara Rostami',
    isFa ? slipX + slipW - 32 : slipX + 32,
    slipY + 110
  );

  // Reference Code Badge on opposite side
  ctx.textAlign = isFa ? 'left' : 'right';
  ctx.fillStyle = '#C8A96A';
  ctx.font = 'bold 18px monospace';
  ctx.fillText(
    `REF: ${input.referenceCode}`,
    isFa ? slipX + 32 : slipX + slipW - 32,
    slipY + 48
  );
  ctx.fillStyle = '#8FE3B8';
  ctx.font = 'bold 13px Vazirmatn, sans-serif';
  ctx.fillText(
    isFa ? '✓ فاکتور تاییدشده (تهران)' : '✓ STORE RECEIPT VERIFIED',
    isFa ? slipX + 32 : slipX + slipW - 32,
    slipY + 82
  );

  // Store & Order Metadata Section
  let cursorY = slipY + 172;
  ctx.fillStyle = '#EBE4D4';
  ctx.fillRect(slipX + 28, cursorY - 20, slipW - 56, 134);
  ctx.strokeStyle = '#D5C7A7';
  ctx.lineWidth = 1;
  ctx.strokeRect(slipX + 28, cursorY - 20, slipW - 56, 134);

  const metaLeftX = slipX + 46;
  const metaRightX = slipX + slipW - 46;
  ctx.textAlign = isFa ? 'right' : 'left';

  const drawMetaLine = (label: string, value: string, yPos: number) => {
    ctx.fillStyle = '#5F5B52';
    ctx.font = 'bold 13px Vazirmatn, sans-serif';
    ctx.fillText(label, isFa ? metaRightX : metaLeftX, yPos);
    ctx.fillStyle = '#151816';
    ctx.font = '600 14px Vazirmatn, sans-serif';
    const offset = isFa ? -175 : 185;
    ctx.fillText(value, (isFa ? metaRightX : metaLeftX) + offset, yPos);
  };

  drawMetaLine(
    isFa ? 'نام فروشگاه صادرکننده:' : 'Partner Store Issuer:',
    isFa
      ? 'هایپرمارکت زعفرانیه و نانوایی سنگک آصف (کد مالیاتی THR-4091)'
      : 'Zafaranieh Fine Market & Assef Sangak Bakery (Tax ID: THR-4091)',
    cursorY + 6
  );
  drawMetaLine(
    isFa ? 'گیرنده (والدین گرامی):' : 'Recipient (Parents):',
    input.recipientName,
    cursorY + 34
  );
  drawMetaLine(
    isFa ? 'نشانی تحویل (تهران):' : 'Tehran Address:',
    input.residenceAddress,
    cursorY + 62
  );
  drawMetaLine(
    isFa ? 'زمان و همراه اعزامی:' : 'Window & Steward:',
    `${input.deliveryWindow} · ${
      isFa
        ? input.stewardNameFa || 'سهراب فرهمند'
        : input.stewardNameEn || 'Sohrab Farahmand'
    }`,
    cursorY + 90
  );

  // Table Header
  cursorY += 146;
  ctx.fillStyle = '#1C221E';
  ctx.fillRect(slipX + 28, cursorY, slipW - 56, 40);

  ctx.fillStyle = '#C8A96A';
  ctx.font = 'bold 14px Vazirmatn, sans-serif';
  if (isFa) {
    ctx.textAlign = 'right';
    ctx.fillText('ردیف و شرح کالا / خدمت', slipX + slipW - 44, cursorY + 20);
    ctx.textAlign = 'center';
    ctx.fillText('تعداد / واحد', slipX + 280, cursorY + 20);
    ctx.textAlign = 'left';
    ctx.fillText('مبلغ خالص فاکتور', slipX + 44, cursorY + 20);
  } else {
    ctx.textAlign = 'left';
    ctx.fillText('#  Item / Provision Description', slipX + 44, cursorY + 20);
    ctx.textAlign = 'center';
    ctx.fillText('Qty / Unit', slipX + slipW - 240, cursorY + 20);
    ctx.textAlign = 'right';
    ctx.fillText('Receipt Amount', slipX + slipW - 44, cursorY + 20);
  }

  // Table Rows
  cursorY += 40;
  input.items.forEach((item, idx) => {
    const rowY = cursorY + idx * lineHeight;
    ctx.fillStyle = idx % 2 === 0 ? '#F7F3EA' : '#EFE9DA';
    ctx.fillRect(slipX + 28, rowY, slipW - 56, lineHeight);

    ctx.strokeStyle = '#DDD4C0';
    ctx.beginPath();
    ctx.moveTo(slipX + 28, rowY + lineHeight);
    ctx.lineTo(slipX + slipW - 28, rowY + lineHeight);
    ctx.stroke();

    const formattedItemPrice = formatPrice(
      item.priceUsd,
      input.lang,
      '',
      '',
      input.currency
    ).amount;

    ctx.fillStyle = '#151816';
    ctx.font = '500 14px Vazirmatn, sans-serif';

    if (isFa) {
      ctx.textAlign = 'right';
      ctx.fillText(
        `${(idx + 1).toLocaleString('fa-IR')}. ${item.nameFa}`,
        slipX + slipW - 44,
        rowY + lineHeight / 2
      );
      ctx.fillStyle = '#5F5B52';
      ctx.textAlign = 'center';
      ctx.fillText(item.qtyLabelFa, slipX + 280, rowY + lineHeight / 2);
      ctx.fillStyle = '#151816';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(formattedItemPrice, slipX + 44, rowY + lineHeight / 2);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(
        `${idx + 1}. ${item.nameEn}`,
        slipX + 44,
        rowY + lineHeight / 2
      );
      ctx.fillStyle = '#5F5B52';
      ctx.textAlign = 'center';
      ctx.fillText(item.qtyLabelEn, slipX + slipW - 240, rowY + lineHeight / 2);
      ctx.fillStyle = '#151816';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(formattedItemPrice, slipX + slipW - 44, rowY + lineHeight / 2);
    }
  });

  // Totals Summary Box
  let summaryY = cursorY + input.items.length * lineHeight + 28;
  ctx.fillStyle = '#151816';
  ctx.fillRect(slipX + 28, summaryY, slipW - 56, 142);
  ctx.strokeStyle = '#C8A96A';
  ctx.lineWidth = 2;
  ctx.strokeRect(slipX + 28, summaryY, slipW - 56, 142);

  const passFmt = formatPrice(
    input.passThroughTotalUsd,
    input.lang,
    '',
    '',
    input.currency
  ).amount;
  const feeFmt = formatPrice(
    input.asaServiceFeeUsd,
    input.lang,
    '',
    '',
    input.currency
  ).amount;
  const grandFmt = formatPrice(
    input.passThroughTotalUsd + input.asaServiceFeeUsd,
    input.lang,
    '',
    '',
    input.currency
  ).amount;

  const drawSummaryRow = (
    label: string,
    val: string,
    yPos: number,
    highlight = false
  ) => {
    ctx.fillStyle = highlight ? '#C8A96A' : '#D8D2C5';
    ctx.font = highlight
      ? 'bold 17px Vazirmatn, sans-serif'
      : '500 14px Vazirmatn, sans-serif';
    ctx.textAlign = isFa ? 'right' : 'left';
    ctx.fillText(label, isFa ? slipX + slipW - 48 : slipX + 48, yPos);

    ctx.fillStyle = highlight ? '#C8A96A' : '#F5F2EB';
    ctx.font = highlight ? 'bold 19px monospace' : 'bold 15px monospace';
    ctx.textAlign = isFa ? 'left' : 'right';
    ctx.fillText(val, isFa ? slipX + 48 : slipX + slipW - 48, yPos);
  };

  drawSummaryRow(
    isFa
      ? 'جمع اقلام سوپرمارکتی (دقیقاً برابر فاکتور رسمی · ۰٪ سود):'
      : 'Pass-Through Store Goods Subtotal (Exact Receipt · 0% Markup):',
    passFmt,
    summaryY + 32
  );
  drawSummaryRow(
    isFa
      ? 'کارمزد خدمات همراهی، بسته‌بندی و اعزام آسا:'
      : 'ASA Stewardship, Dispatch & Family Update Fee:',
    feeFmt,
    summaryY + 64
  );

  ctx.strokeStyle = 'rgba(200,169,106,0.45)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(slipX + 48, summaryY + 86);
  ctx.lineTo(slipX + slipW - 48, summaryY + 86);
  ctx.stroke();

  drawSummaryRow(
    isFa ? 'مبلغ کل تسویه‌شده (فاکتور رسمی + خدمت):' : 'TOTAL VERIFIED SETTLEMENT:',
    grandFmt,
    summaryY + 114,
    true
  );

  // Official Emerald Stamp + Barcode Footer
  const footerY = summaryY + 168;

  // Emerald Circular Stamp on one side
  const stampX = isFa ? slipX + 125 : slipX + slipW - 125;
  const stampY = footerY + 54;
  ctx.save();
  ctx.translate(stampX, stampY);
  ctx.rotate(-0.12);
  ctx.strokeStyle = '#2E5A44';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 48, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = '#2E5A44';
  ctx.textAlign = 'center';
  ctx.font = 'bold 12px Vazirmatn, sans-serif';
  ctx.fillText('ASA AUDIT', 0, -14);
  ctx.font = 'bold 14px Vazirmatn, sans-serif';
  ctx.fillText('0% MARKUP', 0, 4);
  ctx.font = '10px Vazirmatn, sans-serif';
  ctx.fillText('TEHRAN VERIFIED', 0, 20);
  ctx.restore();

  // Receipt Verification Barcode on the opposite side
  const barStartX = isFa ? slipX + slipW - 260 : slipX + 48;
  ctx.fillStyle = '#151816';
  let bx = barStartX;
  for (let i = 0; i < 36; i++) {
    const bw = ((i * 7 + input.referenceCode.charCodeAt(i % input.referenceCode.length)) % 3) + 2;
    ctx.fillRect(bx, footerY + 20, bw, 46);
    bx += bw + ((i % 2) + 2);
  }
  ctx.fillStyle = '#5F5B52';
  ctx.font = '12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`${input.referenceCode}-THR-VERIFIED`, barStartX, footerY + 82);

  // Bottom Disclaimer
  ctx.fillStyle = '#5F5B52';
  ctx.font = '12px Vazirmatn, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    isFa
      ? 'تمامی مبالغ خرید منزل بر اساس فاکتور رسمی صندوق فروشگاه محاسبه شده است — سامانه خانواده آسا (تهران)'
      : 'All grocery prices match the exact printed Tehran store register receipt — ASA Family Stewardship',
    width / 2,
    height - 72
  );

  return canvas;
}

export function generateOfficialStoreReceiptDataUrl(
  input: OfficialStoreReceiptInput
): string {
  const canvas = renderOfficialStoreReceiptCanvas(input);
  return canvas.toDataURL('image/png');
}

export function downloadOfficialReceiptAsPng(
  input: OfficialStoreReceiptInput
): void {
  const dataUrl = generateOfficialStoreReceiptDataUrl(input);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${input.referenceCode}-Official-Store-Receipt.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Wraps a rendered high-resolution JPEG image of the Official Store Receipt into
 * a valid standalone binary PDF 1.4 document with zero external dependencies.
 */
export function downloadOfficialReceiptAsPdf(
  input: OfficialStoreReceiptInput
): void {
  const canvas = renderOfficialStoreReceiptCanvas(input);
  const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.94);
  const base64 = jpegDataUrl.split(',')[1] || '';
  const binaryStr = atob(base64);
  const jpegBytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    jpegBytes[i] = binaryStr.charCodeAt(i);
  }

  const pageWidthPt = 595;
  const pageHeightPt = Math.round((pageWidthPt * canvas.height) / canvas.width);

  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  let offset = 0;
  const offsets: number[] = [0]; // index 0 unused

  const pushText = (str: string) => {
    const bytes = encoder.encode(str);
    chunks.push(bytes);
    offset += bytes.length;
  };

  const pushBytes = (bytes: Uint8Array) => {
    chunks.push(bytes);
    offset += bytes.length;
  };

  pushText('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  // 1 0 obj: Catalog
  offsets.push(offset);
  pushText('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // 2 0 obj: Pages
  offsets.push(offset);
  pushText('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // 3 0 obj: Page
  offsets.push(offset);
  pushText(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidthPt} ${pageHeightPt}] /Resources << /XObject << /Im1 5 0 R >> >> /Contents 4 0 R >>\nendobj\n`
  );

  // 4 0 obj: Content stream drawing Image
  const streamCmd = `q\n${pageWidthPt} 0 0 ${pageHeightPt} 0 0 cm\n/Im1 Do\nQ\n`;
  offsets.push(offset);
  pushText(
    `4 0 obj\n<< /Length ${streamCmd.length} >>\nstream\n${streamCmd}endstream\nendobj\n`
  );

  // 5 0 obj: Embedded JPEG XObject
  offsets.push(offset);
  pushText(
    `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  pushBytes(jpegBytes);
  pushText('\nendstream\nendobj\n');

  const xrefStart = offset;
  let xref = `xref\n0 ${offsets.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  pushText(xref);

  const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
  const pdfBuffer = new Uint8Array(totalLen);
  let pos = 0;
  for (const c of chunks) {
    pdfBuffer.set(c, pos);
    pos += c.length;
  }

  const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${input.referenceCode}-Official-Store-Receipt.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

