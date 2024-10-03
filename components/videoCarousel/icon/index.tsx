import { CameraAngle } from '@/components/icons/cameraAngle'
import { CenterCamera } from '@/components/icons/centerCamera'
import { PawHeart } from '@/components/icons/pawHeart'
import { Users } from '@/components/icons/users'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  name: 'camera-angle' | 'paw-heart' | 'two-users' | 'camera-center'
  selected?: boolean
}

const iconMap = {
  'camera-angle': CameraAngle,
  'paw-heart': PawHeart,
  'two-users': Users,
  'camera-center': CenterCamera,
}

export default function Icon({ selected = false, name }: Props) {
  const iconSize = 20
  const [theme] = useTheme()

  const IconComponent = iconMap[name] || Users

  return (
    <IconComponent
      height={iconSize}
      width={iconSize}
      fill={selected ? theme.color.secondary : theme.text.primary}
    />
  )
}
