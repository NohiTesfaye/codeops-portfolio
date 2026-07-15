collection
lisst
cities=["Addis Ababa","Bahir Dar","Gondar","Mekele","Hawassa","Jimma","Dire Dawa","Harar","Dessie","Jijiga"]
cities[0]="Gondar"
cities.append("Ambo")
cities.insert(2,"Gayo qibbee")
cities.remove("Hawassa")
cities.sort()
cities.reverse()
for i in cities:
    print(i)
print(cities)
customer = {
 "name": "Almaz Bekele",
 "balance": 1500, # ETB
 "city": "Addis Ababa",
}
print(customer["name"])
print(customer["balance"])
print(customer.get("city"))
for key,value in customer.items():
    print(customer.items())
city_set=set(cities)
print(cities)
print(city_set)
import math
coll_1=[1,9,6,7]
coll_2=[9,23,45]
city_set=set(coll_1-coll_2)
print(city_set)
math.sqrt(16)
pi=math.sqrt
print(pi)
import math
print(pow(4,5))
prin(sqrt(16))
with open("./note.txt",'a') as file:
        print(file.write("\n wellcome to python"))
    for line in file:
        print(line.strip())
    print(file.write("wellcome to python"))
try:
    with open("./note.txt",'a') as file:
        print(file.write("\n wellcome to python"))
except FileExistsError:
    print("the file is already created")
except FileExistsError:
    print("file not found")
finally:
    print("done")  
Transaction Log Reader

