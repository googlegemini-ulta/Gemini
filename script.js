let transactions = [
  { id: 'TXN_001', partner: 'Partner Alpha', type: 'Credit', amount: 1500.00, description: 'Service Payment', date: new Date().toLocaleDateString() },
  { id: 'TXN_002', partner: 'Partner Alpha', type: 'Due', amount: 300.00, description: 'Pending Invoice #12', date: new Date().toLocaleDateString() },
  { id: 'TXN_003', partner: 'Partner Beta', type: 'Debit', amount: 850.50, description: 'Cloud Infra Expense', date: new Date().toLocaleDateString() }
];

window.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
});

function renderDashboard() {
  const selectedPartner = document.getElementById('partner-filter').value;
  const tbody = document.getElementById('transaction-table-body');

  const filtered = selectedPartner === 'All' 
    ? transactions 
    : transactions.filter(t => t.partner === selectedPartner);

  let totalCredit = 0;
  let totalDebit = 0;
  let totalDue = 0;

  filtered.forEach(t => {
    if (t.type === 'Credit') totalCredit += t.amount;
    if (t.type === 'Debit') totalDebit += t.amount;
    if (t.type === 'Due') totalDue += t.amount;
  });

  document.getElementById('total-credit').innerText = `$${totalCredit.toFixed(2)}`;
  document.getElementById('total-debit').innerText = `$${totalDebit.toFixed(2)}`;
  document.getElementById('total-due').innerText = `$${totalDue.toFixed(2)}`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-500 font-sans">No records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(t => `
    <tr class="hover:bg-slate-800/30">
      <td class="py-3 px-4 font-bold text-indigo-400">${t.id}</td>
      <td class="py-3 px-4 font-sans text-xs font-semibold">${t.partner}</td>
      <td class="py-3 px-4 text-xs">
        <span class="px-2 py-0.5 rounded-full font-semibold ${
          t.type === 'Credit' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
          t.type === 'Debit' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
        }">${t.type}</span>
      </td>
      <td class="py-3 px-4 font-bold">$${t.amount.toFixed(2)}</td>
      <td class="py-3 px-4 font-sans text-xs text-slate-400">${t.description}</td>
      <td class="py-3 px-4 text-xs text-slate-500">${t.date}</td>
    </tr>
  `).join('');
}

function addTransaction(e) {
  e.preventDefault();
  const partner = document.getElementById('form-partner').value;
  const type = document.getElementById('form-type').value;
  const amount = parseFloat(document.getElementById('form-amount').value);
  const description = document.getElementById('form-desc').value;

  const newTxn = {
    id: `TXN_${Math.floor(100 + Math.random() * 900)}`,
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
