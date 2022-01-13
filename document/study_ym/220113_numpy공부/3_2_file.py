import numpy as np

list_data = [1,2,3]
array = np.array(list_data)

print(array.size)
print(array.dtype)
print(array[2])

array1 = np.arange(4)
print(array1)

array2 = np.zeros((4,4),dtype=float)
print(array2)

array3 = np.ones((3,3),dtype=str)
print(array3)

array4 = np.random.randint(0,10,(3,3))
print(array4)

array5 = np.random.normal(0,1,(3,3))
print(array5)

array6 = np.array([1,2,3])
array7 = np.array([4,5,6])
print(np.concatenate([array6,array7]).shape)
print(np.concatenate([array6,array7]))
