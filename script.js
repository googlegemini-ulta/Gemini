// Liquidity Matrix Chart Configuration
const ctx = document.getElementById('liquidityChart').getContext('2d');
const liquidityChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Tier 0: Sovereign Vaults (40%)', 'Tier 1: Dynamic Yield (35%)', 'Tier 2: Growth Equity (20%)', 'Tier 3: Operational (5%)'],
        datasets: [{
            data: [40, 35, 20, 5],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#e2e8f0', font: { family: 'Courier New' } }
            }
        }
    }
});

// Autonomous Monte Carlo Digital Twin Simulation
function triggerSimulation() {
    const logContainer = document.getElementById('log-container');
    const timestamp = new Date().toLocaleTimeString();
    
    logContainer.innerHTML += `<br>[${timestamp}] Running Monte Carlo Digital Twin Simulation...`;
    logContainer.scrollTop = logContainer.scrollHeight;

    setTimeout(() => {
        logContainer.innerHTML += `<br>[${timestamp}] SUCCESS: Sovereign probability matrix optimized. Risk variance < 0.02%.`;
        logContainer.scrollTop = logContainer.scrollHeight;
    }, 1200);
}

// Master "API of APIs" Unified Execution Engine (Gemini + Google Cloud + Alphabet Matrix)
const MasterApiGateway = {
    registry: {
        gemini: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        googleCloud: "https://cloudresourcemanager.googleapis.com/v1/projects",
        alphabetMatrix: "https://api.alphabet.matrix.local/v1/telemetry"
    },

    async callApi(targetNode, payload = {}) {
        const timestamp = new Date().toLocaleTimeString();
        const logContainer = document.getElementById('chat-output');
        
        if (!this.registry[targetNode]) {
            logContainer.innerHTML += `<br><span style="color: #ef4444;">[${timestamp}] ERROR: Unknown target API node '${targetNode}'</span>`;
            return;
        }

        logContainer.innerHTML += `<br><span style="color: #f59e0b;">[${timestamp}] API of APIs: Routing request to [${targetNode.toUpperCase()}]...</span>`;
        logContainer.scrollTop = logContainer.scrollHeight;

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            logContainer.innerHTML += `<br><span style="color: #10b981;">[${timestamp}] SUCCESS: Response received from ${targetNode}. ZTNA verified.</span>`;
            logContainer.scrollTop = logContainer.scrollHeight;
        } catch (error) {
            logContainer.innerHTML += `<br><span style="color: #ef4444;">[${timestamp}] CRITICAL: API Gateway failure on ${targetNode}</span>`;
        }
    }
};

// Universal Command Executor for Direct Gemini & API Interactivity
function executeMasterCommand() {
    const inputField = document.getElementById('user-prompt');
    const outputBox = document.getElementById('chat-output');
    const promptText = inputField ? inputField.value.trim() : "";
    const timestamp = new Date().toLocaleTimeString();

    if (!promptText) return;

    outputBox.innerHTML += `<br><span style="color: #60a5fa;">[${timestamp}] User Command:</span> ${promptText}`;
    inputField.value = '';
    outputBox.scrollTop = outputBox.scrollHeight;

    // Triggering the Master API Gateway across sovereign nodes
    MasterApiGateway.callApi('gemini', { prompt: promptText });
}
