const challengeData = [
  { title: "Two Sum Problem", difficulty: "easy", category: "algorithms", points: 50 },
  { title: "Build a REST API", difficulty: "medium", category: "backend", points: 150 },
  { title: "Implement Binary Search Tree", difficulty: "hard", category: "data structures", points: 300 },
  { title: "CSS Grid Layout", difficulty: "easy", category: "frontend", points: 75 },
  { title: "React Lifecycle", difficulty: "medium", category: "frontend", points: 125 },
  { title: "Dynamic Programming: Knapsack", difficulty: "hard", category: "algorithms", points: 350 }
];

const grid = document.getElementById('challenges-grid');
let activeFilters = { difficulty: 'all', category: 'all' };

function render() {
  grid.innerHTML = challengeData
    .filter(item => {
      const dMatch = activeFilters.difficulty === 'all' || item.difficulty === activeFilters.difficulty;
      const cMatch = activeFilters.category === 'all' || item.category === activeFilters.category;
      return dMatch && cMatch;
    })
    .map(item => `
      <div class="challenge-card">
        <div class="card-header">
           <span class="difficulty-tag ${item.difficulty}">${item.difficulty}</span>
           <span class="points">⚡ ${item.points} pts</span>
        </div>
        <h3>${item.title}</h3>
        <p>Short description of the task goes here...</p>
        <div class="card-footer">
          <span class="cat-label">${item.category}</span>
          <button class="view-btn">View Challenge</button>
        </div>
      </div>
    `).join('');
}

// Event Listeners for buttons
document.querySelectorAll('.filter-btns button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const parent = e.target.parentElement;
    const type = parent.dataset.type;
    
    parent.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    
    activeFilters[type] = e.target.dataset.value;
    render();
  });
});

render(); // Initial Load