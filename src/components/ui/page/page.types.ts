import { CSSProperties, ComponentPropsWithoutRef } from 'react'

type OwnPageProps = {
  marginTop?: CSSProperties['marginTop']
}

export type PageProps = OwnPageProps & Omit<ComponentPropsWithoutRef<'div'>, keyof OwnPageProps>
