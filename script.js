// Initial Dummy Transactions for Both Partners
let transactions = [
  {
    id: 'TXN_1001',
    partner: 'Minister hi tech park (DEAL002905)',
    type: 'Bill',
    amount: 50000.00,
    description: 'Invoice #INV-2026-01',
    date: new Date(Date.now() - 86400000 * 3).toLocaleDateString()
  },
  {
    id: 'TXN_1002',
    partner: 'Minister hi tech park (DEAL002905)',
    type: 'Credit',
    amount: 20000.00,
    description: 'Bank Payment Received',
    date: new Date(Date.now() - 86400000 * 2).toLocaleDateString()
  },
  {
    id: 'TXN_1003',
    partner: 'BUTTERFLY MARKETING LIMITED (3000002272)',
    type: 'Bill',
    amount: 120000.00,
    description: 'Batch Purchase Order #PO-99',
    date: new Date(Date.now() - 86400000 * 5).toLocaleDateString()
  },
  {
    id: 'TXN_1004',
    partner: 'BUTTERFLY MARKETING LIMITED (3000002272)',
    type: 'Credit',
    amount: 100000.00,
    description: 'Cheque Clearance',
    date: new Date(Date.now() - 86400000 * 1).toLocaleDateString()
  }
];

window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderDashboard();
});

function renderDashboard() {
  const selectedPartner = document.getElementById('partner-filter').value;
  const searchQuery = document.getElementById('search-query').value.toLowerCase();
  const tbody = document.getElementById('transaction-table-body');

  // Filter transactions
  let filtered = transactions.filter(t => {
    const matchesPartner = selectedPartner === 'All' || t.partner === selectedPartner;
    const matchesSearch = t.description.toLowerCase().includes(searchQuery) || t.id.toLowerCase().includes(searchQuery);
    return matchesPartner && matchesSearch;
  });

  // Calculate Metrics
  let totalSales = 0;
  let totalCredit = 0;
  let totalDebit = 0;

  filtered.forEach(t => {
    if (t.type === 'Bill') totalSales += t.amount;
    if (t.type === 'Credit') totalCredit += t.amount;
    if (t.type === 'Debit') totalDebit += t.amount;
  });

  let totalDue = totalSales - totalCredit + totalDebit;

  document.getElementById('total-sales').innerText = `৳${totalSales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  document.getElementById('total-credit').innerText = `৳${totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  document.getElementById('total-debit').innerText = `৳${totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  document.getElementById('total-due').innerText = `৳${totalDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-500 font-sans">No ledger entries found.</td></tr>`;
    return;
  }

  // Calculate Running Balance per item for presentation
  let runningDue = 0;
  
  // Sort chronically for accurate ledger calculation
  let ledgerSorted = [...filtered].reverse();

  tbody.innerHTML = ledgerSorted.map((t) => {
    if (t.type === 'Bill') runningDue += t.amount;
    else if (t.type === 'Credit') runningDue -= t.amount;
    else if (t.type === 'Debit') runningDue += t.amount;

    return `
      <tr class="hover:bg-slate-800/30 transition-colors">
        <td class="py-3 px-4 font-bold text-indigo-400">${t.id}</td>
        <td class="py-3 px-4 font-sans text-xs font-semibold text-slate-300">${t.partner}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full font-semibold ${
            t.type === 'Bill' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
            t.type === 'Credit' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
            'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
          }">${t.type}</span>
        </td>
        <td class="py-3 px-4 font-bold">৳${t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        <td class="py-3 px-4 font-bold text-rose-400">৳${runningDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        <td class="py-3 px-4 font-sans text-slate-400">${t.description}</td>
        <td class="py-3 px-4 text-slate-500">${t.date}</td>
        <td class="py-3 px-4 text-right">
          <button onclick="deleteTransaction('${t.id}')" class="text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 font-sans transition-all">Delete</button>
        </td>
      </tr>
    `;
  }).reverse().join('');

  lucide.createIcons();
}

function addTransaction(e) {
  e.preventDefault();
  const partner = document.getElementById('form-partner').value;
  const type = document.getElementById('form-type').value;
  const amount = parseFloat(document.getElementById('form-amount').value);
  const description = document.getElementById('form-desc').value;

  const newTxn = {
    id: `TXN_${Math.floor(1000 + Math.random() * 9000)}`,
    partner,
    type,
    amount,
    description,
    date: new Date().toLocaleDateString()
  };

  transactions.unshift(newTxn);
  document.getElementById('transaction-form').reset();
  renderDashboard();
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  renderDashboard();
}
