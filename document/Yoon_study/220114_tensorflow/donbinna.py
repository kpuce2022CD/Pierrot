from pickletools import optimize
import tensorflow as tf

xData = [1,2,3,4,5,6,7]
yData = [25000,55000,75000,110000,128000,155000,180000]

# W : 가중치, 하나의 변수로 정의 / 랜덤 유니폼은 하나의 랜덤값을 만듬 / 하나의 초기값으로 랜덤한 값으로 -100~100사이 값을 만들어줌
W = tf.Variable(tf.random_uniform([1], -100, 100)) 
b = tf.Variable(tf.random_uniform([1], -100, 100))

X = tf.placeholder(tf.float32) #하나의 틀
Y = tf.placeholder(tf.float32)
H = W * X + b
cost = tf.reduce_mean(tf.square(H-V)) #spuare : 제곱을 의미 / reduce_mean : 평균값을 의미
a = tf.Variable(0.01) #그래프에서 하강할때 하나의 스탭을 지정
optimizer = tf.train.GradientDescentOptimizer(a) #tensorflow에서 기본적으로 제공하는 경사하강 라이브러리 (학습과 관련한 라이브러리)
train = optimizer.minimize(cost)
init = tf.global_variables 
sess = tf.Session() #하나의 섹션 지정
sess.run(init)

#인덱스 5001로 지정해 학습 진행
for i in range(5001) : 
    sess.run(train, feed_dict={X: xData, Y : yData})
    if i % 500 == 0:
        print (i, sess.run(cost, feed_dict={X: xData, Y : yData}), sess.run(W), sess.run(b))
print(sess.run(H, feed_dict={X: [8]}))
        