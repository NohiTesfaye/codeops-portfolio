from abc import ABC, abstractmethod


# ==========================================
# 1. OBSERVER PATTERN (Alert Observers & SRP)
# ==========================================

class Observer(ABC):
    @abstractmethod
    def update(self, message: str):
        pass


class SMSAlert(Observer):
    """Concrete Observer handling SMS notifications (SRP: Single Responsibility Principle)."""
    def __init__(self, phone_number: str):
        self.phone_number = phone_number

    def update(self, message: str):
        print(f"[SMS to {self.phone_number}]: {message}")


# ==========================================
# 2. ACCOUNT DOMAIN CLASSES (Subject in Observer Pattern)
# ==========================================

class Account(ABC):
    def __init__(self, account_number: str, holder_name: str, initial_balance: float = 0.0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = initial_balance
        self._observers = []  # List of subscribed observers

    def subscribe(self, observer: Observer):
        """Attach an observer to the account."""
        if observer not in self._observers:
            self._observers.append(observer)

    def unsubscribe(self, observer: Observer):
        """Detach an observer from the account."""
        if observer in self._observers:
            self._observers.remove(observer)

    def _notify(self, message: str):
        """Notify all subscribed observers."""
        for observer in self._observers:
            observer.update(message)

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        self._notify(f"Deposited ${amount:.2f}. New Balance: ${self.balance:.2f}")

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.balance:
            raise ValueError("Insufficient funds.")
        self.balance -= amount
        self._notify(f"Withdrew ${amount:.2f}. New Balance: ${self.balance:.2f}")


class CheckingAccount(Account):
    def __init__(self, account_number: str, holder_name: str, initial_balance: float = 0.0, overdraft_limit: float = 100.0):
        super().__init__(account_number, holder_name, initial_balance)
        self.overdraft_limit = overdraft_limit


class SavingsAccount(Account):
    def __init__(self, account_number: str, holder_name: str, initial_balance: float = 0.0, interest_rate: float = 0.02):
        super().__init__(account_number, holder_name, initial_balance)
        self.interest_rate = interest_rate


# ==========================================
# 3. FACTORY PATTERN (AccountFactory)
# ==========================================

class AccountFactory:
    """Factory class to encapsulate account creation logic."""
    @staticmethod
    def create(kind: str, account_number: str, holder_name: str, initial_balance: float = 0.0, **kwargs) -> Account:
        kind_clean = kind.strip().lower()
        
        if kind_clean == "checking":
            overdraft_limit = kwargs.get("overdraft_limit", 100.0)
            return CheckingAccount(account_number, holder_name, initial_balance, overdraft_limit)
            
        elif kind_clean == "savings":
            interest_rate = kwargs.get("interest_rate", 0.02)
            return SavingsAccount(account_number, holder_name, initial_balance, interest_rate)
            
        else:
            raise ValueError(f"Unknown account type: '{kind}'. Expected 'checking' or 'savings'.")


# ==========================================
# 4. TESTING / DEMONSTRATION
# ==========================================

if __name__ == "__main__":
    print("--- Creating Accounts via AccountFactory ---")
    
    # Open accounts using Factory
    checking_acc = AccountFactory.create("checking", "CHK-101", "Alice", 500.0)
    savings_acc = AccountFactory.create("savings", "SAV-202", "Bob", 1000.0)

    print(f"Created: {type(checking_acc).__name__} ({checking_acc.account_number})")
    print(f"Created: {type(savings_acc).__name__} ({savings_acc.account_number})")

    # Create & Attach SMS Observers
    sms_alice = SMSAlert("+1-555-0192")
    sms_bob = SMSAlert("+1-555-0144")

    checking_acc.subscribe(sms_alice)
    savings_acc.subscribe(sms_bob)

    print("\n--- Performing Transactions with Observers ---")
    
    # Transactions trigger automatic SMS alerts
    checking_acc.deposit(150.0)
    checking_acc.withdraw(50.0)

    savings_acc.deposit(500.0)