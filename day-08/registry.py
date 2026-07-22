class Account:
    def __init__(self, account_number: str, holder_name: str, initial_balance: float = 0.0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = initial_balance
        self.history = []  # Stack of transaction amounts (e.g., [100.0, -50.0, 20.0])

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit must be positive.")
        self.balance += amount
        self.history.append(amount)

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal must be positive.")
        if amount > self.balance:
            raise ValueError("Insufficient funds.")
        self.balance -= amount
        self.history.append(-amount)

    def total_transactions(self, index: int = 0) -> float:
        """Step 4: Recursive total of all transaction amounts in history.
        
        Base Case: Reached the end of the history list.
        Recursive Step: Current transaction amount + sum of remaining transactions.
        """
        if index >= len(self.history):
            return 0.0
        return self.history[index] + self.total_transactions(index + 1)


class AccountRegistry:
    def __init__(self):
        self.accounts = {}  # Dict for lookup: key = account_number, value = Account object

    def add(self, account: Account):
        if account.account_number in self.accounts:
            raise ValueError(f"Account {account.account_number} already exists.")
        self.accounts[account.account_number] = account

    # ---------------------------------------------------------
    # Step 2: Leaderboard using sorted() and key=lambda
    # ---------------------------------------------------------
    def top_by_balance(self, n: int) -> list[Account]:
        """Returns top n accounts sorted descending by balance."""
        sorted_accounts = sorted(
            self.accounts.values(), 
            key=lambda acc: acc.balance, 
            reverse=True
        )
        return sorted_accounts[:n]

    # ---------------------------------------------------------
    # Step 3: Custom Binary Search O(log n)
    # ---------------------------------------------------------
    def binary_search(self, sorted_list: list[Account], target_num: str) -> Account | None:
        """Custom Binary Search implementation on a list sorted by account_number."""
        low = 0
        high = len(sorted_list) - 1

        while low <= high:
            mid = (low + high) // 2
            mid_num = sorted_list[mid].account_number

            if mid_num == target_num:
                return sorted_list[mid]
            elif mid_num < target_num:
                low = mid + 1
            else:
                high = mid - 1

        return None

    def find_by_number(self, target_num: str) -> Account | None:
        """Binary search entry point: sorts by account_number then performs binary search."""
        # Ensure array is sorted by account_number for binary search to work properly
        sorted_accounts = sorted(self.accounts.values(), key=lambda acc: acc.account_number)
        return self.binary_search(sorted_accounts, target_num)


# ==========================================
# Step 5: Demonstration & Testing
# ==========================================
if __name__ == "__main__":
    registry = AccountRegistry()

    # Create dummy accounts
    acc1 = Account("1003", "Charlie", 1200.0)
    acc2 = Account("1001", "Alice", 450.0)
    acc3 = Account("1004", "Diana", 3100.0)
    acc4 = Account("1002", "Bob", 850.0)

    for acc in [acc1, acc2, acc3, acc4]:
        registry.add(acc)

    # 1. Test Leaderboard
    print("--- Top 2 Leaderboard (By Balance) ---")
    top_accounts = registry.top_by_balance(2)
    for acc in top_accounts:
        print(f"[{acc.account_number}] {acc.holder_name}: ${acc.balance:.2f}")

    # 2. Test Binary Search
    print("\n--- Testing Binary Search ---")
    target = "1002"
    result = registry.find_by_number(target)
    if result:
        print(f"Found Account {target}: {result.holder_name} with balance ${result.balance:.2f}")
    else:
        print(f"Account {target} not found.")

    # 3. Test Recursive Transaction Total
    print("\n--- Testing Recursive Transaction Total ---")
    acc1.deposit(200.0)   # +200.0
    acc1.withdraw(50.0)   # -50.0
    acc1.deposit(100.0)   # +100.0

    net_total = acc1.total_transactions()
    print(f"Transaction history for {acc1.holder_name}: {acc1.history}")
    print(f"Recursive Net Transaction Total: ${net_total:.2f}")