
def reversecompare(num):
    s=str(num)
    reversedstring=s[::-1]
    reversednumber=int(reversedstring)
    if num>reversednumber:
        print("okay")
    else:
        print("not okay")
reversecompare(90)
reversecompare(18)
