
class RSA:

    def __init__(self):
        self.__create_key()
        pass

    def rsa_encrypt(self, plain_text):
        # 加密 plain_text < n
        return self.__quick_pow_mod(plain_text, self.__e, self.__n)

    def rsa_decrypt(self, cipher_text):
        # 解密
        return self.__quick_pow_mod(cipher_text, self.__d, self.__n)

    @staticmethod
    def __create_prime_list():
        # 生成一个素数列表

        l = list(range(2, 10000))
        for n, i in enumerate(l):
            for j in l[n + 1:]:
                if j % i == 0:
                    l.remove(j)
        return l

    def get_public_key(self):
        # 获取公钥
        return "自动生成公钥对：{%d, %d}" % (self.__e, self.__n)

    def get_private_key(self):
        # 获取私钥
        return "自动生成私钥对：{%d, %d}" % (self.__d, self.__n)

    def __gcd_x_y(self, x, y):
        # 求最大公倍数
        if y == 0:
            return x
        else:
            return self.__gcd_x_y(y, x % y)

    @staticmethod
    def __quick_pow_mod(a, b, c):
        # 计算a^b % c， 快速幂算法
        ans = 1  # 记录结果
        a = a % c  # 预处理，使得a处于c的数据范围之下
        while b != 0:
            if b & 1:  # 如果b的二进制位不是0，那么我们的结果是要参与运算的
                ans = (ans * a) % c
            b >>= 1  # 二进制的移位操作，相当于每次除以2，用二进制看，就是我们不断的遍历b的二进制位
            a = (a * a) % c  # 不断的加倍
        return ans

    def __create_key(self):
        prime_list = self.__create_prime_list()
        import random
        # 得到两个素数
        p = prime_list[random.randint(0, len(prime_list) - 1)]
        q = prime_list[random.randint(0, len(prime_list) - 1)]
        self.__fanN = (p - 1) * (q - 1)
        while True:
            self.__e = random.randint(2, self.__fanN)
            if self.__gcd_x_y(self.__e, self.__fanN) == 1:
                break
        for i in range(self.__fanN):
            if i * self.__e % self.__fanN == 1:
                self.__d = i
                break
        self.__n = q * p
    # 得到公钥{e, n} 私钥{d, n}


if __name__ == "__main__":
    rsa = RSA()
    a=rsa.get_public_key()
    b=rsa.get_private_key()
    print(a)
    print(b)
    plain_text = int(input("请输入要加密的明文："))
    cipher = rsa.rsa_encrypt(plain_text)
    print("%d 经过加密后为：%d" % (plain_text, cipher))
    print(f'''{plain_text}经过加密后为{cipher}''')
    print("%d 经过解密后为：%d" % (cipher, rsa.rsa_decrypt(cipher)))


