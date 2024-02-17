

    // Call this function once at the start to initialize the UI
    updateCostAndValueUI();

    // Function to randomly adjust prices
    function updatePrice(price) {
        return Math.max(1, Math.round(price + (Math.random() * 0.4 - 0.2) * price));
    }

    // Function to update product costs every 30 seconds
    setInterval(() => {
        for (const product in productInfo) {
            productInfo[product].cost = updatePrice(productInfo[product].cost);
        }
        updateCostAndValueUI();
    }, 30000);

    // Function to update market values every 5 seconds
    setInterval(() => {
        for (const product in productInfo) {
            productInfo[product].value = updatePrice(productInfo[product].value);
        }
        updateCostAndValueUI();
    }, 5000);

    // Function to handle production of a sauce
    const produceSauce = (sauce) => {
        if (userBalance >= productInfo[sauce].cost && productionQueue.length < 4) {
            userBalance -= productInfo[sauce].cost;
            balanceElement.textContent = `${userBalance} mato`;
            productionQueue.push(sauce);

            // Update production queue UI here if needed

            setTimeout(() => {
                // After production time, increase balance by the sauce's market value
                userBalance += productInfo[sauce].value;
                balanceElement.textContent = `${userBalance} mato`;

                // Remove the sauce from the production queue
                const index = productionQueue.indexOf(sauce);
                if (index > -1) {
                    productionQueue.splice(index, 1);
                }

                // Update production queue UI here if needed

                alert(`${sauce.charAt(0).toUpperCase() + sauce.slice(1)} sauce production complete! Sold for ${productInfo[sauce].value} MATO.`);
            }, productInfo[sauce].productionTime);
        } else {
            alert("Not enough MATO coins or production queue is full.");
        }
    };

    // Example: Start production of ketchup (this should be triggered by actual user interaction)
    // produceSauce('ketchup');

    // Implement UI interactions for buying more MATO and selling products here
});

document.addEventListener('DOMContentLoaded', () => {
    let userBalance = 5000; // Initial MATO coin balance
    const balanceElement = document.getElementById('matoBalance');
    const sauceSelection = document.getElementById('sauceSelection');

    // Update the UI with the initial MATO balance
    balanceElement.textContent = `${userBalance} MATO`;

    // Object to hold the initial costs of products
    const sauceCosts = {
        ketchup: 10,
        canned: 15,
        paste: 8,
        toppings: 12,
    };

    // Function to update MATO balance after selecting a sauce
    const updateBalance = (cost) => {
        if(userBalance >= cost) {
            userBalance -= cost;
            balanceElement.textContent = `${userBalance} MATO`;
        } else {
            alert("Not enough MATO coins.");
        }
    };

    // Event listener for the sauce selection dropdown changes
    sauceSelection.addEventListener('change', (e) => {
        const selectedSauce = e.target.value;
        const cost = sauceCosts[selectedSauce];
        updateBalance(cost);
        alert(`You have selected ${selectedSauce.charAt(0).toUpperCase() + selectedSauce.slice(1)}. Production cost is ${cost} MATO.`);
    });

    // Example function to update current prices - this should be expanded based on your game's logic
    const updateCurrentPrices = () => {
        // Logic to dynamically update prices based on some conditions
    };

    // Call the update prices function at intervals or under certain conditions
    // setInterval(updateCurrentPrices, 5000); // For example, update every 5 seconds
});
