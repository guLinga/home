import { useId } from 'react'

type ArtisticNameProps = {
  text: string
  /** hero：主名称；item：项目名称；label：联系标签；contact：联系内容 */
  variant?: 'hero' | 'item' | 'label' | 'contact'
  as?: 'h1' | 'span'
}

const variantConfig = {
  hero: {
    viewBox: '0 0 360 88',
    preserveAspectRatio: 'xMidYMid meet',
    x: 180,
    y: 54,
    anchor: 'middle' as const,
    baseFrequency: '0.015 0.035',
    scale: 12,
  },
  item: {
    viewBox: '0 0 280 56',
    preserveAspectRatio: 'xMinYMid meet',
    x: 6,
    y: 36,
    anchor: 'start' as const,
    baseFrequency: '0.02 0.04',
    scale: 8,
  },
  label: {
    viewBox: '0 0 140 64',
    preserveAspectRatio: 'xMidYMid meet',
    x: 70,
    y: 42,
    anchor: 'middle' as const,
    baseFrequency: '0.02 0.04',
    scale: 8,
  },
  contact: {
    viewBox: '0 0 360 64',
    preserveAspectRatio: 'xMidYMid meet',
    x: 180,
    y: 42,
    anchor: 'middle' as const,
    baseFrequency: '0.015 0.035',
    scale: 6,
  },
}

/** 单行扭曲艺术字，不重叠，视觉上不易直接辨认 */
export function ArtisticName({
  text,
  variant = 'hero',
  as = 'span',
}: ArtisticNameProps) {
  const reactId = useId().replace(/:/g, '')
  const warpId = `name-warp-${reactId}`
  const Tag = as
  const config = variantConfig[variant]

  return (
    <Tag
      className={`name-art name-art--${variant}`}
      aria-hidden="true"
    >
      <svg
        className="name-art-svg"
        viewBox={config.viewBox}
        preserveAspectRatio={config.preserveAspectRatio}
        role="presentation"
      >
        <defs>
          <filter
            id={warpId}
            x="-10%"
            y="-35%"
            width="120%"
            height="170%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={config.baseFrequency}
              numOctaves="2"
              seed={text.length * 3 + 7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={config.scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <text
          className="name-art-core"
          x={config.x}
          y={config.y}
          textAnchor={config.anchor}
          filter={`url(#${warpId})`}
        >
          {text}
        </text>
      </svg>
    </Tag>
  )
}
