                        theme === 'dark' ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <button
                    onClick={() => setSelectedMethod('card')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      selectedMethod === 'card'
                        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                        : 'border-slate-700/60 hover:border-slate-600 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-medium">Credit Card</span>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('mfs')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      selectedMethod === 'mfs'
                        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                        : 'border-slate-700/60 hover:border-slate-600 text-slate-400'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-medium">Mobile Wallet</span>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('paypal')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      selectedMethod === 'paypal'
                        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                        : 'border-slate-700/60 hover:border-slate-600 text-slate-400'
                    }`}
                  >
                    <Wallet className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-medium">PayPal</span>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('crypto')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      selectedMethod === 'crypto'
                        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                        : 'border-slate-700/60 hover:border-slate-600 text-slate-400'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-medium">Crypto</span>
                  </button>
                </div>

                {/* DYNAMIC PAYMENT METHOD FORM BODY */}
                <div className={`p-4 rounded-xl border mb-6 transition-all ${
                  theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  {selectedMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">Expires (MM/YY)</label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                            className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">CVV / CVC</label>
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'mfs' && (
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        {['bkash', 'nagad', 'rocket'].map((prov) => (
                          <button
                            key={prov}
                            onClick={() => setMfsProvider(prov)}
                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold uppercase transition-all border ${
                              mfsProvider === prov
                                ? 'bg-pink-600/20 border-pink-500 text-pink-400'
                                : 'border-slate-700 text-slate-400'
                            }`}
                          >
                            {prov}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Wallet Number</label>
                        <input
                          type="text"
                          value={mfsNumber}
                          onChange={(e) => setMfsNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'paypal' && (
                    <div className="text-center py-4 space-y-2">
                      <Wallet className="w-8 h-8 text-indigo-400 mx-auto" />
                      <p className="text-sm font-medium">You will be redirected to PayPal sandbox to authorize ${checkoutAmount}.</p>
                    </div>
                  )}

                  {selectedMethod === 'crypto' && (
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        {['USDT', 'BTC', 'ETH'].map((coin) => (
                          <button
                            key={coin}
                            onClick={() => setCryptoCoin(coin)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border ${
                              cryptoCoin === coin
                                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                                : 'border-slate-700 text-slate-400'
                            }`}
                          >
                            {coin}
                          </button>
                        ))}
                      </div>
                      <div className="text-xs text-slate-400 text-center font-mono py-2 bg-slate-900 rounded-lg border border-slate-800">
                        Network: TRC20 / ERC20 (Sandbox Simulator)
                      </div>
                    </div>
                  )}
                </div>

                {/* Simulator Options: Trigger Success / Failure */}
                <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-medium text-slate-300">Simulate Payment Decline / Error</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={simulateFailure}
                    onChange={(e) => setSimulateFailure(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700 focus:ring-indigo-500"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay ${checkoutAmount} Securely</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Live Payment Visualizer Status */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`p-6 rounded-2xl border sticky top-24 transition-all ${
                theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
              }`}>
                <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <span>Real-Time Gateway Status</span>
                </h3>

                {paymentStep === 'idle' && (
                  <div className="text-center py-12 text-slate-500 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                      <Clock className="w-6 h-6" />
                    </div>
                    <p className="text-sm">Submit payment on the left to trigger secure sandbox webhook transmission.</p>
                  </div>
                )}

                {(paymentStep === 'initiating' || paymentStep === 'verifying') && (
                  <div className="text-center py-12 space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-indigo-400 font-bold">
                        API
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {paymentStep === 'initiating' ? 'Encrypting & Dispatching Payload...' : 'Verifying HMAC Signature & Gateway...'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-mono">POST /v1/charges</p>
                    </div>
                  </div>
                )}

                {paymentStep === 'completed' && currentTxnResult && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                      <h4 className="font-bold text-emerald-400 text-base">Payment Successful!</h4>
                      <p className="text-xs text-slate-400 font-mono">{currentTxnResult.id}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Amount:</span>
                        <span className="text-emerald-400 font-bold">${currentTxnResult.amount} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Method:</span>
                        <span>{currentTxnResult.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Customer:</span>
                        <span>{currentTxnResult.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Timestamp:</span>
                        <span className="text-slate-400">{new Date(currentTxnResult.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentStep === 'failed' && currentTxnResult && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center space-y-2">
                      <XCircle className="w-10 h-10 text-rose-400 mx-auto" />
                      <h4 className="font-bold text-rose-400 text-base">Payment Declined</h4>
                      <p className="text-xs text-rose-300 font-medium">{currentTxnResult.failureReason}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Error Code:</span>
                        <span className="text-rose-400">card_declined</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Attempted ID:</span>
                        <span>{currentTxnResult.id}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TRANSACTIONS MANAGEMENT & REFUNDS */}
        {activeTab === 'transactions' && (
          <div className={`p-6 rounded-2xl border transition-all ${
            theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Transaction History</h2>
                <p className="text-xs text-slate-400 mt-0.5">Real-time log of gateway charges and refund actions.</p>
              </div>

              {/* Search & Status Filters */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search ID or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="All">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b text-xs font-semibold uppercase tracking-wider ${
                    theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                  }`}>
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm font-mono">
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-indigo-400">{t.id}</td>
                      <td className="py-3.5 px-4 font-sans">
                        <div className="font-semibold text-xs">{t.customer}</div>
                        <div className="text-slate-500 text-xs">{t.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {t.method}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold">${t.amount.toFixed(2)}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          t.status === 'Success' ? 'bg-emerald-500/10 tex
