my_array=[6,2,5,1]
n=len(my_array)
for i in range(n):
    for j in range(0,n-i-1):
        if my_array[j]>my_array[j+1]:
            my_array[j],my_array[j+1]=my_array[j+1],my_array[j]
print("Sorted array:", my_array)


def bubble_sort(arr):
    n=len(arr)
    for i in range(n):
        for j in range(0,n-i-1):
            if arr[j]>arr[j+1]:
                arr[j],arr[j+1]=arr[j+1],arr[j]
    return arr
my_numbers=[10,5,6,13,67,56,76]
sorted_numbes=bubble_sort(my_numbers)

print("bubble sort:",sorted_numbes)