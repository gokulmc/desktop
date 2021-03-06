import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import { Icon } from '../../components/Icon'

export type RestartButtonProps = {
  connection?: IConnection
  disabled?: boolean
}

export const RestartButton: React.FC<RestartButtonProps> = ({ disabled = false, connection }) => {
  if (!connection || connection.connecting || connection.pid) return null
  return (
    <Tooltip title="Re-connect">
      <span>
        <IconButton
          disabled={disabled}
          color="primary"
          onClick={() => console.warn("unimplemented emit('service/restart', connection)")}
        >
          <Icon name="redo" size="md" weight="regular" fixedWidth />
        </IconButton>
      </span>
    </Tooltip>
  )
}
