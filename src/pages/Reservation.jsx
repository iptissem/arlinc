import React, { useState } from 'react';

const Reservation = () => {
    const [store, setStore] = useState('');
    const [basket, setBasket] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de réservation à implémenter ici
        console.log(`Réservation effectuée pour ${basket} à ${store} le ${date}`);
    };

    return (
        <div>
            <h1>Réserver un panier</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="store">Enseigne:</label>
                    <input
                        type="text"
                        id="store"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="basket">Panier:</label>
                    <input
                        type="text"
                        id="basket"
                        value={basket}
                        onChange={(e) => setBasket(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Réserver</button>
            </form>
        </div>
    );
};

export default Reservation;