<template>
  <div class="data-wrapper">
    <div class="item-wrapper">
      <div class="item" :class="{'show': show}">
        <div class="data">
          <div class="content">{{currentOpenCount}}</div>
          <div class="title">开通店铺数</div>
        </div>
      </div>
    </div>
    <div class="item-wrapper">
      <div class="item" :class="{'show': show}">
        <div class="data">
          <div class="content">{{currentPayCount}}</div>
          <div class="title">付费店铺数</div>
        </div>
      </div>
    </div>
    <div class="item-wrapper">
      <div class="item" :class="{'show': show}">
        <div class="data">
          <div class="content">{{currentDueOrderCount}}</div>
          <div class="title">交易订单数</div>
        </div>
      </div>
    </div>
    <div class="item-wrapper">
      <div class="item" :class="{'show': show}">
        <div class="data">
          <div class="content">{{currentDueMoneyCount}}</div>
          <div class="title">交易金额</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Merchant} from 'api'
  import {ERR_OK} from 'common/js/config'

  const COMPONENT_NAME = 'data-wrapper'
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        show: false,
        openCount: 6000,
        currentOpenCount: 0,
        payCount: 700,
        currentPayCount: 0,
        dueOrderCount: 3000,
        currentDueOrderCount: 0,
        dueMoneyCount: 4000,
        currentDueMoneyCount: 0
      }
    },
    created() {
      this._getStatistics()
    },
    methods: {
      async _getStatistics() {
        const res = await Merchant.getStatistics()
        if (res.error !== ERR_OK) {
          return
        }
        this.openCount = res.data.created_shop_count
        this.payCount = res.data.paid_count
        this.dueOrderCount = res.data.customer_order_count
        this.dueMoneyCount = res.data.total_money
        this.show = true
        this.run()
      },
      run() {
        setTimeout(() => {
          let openTimer = setInterval(() => {
            let differ = this.openCount - this.currentOpenCount
            if (differ > 200) {
              this.currentOpenCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentOpenCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentOpenCount += 1
            } else if (differ <= 0) {
              this.currentOpenCount = this.openCount
              openTimer && clearInterval(openTimer)
            }
          }, 40)
        }, 300)
        setTimeout(() => {
          let payTimer = setInterval(() => {
            let differ = this.payCount - this.currentPayCount
            if (differ > 200) {
              this.currentPayCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentPayCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentPayCount += 1
            } else if (differ <= 0) {
              this.currentPayCount = this.payCount
              clearInterval(payTimer)
            }
          }, 40)
        }, 600)
        setTimeout(() => {
          let dueOrderTimer = setInterval(() => {
            let differ = this.dueOrderCount - this.currentDueOrderCount
            if (differ > 200) {
              this.currentDueOrderCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentDueOrderCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentDueOrderCount += 1
            } else if (differ <= 0) {
              this.currentDueOrderCount = this.dueOrderCount
              clearInterval(dueOrderTimer)
            }
          }, 40)
        }, 900)
        setTimeout(() => {
          let dueMoneyTimer = setInterval(() => {
            let differ = this.dueMoneyCount - this.currentDueMoneyCount
            if (differ > 200) {
              this.currentDueMoneyCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentDueMoneyCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentDueMoneyCount += 1
            } else if (differ <= 0) {
              this.currentDueMoneyCount = this.dueMoneyCount
              clearInterval(dueMoneyTimer)
            }
          }, 40)
        }, 1200)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .data-wrapper
    box-sizing: border-box
    display: flex
    align-items: center
    width: 100vw
    height: 100vh
    padding: 30px
    background: #ffffff
    .item-wrapper
      box-sizing: border-box
      width: 25%
      padding: 30px
      &:nth-child(1) .item
        transition-delay: .3s
        transform: translate3d(0, -300px, 0)
        .data
          background-image: linear-gradient(-90deg, #48D5FF 0%, #0F89ED 100%)
          box-shadow:0px 0px 5px #48D5FF
          &:hover
            box-shadow:0px 0px 50px #0F89ED
      &:nth-child(2) .item
        transition-delay: .6s
        transform: translate3d(-300px, 0, 0)
        .data
          background-image: linear-gradient(-90deg, #FFB51D 0%, #F16718 100%)
          box-shadow:0px 0px 5px #FFB51D
          &:hover
            box-shadow:0px 0px 50px #F16718
      &:nth-child(3) .item
        transition-delay: .9s
        transform: translate3d(0, 300px, 0)
        .data
          background-image: linear-gradient(-90deg, #9EEA8F 0%, #3CD79F 100%)
          box-shadow:0px 0px 5px #9EEA8F
          &:hover
            box-shadow:0px 0px 50px #3CD79F
      &:nth-child(4) .item
        transition-delay: 1.2s
        transform: translate3d(300px, 0, 0)
        .data
          background-image: linear-gradient(-90deg, #B867FF 0%, #751EF6 96%)
          box-shadow:0px 0px 5px #B867FF
          &:hover
            box-shadow:0px 0px 50px #751EF6
      .item
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        transition: all .5s
        opacity: 0
        &.show
          transform: translate3d(0, 0, 0)
          opacity: 1
        .data
          position: absolute
          top: 0
          left: 0
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          width: 100%
          height: 100%
          border-radius: 20px
          color: #ffffff
          transition: all .5s
          .content
            margin-bottom: 30px
            font-family: 'DINAlternate-Bold'
            font-size: 70px
          .title
            font-size: 25px
</style>
