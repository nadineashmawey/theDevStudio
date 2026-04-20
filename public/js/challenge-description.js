const challenges = [
    {
        id: 1,
        title: 'Two Sum Problem',
        difficulty: 'Easy',
        points: 50,
        category: 'Algorithms',
        timeLimit: '45 minutes',
        summary: 'Given an array of integers, return indices of two numbers that add up to a target.',
        description: `Given an array of integers <span class="highlight-green">nums</span> 
        and an integer <span class="highlight-yellow">target</span>, return indices of the two numbers such that they add up to target.`,
        details: [
            'Each input has exactly one solution.',
            'Do not use the same element twice.',
            'Order does not matter.'
        ],
        examples: [
            { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 9' },
            { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] = 6' }
        ],
        defaultCode: `function twoSum(nums, target) {\n    // write your solution here\n}`,
        stats: { totalSubmissions: 12453, accepted: 6891, successRate: '55.3%' }
    },                             
    {
        id: 2,
        title: 'Build a REST API',
        difficulty: 'Medium',
        points: 150,
        category: 'Backend',
        timeLimit: '90 minutes',
        summary: 'Create a RESTful API with CRUD operations using Node.js and Express.',
        description: `Build a <span class="highlight-green">RESTful API</span> that supports 
        <span class="highlight-yellow">CRUD operations</span> using Node.js and Express.`,
        details: [
            'Implement GET, POST, PUT, DELETE routes.',
            'Use proper HTTP status codes.',
            'Validate request data.'
        ],
        examples: [
            { input: 'GET /users', output: '[{id:1, name:"John"}]', explanation: 'Returns all users' },
            { input: 'POST /users', output: '{id:2, name:"Jane"}', explanation: 'Creates a new user' }
        ],
        defaultCode: `const express = require('express');\nconst app = express();\n\n// write your solution here`,
        stats: { totalSubmissions: 8320, accepted: 3900, successRate: '46.8%' }
    },                                 
    {
        id: 3,
        title: 'Implement Binary Search Tree',
        difficulty: 'Hard',
        points: 300,
        category: 'Data Structures',
        timeLimit: '120 minutes',
        summary: 'Implement a binary search tree with insert, delete, and search operations.',
        description: `Implement a <span class="highlight-green">Binary Search Tree</span> class 
        with <span class="highlight-yellow">insert</span>, delete, and search methods.`,
        details: [
            'Implement insert, delete, and search methods.',
            'Handle edge cases like empty tree.',
            'Maintain BST properties after every operation.'
        ],
        examples: [
            { input: 'insert(5), insert(3), insert(7)', output: 'Tree with root 5', explanation: '3 goes left, 7 goes right' },
            { input: 'search(3)', output: 'true', explanation: '3 exists in the tree' }
        ],
        defaultCode: `class BST {\n    constructor() {\n        this.root = null;\n    }\n    // write your solution here\n}`,
        stats: { totalSubmissions: 5100, accepted: 1800, successRate: '35.2%' }
    }                                 
];

function renderChallenge(id) {

   
    let challenge = challenges.find(c => c.id === id);

    if (!challenge) {
        console.log("challenge not found");
        return;
    }

  
    const diffClass = {
        Easy: 'badge-easy',
        Medium: 'badge-medium',
        Hard: 'badge-hard'
    };

    
    document.getElementById('challenge-title').textContent = challenge.title;
    document.getElementById('challenge-summary').textContent = challenge.summary;
    document.getElementById('header-points').textContent = challenge.points + " points";

   
    let diff = document.getElementById('badge-difficulty');
    diff.textContent = challenge.difficulty;
    diff.className = "badge " + diffClass[challenge.difficulty];

  
    document.getElementById('badge-category').textContent = challenge.category;

  
    document.getElementById('challenge-description').innerHTML = challenge.description;

   
    let detailsHTML = "";
    challenge.details.forEach(d => {
        detailsHTML += `<p>${d}</p>`;
    });
    document.getElementById('challenge-details').innerHTML = detailsHTML;


    let examplesHTML = "";

   challenge.examples.forEach((ex, index) => {
    examplesHTML += `
    <div class="example-block">
        <p class="example-number">Example ${index + 1}</p>
        <p class="input-line"><span class="ex-label-input">Input:</span> ${ex.input}</p>
        <p class="output-line"><span class="ex-label-output">Output:</span> ${ex.output}</p>
        ${ex.explanation ? `<p class="explanation-line"><span class="ex-label-explanation">Explanation:</span> ${ex.explanation}</p>` : ""}
    </div>
    `;
});

    document.getElementById('challenge-examples').innerHTML = examplesHTML;

 
    document.getElementById('code-editor').value = challenge.defaultCode;

    document.getElementById('info-points').textContent = challenge.points + " Points";
    document.getElementById('info-difficulty').textContent = challenge.difficulty;
    document.getElementById('info-time').textContent = challenge.timeLimit;

  
    document.getElementById('total-submissions').textContent =
        challenge.stats.totalSubmissions.toLocaleString();

    document.getElementById('accepted').textContent =
        challenge.stats.accepted.toLocaleString();

    document.getElementById('success-rate').textContent =
        challenge.stats.successRate;
}



const params = new URLSearchParams(window.location.search);
const challengeId = parseInt(params.get('id')) || 1;


renderChallenge(challengeId);