import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found-wrapper">
      <Image
        priority
        alt="loading-icon"
        height={96}
        sizes="96px"
        src="/rkr-icon-gray-x120.png"
        width={96}
      />
      <h1>Oops!</h1>
      <p>We can&apos;t seem to find the page you are looking for.</p>
      <br />
      <Link className="not-found-link" href="/">
        Go Back Home
      </Link>
    </div>
  )
}
