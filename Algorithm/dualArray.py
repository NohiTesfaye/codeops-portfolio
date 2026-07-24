

def isDual(arr):
    count={}
    for n in arr:
        count[n]=count.get(n,0)+1
    for val in count.values():
        if val !=2:
            return 0
    return 1
print(isDual([1, 2, 1, 3, 3, 2]))
print(isDual([1, 2, 1, 1, 3, 2]))
print(isDual([2,6,7,2,7,6]))