Page({
  data: {
    currentIndex: 0,
    imageList: [
      'https://img0.baidu.com/it/u=891057047,2511666354&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667',
      'https://img2.baidu.com/it/u=2162972920,3759823780&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=664',
      'https://img1.baidu.com/it/u=1377826580,1094847210&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
      'https://img2.baidu.com/it/u=3233674257,3277114296&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500',
      'https://img0.baidu.com/it/u=3948329438,2482580265&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1082'
    ],
    scaleList: [],
    scaleRatio: 0.75 // 缩放系数
  },
  onLoad() {
    this.initScaleList(0)
  },
  onSwiperChange(e) {
    const current = e.detail.current
    this.setData({ currentIndex: current })
    this.initScaleList(current)
  },
  initScaleList(centerIndex) {
    const { imageList, scaleRatio } = this.data
    const scaleList = imageList.map((_, idx) => {
      if (idx === centerIndex) return 1
      if (idx === (centerIndex - 1 + imageList.length) % imageList.length) return scaleRatio
      if (idx === (centerIndex + 1) % imageList.length) return scaleRatio
      return scaleRatio
    })
    this.setData({ scaleList })
  }
})
