from account import Account

def main():
    acc1 = Account("Nohi", "1223422")
    acc2 = Account("Sara", "1233", 1000)

    print("--- Making Deposits ---")
    acc1.deposit(500)
    acc2.deposit(600)

    print("\n--- Testing Overdraft ---")
    try:
        acc1.withdraw(759)
    except ValueError as e:
        print("Caught Expected Error:", e)

    print("\n--- Testing Negative Withdrawal ---")
    try:
        acc2.withdraw(-50)
    except ValueError as e:
        print("Caught Expected Error:", e)

    print("\n--- Final Statements ---")
    acc1.statement()
    acc2.statement()

if __name__ == "__main__":
    main()