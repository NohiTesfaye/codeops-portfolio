 
def checkMera(arr):
    for n in arr:
        if n*2 in arr:
            print("im not a meera array")
            return
    print("im meera")
checkMera([2,6,8,9,12])
checkMera([3,6,2,1,0])
checkMera([4,70,3])
