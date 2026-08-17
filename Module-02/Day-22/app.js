document.addEventListener('DOMContentLoaded', function () {
    
    const API_KEY = 'f049bb8848db41a49d5f644af7c1b38d'; 

    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const result = document.getElementById('result');
    const convertButton = document.getElementById('convertButton');

   
    fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);

            currencies.forEach(currency => {
                let option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                let option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });

        
            fromCurrency.value = 'USD';
            toCurrency.value = 'EUR';

          
            fromCurrency.addEventListener('change', updateResult);
            toCurrency.addEventListener('change', updateResult);
            amount.addEventListener('input', updateResult);
            convertButton.addEventListener('click', updateResult);

            
            makeDropdownSearchable(fromCurrency);
            makeDropdownSearchable(toCurrency);

            updateResult(); 
        })
        .catch(error => {
            console.error('Error fetching currency list:', error);
            result.textContent = 'Error loading currencies. Please try again.';
        });

    function updateResult() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amt = amount.value;

        fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const rate = parseFloat(data.rates[to]) / parseFloat(data.rates[from]);
                const convertedAmount = (amt * rate).toFixed(2);
                result.textContent = `${amt} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => {
                console.error('Error fetching conversion:', error);
                result.textContent = 'Error converting currency. Please try again.';
            });
    }

    function makeDropdownSearchable(dropdown) {
        const searchInput = document.createElement('input');
        searchInput.setAttribute('placeholder', 'Search...');
        searchInput.style.padding = '8px';
        searchInput.style.width = 'calc(100% - 16px)';
        searchInput.style.marginBottom = '10px';
        searchInput.style.boxSizing = 'border-box';

        dropdown.parentNode.insertBefore(searchInput, dropdown);

        searchInput.addEventListener('input', function () {
            const filter = searchInput.value.toLowerCase();
            const options = dropdown.getElementsByTagName('option');

            for (let i = 0; i < options.length; i++) {
                const txtValue = options[i].textContent || options[i].innerText;
                options[i].style.display = txtValue.toLowerCase().includes(filter) ? '' : 'none';
            }
        });
    }
});
