class Account:
    def __init__(self):
        pass
class NewAccount:
    def __new__(cls):
        pass
account=Account()
print(account)
class Account(ABC):
    def __init__(self,owner,balance):
        return self.balance*0.06
        self.balance=balance
class AccountFactoy:
    def __init__(self):
        pass
class AuditLog:
    def update(self,event):
        print(f'')