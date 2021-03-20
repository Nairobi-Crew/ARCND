import React from 'react'
import '../../common/styles/common.scss'
import './Button.scss'

interface IButtonProps {
  type?:'button'|'reset'|'submit';
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  children?:any;
}

export default function Button({type, onClick, children}:IButtonProps) {
  return (
    <button className='button' type={type} onClick={onClick}>
      {children}
    </button>
  )
}
