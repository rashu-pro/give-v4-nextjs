import Image from "next/image"

export default function () {
  return (
    <>
      <div className="container m-auto">
        <div className="text-center pt-2 pb-3">
          <Image
            src='https://secure-api.net/resources/Secure-api/087387_main-logo-web.png'
            alt='logo'
            className='m-auto'
            width={250}
            height={100}
          />
        </div>
      </div>
    </>
  )
}
