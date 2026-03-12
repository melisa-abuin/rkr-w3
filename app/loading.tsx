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
        priority
        alt="loading-icon"
        height={96}
        src="/rkr-icon-gray.png"
        width={96}
      />
      Run Kitty Run
      <br />
      <div
        style={{
          paddingTop: '16px',
        }}
      >
        <Image
          priority
          alt="loading-progress"
          height={60}
          src="/screen-loading.gif"
          width={200}
        />
      </div>
    </div>
  )
}
