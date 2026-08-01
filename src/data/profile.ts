const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export type Project = {
  id: string
  name: string
  href: string
  logo: string
}

export const profile = {
  name: 'xujiaen',
  email: 'xujiaen@proton.me',
  wechat: 'xujiaen3',
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
