import React from 'react'
import { colors, spacing, fontSizes } from '../../styling'
import { isElectron } from '../../services/Platform'
import { makeStyles } from '@material-ui/styles'
import windows from '../../assets/windows.svg'
import apple from '../../assets/apple.svg'
import linux from '../../assets/linux.svg'
import rpi from '../../assets/rpi.svg'

export const RemoteHeader: React.FC<{ os?: Ios }> = ({ os }) => {
  const css = useStyles()
  let icon = linux

  if (isElectron()) return null

  switch (os) {
    case 'mac':
      icon = apple
      break
    case 'windows':
      icon = windows
      break
    case 'rpi':
      icon = rpi
      break
    case 'linux':
      icon = linux
  }

  return (
    <div className={css.remote}>
      <img className={css.icon} src={icon} />
      Remote View
    </div>
  )
}

const useStyles = makeStyles({
  remote: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: fontSizes.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
    lineHeight: `${spacing.lg}px`,
  },
  icon: {
    position: 'absolute',
    height: spacing.lg,
    right: spacing.md,
  },
})