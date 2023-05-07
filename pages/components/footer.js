import footer from "styles/footer.module.scss";

export default function Footer(){
  return (
    <>
      <footer className={footer.footer}>
        <div className={`${footer.footerTop} p-0`}>
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center">
              <div className="sm:w-9/12 lg:w-8/12 xl:w-7/12">
                <div className="py-3 sm:py-0 md:py-0">
                  <p className="m-0">Please call us at <a href="tel:[company phone]">[company phone]</a> or email us
                    to <a href="mailto:[company-email]" className="text-link">[company-email]</a> with any questions,
                    comments, or concerns.</p>
                </div>

              </div>
              <div className="w-full sm:w-3/12 md:w-4/12">
                <div className={footer.creditWrapper}>
                  <div className={`${footer.logoHolder} text-left md:text-right py-2`}>
                    <img
                      src="https://res.cloudinary.com/secure-api/image/upload/v1665995024/secure-api/Secure-api/content/images/bsyzbmzysh1fjgieix2v.png"
                      alt="secure transaction"
                      className='ml-auto'
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
        <div className={footer.footerBottom}>
          <div className="container m-auto">
            <p className="m-0"><a href="[company url]" className={footer.textLink} target="_blank">[company name].</a> All
              Rights Reserved.</p>
          </div>

        </div>
      </footer>
    </>
  )
}
