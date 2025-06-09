Page({
  data: {
    currentIndex: 0,
    mainImgs: [
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
  onSwiperTransition(e) {
    const { dx, source } = e.detail
    if (source !== 'touch') return // 只处理手指滑动
    const { currentIndex, mainImgs, scaleRatio } = this.data
    const totalWidth = wx.getWindowInfo().windowWidth
    const offset = dx / totalWidth // -1~1，负为向右滑，正为向左滑

    let nextIndex
    if (offset < 0) { // 向右滑，目标是下一个
      nextIndex = (currentIndex + 1) % mainImgs.length
    } else if (offset > 0) { // 向左滑，目标是上一个
      nextIndex = (currentIndex - 1 + mainImgs.length) % mainImgs.length
    } else {
      nextIndex = currentIndex
    }

    // 计算scale
    const absOffset = Math.abs(offset)
    const currentScale = 1 - absOffset * (1 - scaleRatio)
    const nextScale = scaleRatio + absOffset * (1 - scaleRatio)

    const scaleList = mainImgs.map((_, idx) => {
      if (idx === currentIndex) return currentScale
      if (idx === nextIndex) return nextScale
      return scaleRatio
    })
    this.setData({ scaleList })
  },
  initScaleList(centerIndex) {
    const { mainImgs, scaleRatio } = this.data
    const scaleList = mainImgs.map((_, idx) => {
      if (idx === centerIndex) return 1
      if (idx === (centerIndex - 1 + mainImgs.length) % mainImgs.length) return scaleRatio
      if (idx === (centerIndex + 1) % mainImgs.length) return scaleRatio
      return scaleRatio
    })
    this.setData({ scaleList })
  }
})
