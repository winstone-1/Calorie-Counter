// DOM ELEMENTS
const form = document.querySelector('form');
const FoodInput = document.getElementById('Food-Item');
const FoodType = document.getElementById('Food-Type');
const CaloriesInput = document.getElementById('Calories-Input');
const SaveButton = document.querySelector('button[type="submit"]');
const ProgressBar = document.querySelector('.bg-emerald-500.h-2.rounded-full');
const ItemList = document.getElementById('itemList');


let totalCalories = 0;
const DAILY_GOAL = 3000;
// EVENT LISTENER
form.addEventListener('submit', function(e) {
    e.preventDefault();
    e();
});

function e() {
    // Get input values
    const food = FoodInput.value.trim();
    const foodType = FoodType.value;
    const calories = parseInt(CaloriesInput.value.trim());
    // Check inputs
    if (!food || !type || isNaN(calories)) {
        alert("Please fill out all fields with valid information.");
        return;
    } 
}
    
        // Update the total count
        totalCalories += CaloriesInput;
        TotalDisplay.textContent = totalCalories.toLocaleString();

        // Step B: Create and add the new list item
        const li = document.createElement('li');
        li.className = "flex justify-between p-2 border-b dark:border-gray-700 text-sm";
        li.innerHTML = `<span>${food} (${type})</span> <span class="font-bold">${calories} kcal</span>`;
        ItemList.appendChild(li);

        //  Calculate daily
        const percent = Math.min((totalCalories / 3000) * 100, 100);
        ProgressBar.style.width = `${percent}%`;

        // Step D: Reset the form 
        form.reset();