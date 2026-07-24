

def getOnlyEvens(numbers):
    result=[]
    for i in range (len(numbers)):
        if i%2==0 and numbers[i]%2==0:
            result.append([numbers[i]])
            print(result)
    
getOnlyEvens([1, 2, 3, 6, 4, 8])   # Output: [4]
getOnlyEvens([0, 1, 2, 3, 4]) 
         # Output: [0, 2, 4]
