import React from 'react'

import { UserProfile } from '../lib/models'

interface CardProps {
  userProfile: UserProfile
}

const Card = React.forwardRef((props: CardProps, ref: React.ForwardedRef<any>): JSX.Element => {
  const { userProfile } = props
  const style = {
    backgroundImage: `url('/5d86b58.jpg')`,
    backgroundSize: 'cover',
  }
  return (
    <div ref={ref} className="h-64 w-full max-w-xl relative rounded-xl shadow-md" style={style}>
      <div className="flex flex-col h-full w-full p-4 justify-between text-white">
        {/* User Profile */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            {/* Username (i.e 洛水居士) */}
            <span className="text-xl font-medium whitespace-nowrap">{ userProfile.username }</span>
            {/* Level (i.e lv58) */}
            <span className="text-md">{ `Lv.${userProfile.level}` }</span>
          </div>
          {/* Uid (i.e 164635231) */}
          <span className="text-md">{ `UID: ${userProfile.uid}` }</span>
        </div>
        {/* Game stats */}
        <div className="flex flex-row gap-4">
          {/* Days Active 活跃天数 */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-2xl whitespace-nowrap">{ `${userProfile.daysActive}` }</span>
            <span className="text-xs">活跃天数</span>
          </div>
          {/* Characters 角色数量 */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-2xl whitespace-nowrap">{ `${userProfile.characterCount}` }</span>
            <span className="text-xs">角色数量</span>
          </div>
          {/* Achievements 成就达成 */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-2xl whitespace-nowrap">{ `${userProfile.achievements}` }</span>
            <span className="text-xs">成就达成</span>
          </div>
          {/* Spiral Anyss 深境螺旋 */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-2xl whitespace-nowrap">{ `${userProfile.spiralAbyss}` }</span>
            <span className="text-xs">深境螺旋</span>
          </div>
        </div>
      </div>
    </div>
  )
})


/**
 * 
 * @returns Skeleton of the Card component
 */
export const CardPulse = () => {
  return (
    <div className="h-68 w-full max-w-xl rounded-xl shadow-md">
      <div className="flex flex-col h-full w-full p-2 justify-between">
        {/* User Profile */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            {/* Username (i.e 洛水居士) */}
            <span className="h-8 w-24 bg-gray-200 rounded-md" />
            {/* Level (i.e lv58) */}
            <span className="h-4 w-8 bg-gray-200 rounded-md" />
          </div>
          {/* Uid (i.e 164635231) */}
          <span className="h-4 w-1/2 bg-gray-200 rounded-md" />
        </div>
        {/* Game stats */}
        <div className="flex flex-row gap-4">
          {/* Days Active 活跃天数 */}
          <div className="flex flex-col gap-1 items-center">
            <span className="h-8 w-20 bg-gray-200 rounded-md" />
            <span className="h-3 w-12 bg-gray-200 rounded-md" />
          </div>
          {/* Characters 角色数量 */}
          <div className="flex flex-col gap-1 items-center">
            <span className="h-8 w-20 bg-gray-200 rounded-md" />
            <span className="h-3 w-12 bg-gray-200 rounded-md" />
          </div>
          {/* Achievements 成就达成 */}
          <div className="flex flex-col gap-1 items-center">
            <span className="h-8 w-20 bg-gray-200 rounded-md" />
            <span className="h-3 w-12 bg-gray-200 rounded-md" />
          </div>
          {/* Spiral Anyss 深境螺旋 */}
          <div className="flex flex-col gap-1 items-center">
            <span className="h-8 w-20 bg-gray-200 rounded-md" />
            <span className="h-3 w-12 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

Card.displayName = 'Card'

export default Card
