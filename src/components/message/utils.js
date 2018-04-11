// COURSE,MASTER_SIGN,MASTER_QUESTION 标题前缀颜色 class map
const TITLE_PREFIX_CLASS_MAP = {
  'COURSE_ALERT': 'text-three',
  'HOMEWORK': 'text-two',
  'SYSTEM_NOTICE': 'text-four',
  'UNKNOW': 'base_color',
}

export const getTypeClazz = function (content) {
  // console.log('1',content)
  let contentTrim = content.trim()
  console.log(contentTrim)
  if (contentTrim == "课堂通知") {
    return TITLE_PREFIX_CLASS_MAP['COURSE_ALERT']

  } else {
    if (contentTrim == "作业提醒") {
      return TITLE_PREFIX_CLASS_MAP['HOMEWORK']

    } else {
      if (contentTrim == "系统通知") {
        return TITLE_PREFIX_CLASS_MAP['SYSTEM_NOTICE']

      } else {
        return TITLE_PREFIX_CLASS_MAP['UNKNOW']

      }
    }
  }

  // return TITLE_PREFIX_CLASS_MAP[content] || ''
}
