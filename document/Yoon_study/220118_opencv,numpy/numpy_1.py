# import numpy as np

# #numpy 사용법
# list_data = [1, 2, 3]
# array = np.array(list_data)

# print(array.size)
# print(array.dtype)
# print(array[2])

# 3

# # 0부터 3까지의 배열 만들기
# array1 = np.arange(4)  # 0부터 넣은값에 -1한 값까지 0~3
# print(array1)

# array2 = np.zeros((4, 4), dtype=float)  # 4x4 크기의 배열이 다 0값을 가지고 실수형이다
# print(array2)

# array3 = np.ones((3, 3), dtype=str)
# print(array3)


# # 0부터 9까지 랜덤하게 초기화된 배열 만들기
# array4 = np.random.randint(0, 10, (3, 3))  # 0~9까지 범위로 3x3배열을 랜덤으로 만들어라
# print(array4)


# # 평균이 0이고, 표준편차가 1인 표준 정규를 띄는 배열
# array5 = np.random.normal(0, 1, (3, 3))
# print(array5)


# #########################################################################################

# array1 = np.array([1, 2, 3, 4])
# array2 = np.array([4, 5, 6, 7])
# array3 = np.concatenate([array1, array2])
# print(array3.shape)
# print(array3)

# array4 = array1.reshape((2, 2))  # 1차원 배열을 2차원 2x2배열로 만들기
# print(array4)

# array5 = np.arange(4).reshape(1, 4)
# array6 = np.arange(8).reshape(2, 4)

# print(array5)
# print(array6)

# array7 = np.concatenate([array5, array6], axis=0)
# print(array7)

# array8= np.arange(8).reshape(2,4)
# left, right = np.split(array8, [2], axis=1) #인덱스 2를 기준으로 나눈다 (인덱스는 열을 의미)
# print(left.shape)
# print(right.shape)
# print(array8)
# print(left)

# ##########################################################################################
