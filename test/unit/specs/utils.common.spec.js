import * as common from '@/utils/common'

describe('utils.common.spec.js', () => {
  it('should render correct contents', () => {
    expect(common.parseSecondToTime(59)).to.equal('59秒')
    expect(common.parseSecondToTime(61)).to.equal('1分1秒')
    expect(common.parseSecondToTime(600)).to.equal('10分')
    expect(common.parseSecondToTime(3600)).to.equal('1小时')
    expect(common.parseSecondToTime(3661)).to.equal('1小时1分1秒')
  })
})
