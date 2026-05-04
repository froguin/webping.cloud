import Image from 'next/image'

export interface CloudProviderLogoProps {
  providerKey: string
  providerName: string
  className?: string
  width: string
}

export function CloudProviderLogo(props: CloudProviderLogoProps): JSX.Element {
  const w = parseInt(props.width, 10) || 20
  return (
    <Image
      width={w}
      height={w}
      className={`inline ${props.className}`}
      src={`/images/provider/${props.providerKey}.svg`}
      title={props.providerName}
      alt={props.providerName}
    />
  )
}
