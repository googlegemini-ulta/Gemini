// ==========================================
// SOVEREIGN ENTERPRISE LEDGER ENGINE
// ==========================================

let transactions = JSON.parse(localStorage.getItem('partner_ledger_transactions')) || [
  {
    id: 'TXN_1001',
    partner: 'Minister hi tech park (DEAL002905)',
    type: 'Bill',
    amount: 500000.00,
    description: 'Initial Invoice / Bill',
    date: '2026-10-01'
  },
  {
    id: 'TXN_1002',
    partner: 'Minister hi tech park (DEAL002905)',
    type: 'Credit',
    amount: 200000.00,
    description: 'Payment Received',
    date: '2026-10-05'
  },
  {
    id: 'TXN_1003',
    partner: 'BUTTERFLY MARKETING LIMITED (3000002272)',
    type: 'Bill',
    amount: 1200000.00,
    description: 'Batch Purchase Order',
    date: '2026-10-02'
  },
  {
    id: 'TXN_1004',
    partner: 'BUTTERFLY MARKETING LIMITED (3000002272)',
    type: 'Credit',
    amount: 1000000.00,
    description: 'Cheque Payment',
    date: '2026-10-08'
  }
];

window.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  renderDashboard();

  const partnerFilter = document.getElementById('partner-filter');
  const searchQuery = document.getElementById('search-query');
  const transactionForm = document.getElementById('transaction-form');

  if (partnerFilter) partnerFilter.addEventListener('change', renderDashboard);
  if (searchQuery) searchQuery.addEventListener('input', renderDashboard);
  if (transactionForm) transactionForm.addEventListener('submit', addTransaction);
});

function saveToLocalStorage() {
  localStorage.setItem('partner_ledger_transactions', JSON.stringify(transactions));
}

function renderDashboard() {
  const partnerFilterEl = document.getElementById('partner-filter');
  const searchQueryEl = document.getElementById('search-query');
  const tbody = document.getElementById('transaction-table-body');

  if (!tbody) return;

  const selectedPartner = partnerFilterEl ? partnerFilterEl.value : 'All';
  const searchQuery = searchQueryEl ? searchQueryEl.value.toLowerCase() : '';

  let filtered = transactions.filter(t => {
    const matchesPartner = selectedPartner === 'All' || t.partner === selectedPartner;
    const matchesSearch = t.description.toLowerCase().includes(searchQuery) || t.id.toLowerCase().includes(searchQuery);
    return matchesPartner && matchesSearch;
  });

  let totalSales = 0;
  let totalCredit = 0;
  let totalDebit = 0;

  filtered.forEach(t => {
    if (t.type === 'Bill') totalSales += t.amount;
    else if (t.type === 'Credit') totalCredit += t.amount;
    else if (t.type === 'Debit') totalDebit += t.amount;
  });

  let totalDue = totalSales - totalCredit + totalDebit;

  updateElementText('total-sales', `৳${totalSales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
  updateElementText('total-credit', `৳${totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
  updateElementText('total-debit', `৳${totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
  updateElementText('total-due', `৳${totalDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-500 font-sans">No ledger entries found.</td></tr>`;
    return;
  }

  let sortedChronological = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningDue = 0;
  let balanceMap = {};
  
  sortedChronological.forEach(t => {
    if (t.type === 'Bill') runningDue += t.amount;
    else if (t.type === 'Credit') runningDue -= t.amount;
    else if (t.type === 'Debit') runningDue += t.amount;
    balanceMap[t.id] = runningDue;
  });

  let displayList = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

  tbody.innerHTML = displayList.map((t) => {
    const currentRunningDue = balanceMap[t.id];
    const badgeClass = 
      t.type === 'Bill' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
      t.type === 'Credit' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
      'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';

    return `
      <tr class="hover:bg-slate-800/30 transition-colors border-b border-slate-800/50">
        <td class="py-3 px-4 font-bold text-indigo-400">${t.id}</td>
        <td class="py-3 px-4 font-sans text-xs font-semibold text-slate-300">${t.partner}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full font-semibold text-xs ${badgeClass}">${t.type}</span>
        </td>
        <td class="py-3 px-4 font-bold text-slate-200">৳${t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        <td class="py-3 px-4 font-bold text-rose-400">৳${currentRunningDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        <td class="py-3 px-4 font-sans text-slate-400">${t.description}</td>
        <td class="py-3 px-4 text-slate-500 text-xs">${t.date}</td>
        <td class="py-3 px-4 text-right">
          <button onclick="deleteTransaction('${t.id}')" class="text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 font-sans text-xs transition-all">Delete</button>
        </td>
      </tr>
    `;
  }).join('');

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function updateElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

function addTransaction(e) {
  e.preventDefault();
  const partner = document.getElementById('form-partner').value;
  const type = document.getElementById('form-type').value;
  const amount = parseFloat(document.getElementById('form-amount').value);
  const description = document.getElementById('form-desc').value;

  if (!partner || !type || isNaN(amount) || amount <= 0) {
    alert('Please fill in all required fields correctly.');
    return;
  }

  const newTxn = {
    id: `TXN_${Math.floor(1000 + Math.random() * 9000)}`,
    partner,
    type,
    amount,
    description: description || 'General Transaction',
    date: new Date().toISOString().split('T')[0]
  };

  transactions.unshift(newTxn);
  saveToLocalStorage();
  document.getElementById('transaction-form').reset();
  renderDashboard();
}

function deleteTransaction(id) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    transactions = transactions.filter(t => t.id !== id);
    saveToLocalStorage();
    renderDashboard();
  }
}
