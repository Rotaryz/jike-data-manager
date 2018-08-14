<template>
  <div class="data-wrapper">
    <div class="logo">
      <img src="./icon-logo.png" alt="" width="150" height="150">
      <p class="text">赞播微店</p>
    </div>
    <div class="list-wrapper">
      <div class="item-wrapper">
        <div class="item" :class="{'show': show}">
          <div class="data">
            <div class="today">{{currentTodayOpenCount}}</div>
            <div class="title">开通店铺数</div>
            <div class="content">累计 {{currentOpenCount}}</div>
          </div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item" :class="{'show': show}">
          <div class="data">
            <div class="today">{{currentTodayPayCount}}</div>
            <div class="title">付费店铺数</div>
            <div class="content">累计 {{currentPayCount}}</div>
          </div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item" :class="{'show': show}">
          <div class="data">
            <div class="today">{{currentTodayDueOrderCount}}</div>
            <div class="title">交易订单数</div>
            <div class="content">累计 {{currentDueOrderCount}}</div>
          </div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item" :class="{'show': show}">
          <div class="data">
            <div class="today">{{currentTodayDueMoneyCount}}</div>
            <div class="title">交易金额</div>
            <div class="content">累计 {{currentDueMoneyCount}}</div>
          </div>
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
        todayOpenCount: 6000,
        currentTodayOpenCount: 0,
        payCount: 700,
        currentPayCount: 0,
        todayPayCount: 700,
        currentTodayPayCount: 0,
        dueOrderCount: 3000,
        currentDueOrderCount: 0,
        todayDueOrderCount: 3000,
        currentTodayDueOrderCount: 0,
        dueMoneyCount: 4000,
        currentDueMoneyCount: 0,
        todayDueMoneyCount: 4000,
        currentTodayDueMoneyCount: 0
      }
    },
    async created() {
      await this.load()
      this.show = true
      this.run()
      this.interval()
    },
    beforeDestroy() {
      this.globalTimer && clearInterval(this.globalTimer)
      this.openTimeout && clearTimeout(this.openTimeout)
      this.payTimeout && clearTimeout(this.payTimeout)
      this.dueOrderTimeout && clearTimeout(this.dueOrderTimeout)
      this.dueMoneyTimeout && clearTimeout(this.dueMoneyTimeout)
      this.openTimer && clearInterval(this.openTimer)
      this.todayOpenTimer && clearInterval(this.todayOpenTimer)
      this.payTimer && clearInterval(this.payTimer)
      this.todayPayTimer && clearInterval(this.todayPayTimer)
      this.dueOrderTimer && clearInterval(this.dueOrderTimer)
      this.todayDueOrderTimer && clearInterval(this.todayDueOrderTimer)
      this.dueMoneyTimer && clearInterval(this.dueMoneyTimer)
      this.todayDueMoneyTimer && clearInterval(this.todayDueMoneyTimer)
    },
    methods: {
      interval() {
        this.globalTimer = setInterval(async () => {
          this.load()
          this.run()
        }, 300000)
      },
      async load() {
        await this._getStatistics()
        await this._getTodayStatistics()
      },
      async _getStatistics() {
        const res = await Merchant.getStatistics()
        if (res.error !== ERR_OK) {
          return
        }
        this.openCount = res.data.created_shop_count
        this.payCount = res.data.paid_count
        this.dueOrderCount = res.data.customer_order_count
        this.dueMoneyCount = res.data.total_money
      },
      async _getTodayStatistics() {
        const res = await Merchant.getTodayStatistics()
        if (res.error !== ERR_OK) {
          return
        }
        this.todayOpenCount = res.data.created_shop_count
        this.todayPayCount = res.data.paid_count
        this.todayDueOrderCount = res.data.customer_order_count
        this.todayDueMoneyCount = res.data.total_money
      },
      run() {
        this.openTimeout = setTimeout(() => {
          this.openTimer = setInterval(() => {
            let differ = this.openCount - this.currentOpenCount
            if (differ > 200) {
              this.currentOpenCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentOpenCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentOpenCount += 1
            } else if (differ <= 0) {
              this.currentOpenCount = this.openCount
              this.openTimer && clearInterval(this.openTimer)
            }
          }, 40)
          this.todayOpenTimer = setInterval(() => {
            let differ = this.todayOpenCount - this.currentTodayOpenCount
            if (differ > 200) {
              this.currentTodayOpenCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentTodayOpenCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentTodayOpenCount += 1
            } else if (differ <= 0) {
              this.currentTodayOpenCount = this.todayOpenCount
              this.todayOpenTimer && clearInterval(this.todayOpenTimer)
            }
          }, 40)
        }, 300)
        this.payTimeout = setTimeout(() => {
          this.payTimer = setInterval(() => {
            let differ = this.payCount - this.currentPayCount
            if (differ > 200) {
              this.currentPayCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentPayCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentPayCount += 1
            } else if (differ <= 0) {
              this.currentPayCount = this.payCount
              this.payTimer && clearInterval(this.payTimer)
            }
          }, 40)
          this.todayPayTimer = setInterval(() => {
            let differ = this.todayPayCount - this.currentTodayPayCount
            if (differ > 200) {
              this.currentTodayPayCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentTodayPayCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentTodayPayCount += 1
            } else if (differ <= 0) {
              this.currentTodayPayCount = this.todayPayCount
              this.todayPayTimer && clearInterval(this.todayPayTimer)
            }
          }, 40)
        }, 600)
        this.dueOrderTimeout = setTimeout(() => {
          this.dueOrderTimer = setInterval(() => {
            let differ = this.dueOrderCount - this.currentDueOrderCount
            if (differ > 200) {
              this.currentDueOrderCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentDueOrderCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentDueOrderCount += 1
            } else if (differ <= 0) {
              this.currentDueOrderCount = this.dueOrderCount
              this.dueOrderTimer && clearInterval(this.dueOrderTimer)
            }
          }, 40)
          this.todayDueOrderTimer = setInterval(() => {
            let differ = this.todayDueOrderCount - this.currentTodayDueOrderCount
            if (differ > 200) {
              this.currentTodayDueOrderCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentTodayDueOrderCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentTodayDueOrderCount += 1
            } else if (differ <= 0) {
              this.currentTodayDueOrderCount = this.todayDueOrderCount
              this.todayDueOrderTimer && clearInterval(this.todayDueOrderTimer)
            }
          }, 40)
        }, 900)
        this.dueMoneyTimeout = setTimeout(() => {
          this.dueMoneyTimer = setInterval(() => {
            let differ = this.dueMoneyCount - this.currentDueMoneyCount
            if (differ > 200) {
              this.currentDueMoneyCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentDueMoneyCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentDueMoneyCount += 1
            } else if (differ <= 0) {
              this.currentDueMoneyCount = this.dueMoneyCount
              this.dueMoneyTimer && clearInterval(this.dueMoneyTimer)
            }
          }, 40)
          this.todayDueMoneyTimer = setInterval(() => {
            let differ = this.todayDueMoneyCount - this.currentTodayDueMoneyCount
            if (differ > 200) {
              this.currentTodayDueMoneyCount += 168
            } else if (differ <= 200 && differ >= 20) {
              this.currentTodayDueMoneyCount += 16
            } else if (differ > 0 && differ < 20) {
              this.currentTodayDueMoneyCount += 1
            } else if (differ <= 0) {
              this.currentTodayDueMoneyCount = this.todayDueMoneyCount
              this.todayDueMoneyTimer && clearInterval(this.todayDueMoneyTimer)
            }
          }, 40)
        }, 1200)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .data-wrapper
    position: relative

  .logo
    position: absolute
    top: 100px
    left: 50%
    transform: translateX(-50%)
    .text
      text-align: center
      font-family: 'PingFangSC-Semibold'
      font-size: 30px
      color: #ffffff

  .list-wrapper
    box-sizing: border-box
    display: flex
    align-items: center
    width: 100vw
    height: 100vh
    padding: 30px 200px
    background-image: url("./pic_bg.png")
    background-size: 100% 100%
    background-repeat: no-repeat
    background-position: center center
    .item-wrapper
      box-sizing: border-box
      width: 25%
      padding: 30px
      &:nth-child(1) .item
        transition-delay: .3s
        transform: translate3d(0, -300px, 0)
        .data
          background-image: linear-gradient(90deg, #48D5FF 0%, #0F89ED 100%)
          box-shadow:0px 0px 5px #48D5FF
          &:hover
            box-shadow:0px 0px 50px #0F89ED
      &:nth-child(2) .item
        transition-delay: .6s
        transform: translate3d(-300px, 0, 0)
        .data
          background-image: linear-gradient(90deg, #FFB51D 0%, #F16718 100%)
          box-shadow:0px 0px 5px #FFB51D
          &:hover
            box-shadow:0px 0px 50px #F16718
      &:nth-child(3) .item
        transition-delay: .9s
        transform: translate3d(0, 300px, 0)
        .data
          background-image: linear-gradient(90deg, #9EEA8F 0%, #3CD79F 100%)
          box-shadow:0px 0px 5px #9EEA8F
          &:hover
            box-shadow:0px 0px 50px #3CD79F
      &:nth-child(4) .item
        transition-delay: 1.2s
        transform: translate3d(300px, 0, 0)
        .data
          background-image: linear-gradient(90deg, #B867FF 0%, #751EF6 96%)
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
          .today
            margin-bottom: 20px
            font-family: 'DINAlternate-Bold'
            font-size: 70px
          .title
            margin-bottom: 20px
            font-size: 25px
          .content
            margin-bottom: 30px
            font-size: 25px
</style>
