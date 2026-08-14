document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const errorArea = document.getElementById('error-area');
    const statsArea = document.getElementById('stats-area');

const ethiopianPhoneRegex = /^(09\d{8}|\+2519\d{8})$/;
    updateSignupStats();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameValue = nameInput.value.trim();
        const phoneValue = phoneInput.value.trim();

        
        errorArea.textContent = '';

        if (nameValue.length < 2) {
            errorArea.textContent = 'Error: Name must be at least 2 characters long.';
            nameInput.focus();
            return;
        }

        if (!ethiopianPhoneRegex.test(phoneValue)) {
            errorArea.textContent = 'Error: Please enter a valid Ethiopian phone number (e.g., 0912345678 or +251912345678).';
            phoneInput.focus();
            return;
        }

        const newEntry = {
            name: nameValue,
            phone: phoneValue,
            timestamp: new Date().toISOString()
        };

        let signups = JSON.parse(localStorage.getItem('signups')) || [];

       
        signups.push(newEntry);

        
        localStorage.setItem('signups', JSON.stringify(signups));

        
        form.reset();

       
        updateSignupStats();
    });

    function updateSignupStats() {
        const signups = JSON.parse(localStorage.getItem('signups')) || [];
        const count = signups.length;
        if (count === 0) {
            statsArea.textContent = 'No one has signed up yet.';
        } else if (count === 1) {
            statsArea.textContent = '1 person has signed up.';
        } else {
            statsArea.textContent = `${count} people have signed up.`;
        }
    }
});