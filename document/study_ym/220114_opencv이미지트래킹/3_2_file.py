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

array8 = np.random.randint(1,10,size=4).reshape(2,2)
print(array8)
result_array = array8 * 10
print(result_array)

array9 = np.arange(4).reshape(2,2)
array10 = np.arange(2)

array11 = array9 + array10
print(array11)

array12 = np.arange(0,8).reshape(2,4)
array13 = np.arange(0,8).reshape(2,4)
array14 = np.concatenate([array12,array13], axis=0)
array15 = np.arange(0,4).reshape(4,1)

print(array14 + 4)
print(array15)
print(array14 + array15)
