const stripe = Stripe('pk_live_51Q9AS008cXjj8mtLeezGGvvnnZiY1g39501zYx6o4xHRmgLQ8PTQHrW9It9Ks65j6hijLHPHPduYpinj3STEv9VB00XjAOewwP'); 
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        document.getElementById('card-errors').textContent = error.message;
    } else {
        // Send paymentMethod.id to your server for processing
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1000 }), // Amount in cents ($10.00)
        });

        const data = await response.json();

        if (data.error) {
            document.getElementById('card-errors').textContent = data.error;
        } else {
            // Handle successful payment here
            alert('Payment successful!');
        }
    }
});