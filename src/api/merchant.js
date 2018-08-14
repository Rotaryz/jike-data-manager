import request from 'common/js/request'

export default {
  getStatistics() {
    const url = '/api/minimerchant/statistics'
    return request.get(url)
  }
}
