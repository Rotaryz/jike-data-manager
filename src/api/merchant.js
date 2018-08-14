import request from 'common/js/request'

export default {
  getStatistics() {
    const url = '/api/minimerchant/statistics'
    return request.get(url)
  },
  getTodayStatistics() {
    const url = '/api/minimerchant/today-statistics'
    return request.get(url)
  }
}
