// DOM ELEMENTS
const form = document.querySelector('form');
const FoodInput = document.getElementById('Food-Item');
const FoodType = document.getElementById('Food-Type');
const CaloriesInput = document.getElementById('Calories-Input');
const ProgressBar = document.querySelector('.bg-emerald-500.h-2.rounded-full');
const ItemList = document.getElementById('itemList');
const ResetButton = document.getElementById('reset-btn');


const TotalDisplay = document.querySelector('.text-3xl.font-black.text-emerald-500');

// STATE
const DAILY_GOAL = 3000;
let history = JSON.parse(localStorage.getItem('calorieHistory')) || [];

// 
updateUI();

// EVENT LISTENERS
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const food = FoodInput.value.trim();
    const type = FoodType.value;
    const calories = parseInt(CaloriesInput.value);

    
    if (!food || !type || isNaN(calories)) {
        alert("Please fill in all fields correctly!");
        return;
    }

    // Add to history
    const entry = { food, type, calories };
    history.push(entry);
    
    // Save 
    localStorage.setItem('calorieHistory', JSON.stringify(history));
    updateUI();
    form.reset();
});

ResetButton.addEventListener('click', () => {
    if(confirm("Are you sure you want to clear all data?")) {
        history = [];
        localStorage.removeItem('calorieHistory');
        updateUI();
    }
});

function updateUI() {
    //  Clear current list
    ItemList.innerHTML = '';
    let total = 0;

    //  List Items
    history.forEach((item, index) => {
        total += item.calories;
        const li = document.createElement('li');
        li.className = "flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-emerald-500 mt-3";
        li.innerHTML = `
            <div>
                <p class="font-bold text-gray-800 dark:text-white">${item.food}</p>
                <p class="text-xs text-gray-500 uppercase">${item.type}</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-black text-emerald-500">${item.calories} kcal</span>
                <button onclick="deleteEntry(${index})" class="text-red-400 hover:text-red-600">✕</button>
            </div>
        `;
        ItemList.appendChild(li);
    });

    // 3. Update Total Number
    TotalDisplay.textContent = total.toLocaleString();

    //  Update Progress Bar
    const percentage = Math.min((total / DAILY_GOAL) * 100, 100);
    ProgressBar.style.width = `${percentage}%`;
}

// Global Delete Function
window.deleteEntry = (index) => {
    history.splice(index, 1);
    localStorage.setItem('calorieHistory', JSON.stringify(history));
    updateUI();
};