import DonationAmountBox from "@/pages/components/donation-amount-box";
import Image from "next/image";
import {useState} from "react";
import 'react-credit-cards/es/styles-compiled.css'

export default function MainBody() {
  const [step, setStep] = useState(1);
  const [donationAmount, setdonationAmount] = useState(0);
  const [value, setValue] = useState('');

  const handleAmountChange = (event) => {
    let amount = event.currentTarget.getAttribute('data-amount');
    setdonationAmount(amount);
  }
  const handleNext = () => {
    setStep(step + 1);
  }
  const handlePrev = () => {
    setStep(step - 1);
  }

  return (
    <>
      <div className='pt-3 sm:pt-4'>
        <div className='container m-auto pb-12'>
          <div className='max-w-4xl m-auto bg-white'>
            <div className='step-box'>

              {step === 1 && (
                <>
                  {/*STEP HEAD*/}
                  <div className='step-head bg-slate-900 px-6 sm:px-8 pt-2 sm:pt-4 pb-2 sm:pb-4'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-white'>CHOOSE AMOUNT</h2>
                  </div>

                  {/*STEP BODY*/}
                  <div className='step-body px-6 sm:px-8 py-4'>
                    <div className='form-group mb-4'>
                      <label className='font-bold text-2xl mb-3 block'>Donate to: </label>
                      <select className='shadow border rounded w-full py-3 sm:py-4 px-4 text-xl sm:text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <option value=''>Choose a Cause</option>
                        <option value='general operation'>General Operations</option>
                        <option value='membership-fee'>Membership Fee</option>
                      </select>
                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-bold text-2xl mb-3 block'>Donation Amount: </label>
                      <div className='flex flex-wrap' style={{margin: '0 -.5rem'}}>
                        <div className='w-1/3 sm:w-1/4  px-2'>
                          <button type='button'
                                  onClick={handleAmountChange}
                                  data-amount={20}
                                  className={'text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-3 sm:py-4 border border-color-green-theme-50 rounded-lg text-color-green-theme w-full mb-4 hover:bg-color-green-theme-hover focus:bg-color-green-theme focus:text-white'}>
                        <span className="font-medium text-xl"
                              style={{position: "relative", top: '-6px'}}>$</span>
                            20
                          </button>
                        </div>

                        <div className='w-1/3 sm:w-1/4 px-2'>
                          <button type='button'
                                  onClick={handleAmountChange}
                                  data-amount={50}
                                  className={'text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-3 sm:py-4 border border-color-green-theme-50 rounded-lg text-color-green-theme w-full mb-4 hover:bg-color-green-theme-hover focus:bg-color-green-theme focus:text-white'}>
                        <span className="font-medium text-xl"
                              style={{position: "relative", top: '-6px'}}>$</span>
                            50
                          </button>
                        </div>

                        <div className='w-1/3 sm:w-1/4 px-2'>
                          <button type='button'
                                  onClick={handleAmountChange}
                                  data-amount={75}
                                  className={'text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-3 sm:py-4 border border-color-green-theme-50 rounded-lg text-color-green-theme w-full mb-4 hover:bg-color-green-theme-hover focus:bg-color-green-theme focus:text-white'}>
                        <span className="font-medium text-xl"
                              style={{position: "relative", top: '-6px'}}>$</span>
                            75
                          </button>
                        </div>

                        <div className='w-1/3 sm:w-1/4 px-2'>
                          <button type='button'
                                  onClick={handleAmountChange}
                                  data-amount={100}
                                  className={'text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-3 sm:py-4 border border-color-green-theme-50 rounded-lg text-color-green-theme w-full mb-4 hover:bg-color-green-theme-hover focus:bg-color-green-theme focus:text-white'}>
                        <span className="font-medium text-xl"
                              style={{position: "relative", top: '-6px'}}>$</span>
                            100
                          </button>
                        </div>

                        <div className='w-1/3 sm:w-1/4 px-2'>
                          <button type='button'
                                  onClick={handleAmountChange}
                                  data-amount={150}
                                  className={'text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-3 sm:py-4 border border-color-green-theme-50 rounded-lg text-color-green-theme w-full mb-4 hover:bg-color-green-theme-hover focus:bg-color-green-theme focus:text-white'}>
                        <span className="font-medium text-xl"
                              style={{position: "relative", top: '-6px'}}>$</span>
                            150
                          </button>
                        </div>

                        <div className='w-1/3 sm:w-1/4 px-2'>
                          <button type='button'
                                  onClick={handleAmountChange}
                                  data-amount={200}
                                  className={'text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-3 sm:py-4 border border-color-green-theme-50 rounded-lg text-color-green-theme w-full mb-4 hover:bg-color-green-theme-hover focus:bg-color-green-theme focus:text-white'}>
                        <span className="font-medium text-xl"
                              style={{position: "relative", top: '-6px'}}>$</span>
                            200
                          </button>
                        </div>
                      </div>

                      {/*OTHER AMOUNT*/}
                      <div className="relative mt-2 md:w-3/5">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 text-xl sm:text-2xl font-bold">$</span>
                        </div>
                        <input type="text" name="price" id="price"
                               className="shadow appearance-none border rounded w-full pl-9 pr-7 py-3 sm:py-4 text-2xl sm:text-3xl font-bold text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               value={donationAmount}
                               onChange={(e) => setdonationAmount(e.target.value)}
                               placeholder="0.00"/>
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">Currency</label>
                          <select id="currency" name="currency"
                                  className="h-full appearance-none rounded-md border-0 bg-transparent py-0 pl-2 pr-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                            <option>USD</option>
                            <option>CAD</option>
                            <option>EUR</option>
                          </select>
                        </div>
                      </div>


                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-bold text-2xl mb-3 block'>Note </label>
                      <textarea
                        className='shadow appearance-none border rounded w-full py-4 px-4 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></textarea>

                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  {/*STEP HEAD*/}
                  <div className='step-head bg-slate-900 px-6 sm:px-8 pt-2 sm:pt-4 pb-2 sm:pb-4'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-white'>Your Information</h2>
                  </div>

                  {/*STEP BODY*/}
                  <div className='step-body px-6 sm:px-8 py-4'>
                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Street Address:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>State:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>City:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Country:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Zipcode:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  {/*STEP HEAD*/}
                  <div className='step-head bg-slate-900 px-6 sm:px-8 pt-2 sm:pt-4 pb-2 sm:pb-4'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-white'>Payment Details</h2>
                  </div>

                  {/*STEP BODY*/}
                  <div className='step-body px-6 sm:px-8 py-4'>
                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Card Number:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Expiry Month:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>City:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Country:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Zipcode:</label>
                      <input type='text'
                             className='shadow appearance-none border rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                    </div>
                  </div>
                </>
              )}


              {/*STEP FOOT*/}
              <div className='step-foot px-8 py-4 border-t border-gray-200 text-right'>
                {step > 1 && (
                  <button type='button'
                          onClick={handlePrev}
                          className='text-xl px-6 sm:px-10 py-3 sm:py-4 bg-slate-800 text-white font-semibold mr-5 hover:bg-slate-900'>
                    <Image src='/left-white-24.png'
                           className='inline-block'
                           style={{position: 'relative', top: '-2px'}}
                           alt='prev'
                           width={20}
                           height={20}/>
                    PREV
                  </button>
                )}

                <button type='button'
                        onClick={handleNext}
                        className='text-xl px-6 sm:px-10 py-3 sm:py-4 bg-blue-700 text-white font-semibold hover:bg-blue-800'>
                  NEXT
                  <Image src='/right_white.png'
                         className='inline-block'
                         style={{position: 'relative', top: '-2px'}}
                         alt='prev'
                         width={20}
                         height={20}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
