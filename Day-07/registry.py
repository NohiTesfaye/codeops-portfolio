from bank import Account, AccountRegistry

def main():
    registry = AccountRegistry()

    # Create accounts
    acc1 = Account("1002", "Alice", 500.0)
    acc2 = Account("1001", "Bob", 200.0)

    # Add to registry
    registry.add(acc1)
    registry.add(acc2)

    # O(1) Lookup
    found = registry.find("1001")
    if found:
        print(f"Found: {found.holder_name} - Balance: ${found.balance}")

    # Transactions & Undo (Stack test)
    acc1.deposit(150.0)
    acc1.withdraw(50.0)
    acc1.undo_last()  # Undoes $50 withdrawal

    # Ordered list output
    print("\nAll Accounts (Ordered):")
    for acc in registry.list_all():
        print(f"[{acc.account_number}] {acc.holder_name} - ${acc.balance}")

if __name__ == "__main__":
    main()