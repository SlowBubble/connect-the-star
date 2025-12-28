// Get URL parameters or use defaults
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        vertices: parseInt(params.get('vertices')) || 5,
        jump: parseInt(params.get('jump')) || 2,
        solution: params.get('solution') === 'true'
    };
}

// Initialize with URL parameters
function init() {
    const params = getUrlParams();
    document.getElementById('vertices').value = params.vertices;
    document.getElementById('jump').value = params.jump;
    document.getElementById('solution').checked = params.solution;
    updatePattern();
}

// Generate the connection sequence
function generateConnectionSequence(vertices, jump) {
    const cycles = [];
    const globalVisited = new Set();
    
    // Find all cycles
    for (let start = 0; start < vertices; start++) {
        if (globalVisited.has(start)) continue;
        
        // Start a new cycle
        const cycle = [];
        const cycleVisited = new Set();
        let current = start;
        
        while (!cycleVisited.has(current)) {
            cycleVisited.add(current);
            globalVisited.add(current);
            cycle.push(current);
            current = (current + jump) % vertices;
        }
        
        // Complete the cycle by adding the starting point
        cycle.push(start);
        cycles.push(cycle);
    }
    
    return cycles;
}

// Draw dots around a circle
function drawDots(ctx, centerX, centerY, radius, vertices) {
    const dots = [];
    
    for (let i = 0; i < vertices; i++) {
        const angle = (2 * Math.PI * i) / vertices - Math.PI / 2; // Start from top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw label outside the circle
        const labelDistance = 25; // Distance from center of dot to label
        const labelX = centerX + (radius + labelDistance) * Math.cos(angle);
        const labelY = centerY + (radius + labelDistance) * Math.sin(angle);
        
        ctx.fillStyle = '#000';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i.toString(), labelX, labelY);
        
        dots.push({ x, y, index: i });
    }
    
    return dots;
}

// Draw connection lines
function drawConnections(ctx, dots, sequence) {
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;
    
    for (let i = 0; i < sequence.length - 1; i++) {
        const from = dots[sequence[i]];
        const to = dots[sequence[i + 1]];
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        
        // Draw arrow
        drawArrow(ctx, from.x, from.y, to.x, to.y);
    }
}

// Draw arrow at the end of a line
function drawArrow(ctx, fromX, fromY, toX, toY) {
    const headLength = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
}

// Update the pattern based on current inputs
function updatePattern() {
    const vertices = parseInt(document.getElementById('vertices').value);
    const jump = parseInt(document.getElementById('jump').value);
    const showSolution = document.getElementById('solution').checked;
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate circle parameters (3 inches radius = 216 pixels at 72 DPI)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 216; // 3 inches in pixels
    
    // Draw dots
    const dots = drawDots(ctx, centerX, centerY, radius, vertices);
    
    // Generate connection sequence
    const cycles = generateConnectionSequence(vertices, jump);
    
    // Update instruction text - show each cycle on a separate line
    const instructionText = cycles.map(cycle => cycle.join(' → ')).join('\n');
    document.getElementById('instruction').textContent = instructionText;
    
    // Draw connections if solution is enabled
    if (showSolution) {
        cycles.forEach(cycle => {
            drawConnections(ctx, dots, cycle);
        });
    }
    
    // Update URL parameters
    const url = new URL(window.location);
    url.searchParams.set('vertices', vertices);
    url.searchParams.set('jump', jump);
    url.searchParams.set('solution', showSolution);
    window.history.replaceState({}, '', url);
}

// Initialize when page loads
window.addEventListener('load', init);