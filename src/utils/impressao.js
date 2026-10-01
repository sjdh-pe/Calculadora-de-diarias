export function imprimirResumo() {
  const printRoot = document.getElementById('printRoot');
  const titulo = 'Cálculo de Diárias';
  const resumoHtml = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; padding: 8mm;">
      <div style="border: 1px solid #d8e0ea; border-radius: 14px; padding: 18px;">
        <div style="margin: 0 0 14px; font-size: 22px; font-weight: 800; color: #17324d;">${titulo}</div>
        ${document.getElementById('printArea').innerHTML}
      </div>
    </div>
  `;
  printRoot.innerHTML = resumoHtml;

  const printWindow = window.open('', '_blank', 'width=900,height=700');
  const style = `
    <style>
      @page { size: A4 portrait; margin: 10mm; }
      body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1f2937; }
      h2 { margin: 0 0 12px; font-size: 20px; color: #17324d; }
      .print-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
      .print-item { border: 1px solid #d8e0ea; border-radius: 10px; padding: 10px; background: #fff; break-inside: avoid; }
      .print-item .label { font-size: 11px; color: #667085; margin-bottom: 4px; }
      .print-item .value { font-size: 14px; font-weight: 700; color: #17324d; line-height: 1.35; }
      .footer-note { margin-top: 12px; font-size: 11px; color: #667085; line-height: 1.45; }
    </style>
  `;
  printWindow.document.open();
  printWindow.document.write(`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>${titulo}</title>${style}</head><body>${resumoHtml}</body></html>`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 250);
}