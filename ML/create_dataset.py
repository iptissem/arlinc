import csv
import random
from datetime import datetime, timedelta

# generate random dates
def random_date(start, end):
    delta = end - start
    random_days = random.randint(0, delta.days)
    return start + timedelta(days=random_days)

# Data preparation

# Particulier: 50 lignes
particuliers = []
cities = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"]
for i in range(50):
    particuliers.append({
        "id": i + 1,
        "username": f"user{i+1}",
        "email": f"user{i+1}@example.com",
        "password": f"pass{i+1}",
        "city": random.choice(cities),
        "nbr_order": 0
    })

# Entreprise: 15 lignes
entreprises = []
names = ["Auchan", "Carrefour", "Intermarché", "Lidl", "Monoprix"]
for i in range(15):
    entreprises.append({
        "id": i + 1,
        "name": random.choice(names),
        "email": f"entreprise{i+1}@example.com",
        "password": f"pass{i+1}",
        "adress": f"Adress {i+1}",
        "city": random.choice(cities)
    })

# Cart: 1000 lignes
carts = []
types = ["frais", "legume", "sec", "mixte"]
for i in range(1000):
    entreprise_id = random.randint(1, len(entreprises))
    carts.append({
        "id": i + 1,
        "id_entreprise": entreprise_id,
        "type": random.choice(types),
        "quantity": random.randint(10, 500),
        "creation_date": random_date(datetime(2023, 1, 1), datetime(2024, 12, 31)).strftime('%Y-%m-%d'),
        "end_date": random_date(datetime(2025, 1, 1), datetime(2025, 12, 31)).strftime('%Y-%m-%d')
    })

# Get carts with Cart.quantity > 0
def get_dispo_carts():
    dispo_carts = list()
    for cart in carts:
        if cart['quantity'] > 0:
            dispo_carts.append(cart)
    return(dispo_carts)

# Order: 3000 lignes
orders = []
for i in range(3000):
    dispo_carts = get_dispo_carts()
    if len(dispo_carts) == 0: break
    cart = random.choice(dispo_carts)
    particulier_id = random.randint(1, len(particuliers))
    quantity = random.randint(1, cart["quantity"])
    cart["quantity"] -= quantity  # Update cart quantity
    orders.append({
        "id": i + 1,
        "id_cart": cart["id"],
        "id_particulier": particulier_id,
        "quantity": quantity,
        "reservation_date": random_date(datetime(2025, 1, 1), datetime(2025, 6, 30)).strftime('%Y-%m-%d'),
        "end_date": random_date(datetime(2025, 7, 1), datetime(2025, 12, 31)).strftime('%Y-%m-%d')
    })

# OrderHistory: 2764 lignes
order_histories = []
for i in range(2764):
    order = random.choice(orders)
    order_histories.append({
        "id": i + 1,
        "id_order": order["id"],
        "recuperation_date": random_date(datetime(2025, 1, 1), datetime(2025, 12, 31)).strftime('%Y-%m-%d')
    })

# Writing to CSV files
def write_csv(filename, fieldnames, rows):
    file_path = f'data/{filename}'
    with open(file_path, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

write_csv("Particulier.csv", particuliers[0].keys(), particuliers)
write_csv("Entreprise.csv", entreprises[0].keys(), entreprises)
write_csv("Cart.csv", carts[0].keys(), carts)
write_csv("Order.csv", orders[0].keys(), orders)
write_csv("OrderHistory.csv", order_histories[0].keys(), order_histories)

