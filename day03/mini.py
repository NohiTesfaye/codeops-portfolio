class account:
    def __init__(self,owner,balance):
        self.owner=owner
        self.balance=balance
    def deposit(self,amount):
        self.balance+=amount
        return self.balance
    def withdraw(self,amount):
        self.balance-=amount
    def statement(self):
        print(f"{self.owner}:{self.balance}")


almaz=account("almaz",1000)#object
almaz.deposit(500)
abebe=account("abebe",2000)
class person:
    def __init__(self,name,address):
        self.name=name
        self.address=address
print(almaz.balance)
kidist =account("kidist",1000)
kidist.deposit(500)
kidist.withdraw(100)
print(kidist.balance)


class Dog:
    def __init__(self,name,age):
        self.name=name
        self.age=age
    def get_name(self):
        return self.name
    
    def get_age(self):
        return self.age


d=Dog("xoonaa",34)
d1=Dog("qusee",32)
print(d.get_name(),d.get_age())
print(d1.name)


class student:
    def __init__(self,name,age ,grade):
        self.name=name
        self.age=age
        self.grade=grade
    def get_grade(sef):
        return self.grade
class course:
    def __init__(self,name,max_students):
        self.name=name
        self.max_students=max_students
        self.students=[]
    def add_student(self,student):
        if len(self.students)<self.max_students:
            self.students.append(student)
            return True
        return false
    