import Image from 'next/image'

export default function Loading() {
  return (
    <div
      style={{
        alignItems: 'center',
        color: 'gray',
        display: 'flex',
        gap: '10px',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Image
        alt="loading-icon"
        height={96}
        priority
        width={96}
        style={{
          filter: 'grayscale(100%) brightness(50%)',
        }}
        src="/rkr-icon-white.png"
      />
      Run Kitty Run
      <br />
      <div
        style={{
          paddingTop: '16px',
        }}
      >
        <Image
          alt="loading-progress"
          height={60}
          priority
          width={200}
          src="/screen-loading.gif"
        />
      </div>
    </div>
  )
}
