const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export type Project = {
  id: string
  name: string
  href: string
  logo: string
}

/** 一则自我介绍；可继续往 about 数组里加卡片 */
export type AboutCard = {
  paragraphs: string[]
}

export const profile = {
  name: 'xujiaen',
  email: 'xujiaen@proton.me',
  wechat: 'xujiaen3',
  about: [
    {
      paragraphs: [
        '人类每月表达欲的总和有多少TB？\n其中我的 可忽略不计',
      ],
    },
    {
      paragraphs: [
        '我的好恶请你忽略不计\n我颤动的双唇紧闭\n那高谈阔论里的语病\n能守住发作前的血腥',
      ],
    },
    {
      paragraphs: [
        '我的存在请你忽略不计\n除非你愿随我离群索居\n我直视你迟疑的眼睛\n你别看我啊 我理解你',
      ],
    },
    {
      paragraphs: [
        '我的喜悲请你忽略不计\n像此刻天上飘浮烟云\n我们一起踏上高山草地\n饱览吧造物者良苦的用心',
      ],
    },
    {
      paragraphs: [
        '我的名字请你忽略不计\n替我掸掉失了焦的毁誉\n我直视你眨巴的眼睛\n你别看我啊 我就是你',
      ],
    },
  ] satisfies AboutCard[],
}

export const projects: Project[] = [
  {
    id: 'k-vault',
    name: '文件托管',
    href: 'https://k-vault-7u1.pages.dev/',
    logo: asset('logos/k-vault.ico'),
  },
  {
    id: 'marriage',
    name: '资料卡片',
    href: 'https://marriage.1cor1514.site/',
    logo: asset('logos/marriage.png'),
  },
  {
    id: 'meeting',
    name: '会议',
    href: 'https://meeting.1cor1514.site/',
    logo: asset('logos/meeting.svg'),
  },
  {
    id: 'bookmark',
    name: '书签',
    href: 'http://bookmark.1cor1514.site/',
    logo: asset('logos/bookmark.png'),
  },
  {
    id: 'attendance',
    name: '统计',
    href: 'https://statistics.1cor1514.site/attendance/',
    logo: asset('logos/stats.png'),
  },
  {
    id: 'canaan',
    name: '迦南书简',
    href: 'https://canaan.1cor1514.site/',
    logo: asset('logos/canaan.png'),
  },
]
