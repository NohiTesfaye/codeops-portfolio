class Account:
    def __init__(self, account_number: str, holder_name: str, initial_balance: float = 0.0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = initial_balance
        self.history = []  # Stack for LIFO undo mechanism

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit must be positive.")
        self.balance += amount
        self.history.append(('deposit', amount))

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal must be positive.")
        if amount > self.balance:
            raise ValueError("Insufficient funds.")
        self.balance -= amount
        self.history.append(('withdraw', amount))

    def undo_last(self):
        if not self.history:
            return None
        action, amount = self.history.pop()
        if action == 'deposit':
            self.balance -= amount
        elif action == 'withdraw':
            self.balance += amount
        return action, amount


class AccountRegistry:
    def __init__(self):
        self.accounts = {}  # Dict for O(1) lookup

    def add(self, account: Account):
        if account.account_number in self.accounts:
            raise ValueError(f"Account {account.account_number} already exists.")
        self.accounts[account.account_number] = account

    def find(self, account_number: str) -> Account:
        return self.accounts.get(account_number, None)

    def list_all(self):
        return sorted(self.accounts.values(), key=lambda acc: acc.account_number)