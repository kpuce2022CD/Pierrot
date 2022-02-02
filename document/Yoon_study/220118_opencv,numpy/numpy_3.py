import numpy as np

# # 단일 객체 저장 및 불러오기
# array = np.arange(0, 10)
# np.save('saved.npy', array)

# result = np.load('saved.npy')
# print(result)

# # 복수 객체 저장 및 불러오기
# array1 = np.arange(0, 10)
# array2 = np.arange(10, 20)
# np.savez('saved.npz', array1=array1, array2=array2)

# data = np.load('saved.npz')
# result1 = data['array1']
# result2 = data['array2']
# print(result1)
# print(result2)

##############################################################

# 오름차순 원소 정렬
array = np.array([2, 6, 2, 4, 8])
array.sort()
print(array)
print(array[::-1])  # 내림차순으로 출력

# 열을 기준으로 정렬
array1 = np.array([[5, 4, 1, 6, 8], [5, 4, 1, 9, 4]])
array1.sort(axis=0)
print(array1)

# 균일한 간격으로 데이터 생성
array2 = np.linspace(0, 10, 5)
print(array2)

# 난수의 재연 (실행마다 결과 동일)
np.random.seed(7)
print(np.random.randint(0, 10, (2, 3)))

# 배열 객채 복사
array3 = np.arange(0, 10)
array4 = array3
array4[0] = 99
print(array3)

array5 = np.arange(0, 10)
array6 = array5.copy()
array6[0] = 99
print(array5)

# 중복된 원소 제거
array7 = np.array([1, 1, 2, 2, 3, 3, 4, 4])
print(np.unique(array7))
