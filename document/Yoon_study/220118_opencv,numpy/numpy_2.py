from array import array
import numpy as np

# array = np.random.randint(1, 10,  size=4).reshape(2, 2)
# print(array)

# result_array = array * 10 #모든 데이터에 10이 곱해진다
# print(result_array)

###############################################################################

# # numpy 브로드캐스팅 : 서로 모양이 다른 배열끼리 연산이 가능하다
# array1 = np.arange(0, 8).reshape(2, 4)
# array2 = np.arange(0, 8).reshape(2, 4)
# array3 = array1 + array2

# print(array3)

# array4 = np.concatenate([array1, array2], axis=0)  # 두 값을 위 아래로 합침
# print(array4)

# array5 = np.arange(0, 4).reshape(4, 1)
# print(array4 + array5)


##############################################################################

# numpy 마스킹 : 각 원소에 대하여 체크

# array1 = np.arange(16).reshape(4, 4)
# print(array1)

# array2 = array1 < 10  # 10보다 작은 값만 체크해라
# print(array2)

# array1[array2] = 100 #10보다 작은 값은 100으로 변환하기
# print(array1)

####################################################################################

# # numpy 집계함수

# array = np.arange(16).reshape(4, 4)

# print('최대값: ', np.max(array))
# print('최소값: ', np.min(array))
# print('합계: ', np.sum(array))
# print('평균값: ', np.mean(array))

# print('열에 대한 합계: ', np.sum(array, axis=0))
