import Image from "next/image";
import {useState} from "react";
import cardValidator from "card-validator";
import formatCreditCardNumber from "@/utils/formatCreditCardNumber";
import creditcardutils from "creditcardutils";
import numberFormat from "@/utils/utils";
import Select from "react-select";

import alertStyle from "styles/alert.module.scss"
import btnStyle from "styles/btn.module.scss"
import checkboxStyle from "styles/checkbox.module.scss"
import StepHead from "@/pages/components/step-head";
import ImageProtection from "public/protection.png";
import LeftIcon from "public/left.png";
import ImageLeftWhiteIcon from "public/left-white-24.png";

export default function MainBody() {
  const [step, setStep] = useState(1);
  const [invalidInputs, setInvalidInputs] = useState(0);
  const [firstInvalidField, setFirstInvalidField] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorFields, setErrorFields] = useState({});
  const [cause, setCause] = useState(null);
  const [causeElement, setCauseElement] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  const [note, setNote] = useState('');
  const [value, setValue] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  // CARD STATES
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('unknown');
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [isExpirationValid, setIsExpirationValid] = useState(false);
  const [cvc, setCvc] = useState('');
  const [isCvvValid, setIsCvvValid] = useState(false);
  const [cvcSize, setCvcSize] = useState(3);
  const [cardHolderName, setCardHolderName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [focus, setFocus] = useState('');

  const [isModal, setIsModal] = useState(false);

  const causeOptions = [
    {value: 'General Operation', label: 'General Operation'},
    {value: 'Membership Fee', label: 'Membership Fee'},
    {value: 'Zakat', label: 'Zakat'},
    {value: 'Construction', label: 'Construction'}
  ];

  const handleCauseChange = (cause) => {
    setCause(cause);
    setCauseElement(document.getElementById('causeElement'));
  }

  const handleAmountChange = (event) => {
    let amount = event.currentTarget.getAttribute('data-amount');
    setDonationAmount(amount);
    errors.donationAmount = false;
  }

  const handleIsRecurringCheckbox = (event) => {
    if(isRecurring){
      setIsRecurring(false);
    }else{
      setIsRecurring(true);
    }

  }

  const handleCardNumberChange = (event) => {
    const formattedNumber = formatCreditCardNumber(event.target.value.replace(/\D/g, ''));
    setCardNumber(formattedNumber);
    const isCardNumberValid = cardValidator.number(event.target.value);

    if(isCardNumberValid.card) {
      setCardType(isCardNumberValid.card.type);
      setCvcSize(isCardNumberValid.card.code.size);
    }
    errors.cardNumber = false;
    console.log('card type:', cardType);
  };

  const handleCardHolderNameChange = (event) => {
    setCardHolderName(event.target.value);
    errors.cardholderName = false;
  }

  const handleExpiryDateChange = (event) => {
    const formattedString = creditcardutils.formatCardExpiry(event.target.value);
    setExpiryDate(formattedString);
    let isValid = cardValidator.expirationDate(formattedString);
    setIsExpirationValid(isValid.isValid);
    errors.expiryDate = false;
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  }

  const handleCVCChange = (event) => {
    let str = event.target.value;
    str = numberFormat(str);
    setIsCvvValid(cardValidator.cvv(event.target.value, cvcSize));
    setCvc(str);
    errors.cvc = false;
  }

  const handleZipCodeChange = (event) => {
    let zipCode = event.target.value;
    setZipCode(zipCode);
    errors.zipCode = false;
  }

  const handleNext = () => {
    if(step>3) return;
    if(stepValidation(step)){
      setStep(step + 1);
    }
  }
  const handlePrev = () => {
    setStep(step - 1);
  }

  const handleSubmit = () => {
    if(stepValidation(step)){
      setIsModal(true);
    }
  }

  const stepValidation = (stepNumber) => {
    let stepErrors = {};

    switch (stepNumber){
      case 1:
        if(!cause){
          stepErrors.cause = "Select a cause";
        }

        if(!donationAmount){
          stepErrors.donationAmount = "Amount is required";
        }else if(isNaN(donationAmount)){
          stepErrors.donationAmount = "Input a valid number"
        }

        break

      case 3:
        if(!cardNumber){
          stepErrors.cardNumber = "Invalid Card number";
        }

        if(!isExpirationValid){
          stepErrors.expiryDate = "Invalid expiry date";
        }

        if(!isCvvValid.isValid){
          stepErrors.cvc = "Invalid CVC";
        }
        if(!cardHolderName || cardHolderName.length<6){
          stepErrors.cardholderName = "Your Name must have 6 characters atleast";
        }
        if(!zipCode || zipCode.length<5){
          stepErrors.zipCode = "Invalid Zipcode";
        }
        break;

      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  const inputClasses = `input-field shadow-inner-custom appearance-none border border-gray-input rounded w-full py-3 sm:py-3 px-4 text-lg sm:text-xl text-gray-700 leading-tight focus:outline-gray-900 focus:shadow-outline`;

  const onModalClose = () => {
    setIsModal(false);
  }

  return (
    <>
      <div className='pt-3 sm:pt-4'>
        <div className='container m-auto pb-12 md:pb-20'>
          <div className='max-w-2xl m-auto bg-white'>
            <div className='step-box'>

              {step === 1 && (
                <>
                  {/*STEP HEAD*/}
                  <StepHead dataTitle={'CHOOSE AMOUNT'} dataStep={step} />

                  {/*STEP BODY*/}
                  <div className='step-body px-6 sm:px-8 py-4'>
                    <div className='form-group mb-4'>
                      <label className='font-bold text-2xl mb-3 block'>Donate to: </label>

                      <Select
                        options={causeOptions}
                        value={cause}
                        onChange={handleCauseChange}
                        placeholder={'Select Cause'}
                        className={`input-field select-field ${errors.cause?'invalid':''}`}
                        id='causeElement'
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor:'#e1e1e1',
                            height:'60px',
                            fontSize:'1.2rem',
                            fontWeight:'600',
                            boxShadow:'inset 0 0.08em 0.4em rgba(0, 0, 0, 0.15)'
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary25: 'rgb(226 232 240)',
                            primary: '#111827',
                          },
                        })}
                      ></Select>

                      {errors.cause && <p style={{color:"#E91E63"}}>{errors.cause}</p>}
                    </div>

                    {/*DONATION AMOUNT*/}
                    <div className='form-group mb-4'>
                      <label className='font-bold text-2xl mb-3 block'>Donation Amount: </label>
                      <div className='flex flex-wrap' style={{margin: '0 -.5rem'}}>
                        <div className='w-1/3 sm:w-1/4  px-2'>
                          <button type='button'
                                  onClick={handleAmountChange}
                                  data-amount={20}
                                  className={`text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-3 sm:py-4 border border-color-green-theme-50 rounded-lg text-color-green-theme w-full mb-4 hover:bg-color-green-theme-hover focus:bg-color-green-theme focus:text-white`}>
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
                      <div className="relative mt-2 md:w-12/12">

                        <div style={{position:"relative"}}>
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 text-xl sm:text-2xl font-bold">$</span>
                          </div>
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className={`${errors.donationAmount?'invalid':''} input-field shadow-inner-custom appearance-none border rounded w-full pl-9 pr-7 py-3 sm:py-3 text-2xl sm:text-3xl font-bold text-gray-700 leading-tight focus:outline-gray-900 focus:shadow-outline`}
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            autoFocus={errors.donationAmount}
                            placeholder="0.00"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <span className='pr-2'>USD</span>
                          </div>
                        </div>
                        {errors.donationAmount && <p style={{color:"#E91E63"}}>{errors.donationAmount}</p>}
                      </div>


                    </div>

                    <div className='bg-blue-100 px-4 py-4 mb-4'>
                      <div className='form-group'>
                        <div className={`${checkboxStyle.checkboxHolder} flex`}>
                          <div className='mr-2'>
                            <input
                              type="checkbox"
                              id="recurring-check"
                              className={`${checkboxStyle.checkboxLg} border border-gray-400 rounded-md`}
                              checked={isRecurring}
                              onChange={handleIsRecurringCheckbox}
                            />
                          </div>

                          <label htmlFor="recurring-check" className='text-xl font-semibold'>Make this donation recurring?</label>
                        </div>
                      </div>

                      <div className={`flex pt-2 ${isRecurring?'':'hidden'}`}>
                        <div className='form-group mb-4 sm:mb-0 w-full sm:w-6/12 pr-0 sm:pr-2'>
                          <label className='font-semibold text-xl mb-1 block'>Recurring By:</label>
                          <input
                            type='text'
                            className={inputClasses}
                          />

                        </div>

                        <div className='form-group mb-4 sm:mb-0 w-full sm:w-6/12 pl-0 sm:pl-2'>
                          <label className='font-semibold text-xl mb-1 block'>Recurring Duration:</label>
                          <input
                            type='text'
                            className={inputClasses}
                          />

                        </div>
                      </div>
                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-bold text-2xl mb-3 block'>Note </label>
                      <textarea
                        className='shadow-inner-custom appearance-none border rounded w-full py-4 px-4 text-2xl text-gray-700 leading-tight focus:outline-gray-900 focus:shadow-outline'
                        onChange={handleNoteChange}
                        value={note}
                      />

                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  {/*STEP HEAD*/}
                  <StepHead dataTitle={'Your Information'} dataStep={step} />

                  {/*STEP BODY*/}
                  <div className='step-body px-6 sm:px-8 py-4'>
                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Street Address:</label>
                      <input
                        type='text'
                        className={inputClasses}
                      />

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>State:</label>
                      <input
                        type='text'
                        className={inputClasses}
                      />

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>City:</label>
                      <input
                        type='text'
                        className={inputClasses}
                      />

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Country:</label>
                      <input
                        type='text'
                        className={inputClasses}
                      />

                    </div>

                    <div className='form-group mb-4'>
                      <label className='font-semibold text-xl mb-1 block'>Zipcode:</label>
                      <input
                        type='text'
                        className={inputClasses}
                      />

                    </div>
                  </div>
                </>
              )}

             gir {step === 3 && (
                <>
                  {/*STEP HEAD*/}
                  <StepHead dataTitle={'Payment Details'} dataStep={step} />

                  {/*STEP BODY*/}
                  <div className='step-body px-6 sm:px-8 py-4 flex flex-wrap'>
                    <div className='form-group mb-4 w-full'>
                      <label className='font-semibold text-xl mb-1 block'>Card Number:</label>
                      <input
                        type="text"
                        className={inputClasses}
                        name="number"
                        placeholder="Card Number"
                        maxLength={19}
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                      {errors.cardNumber && <p style={{color:"#E91E63"}}>{errors.cardNumber}</p>}
                    </div>

                    <div className='form-group mb-4 w-full sm:w-6/12 pr-0 sm:pr-2'>
                      <label className='font-semibold text-xl mb-1 block'>Expiry Date:</label>
                      <input
                        type='text'
                        className={inputClasses}
                        name="expiryDate"
                        placeholder='mm/yy'
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                      />

                      {errors.expiryDate && <p style={{color:"#E91E63"}}>{errors.expiryDate}</p>}

                    </div>

                    <div className='form-group mb-4 w-full sm:w-6/12 pl-0 sm:pl-2'>
                      <label className='font-semibold text-xl mb-1 block'>CVC:</label>
                      <input
                        type='text'
                        className={inputClasses}
                        maxLength={cvcSize}
                        value={cvc}
                        onChange={handleCVCChange}
                      />

                      {errors.cvc && <p style={{color:"#E91E63"}}>{errors.cvc}</p>}

                    </div>

                    <div className='form-group mb-4 w-full'>
                      <label className='font-semibold text-xl mb-1 block'>Cardholder Name:</label>
                      <input
                        type='text'
                        className={inputClasses}
                        name="cardHolderName"
                        minLength={6}
                        value={cardHolderName}
                        onChange={handleCardHolderNameChange}
                      />

                      {errors.cardholderName && <p style={{color:"#E91E63"}}>{errors.cardholderName}</p>}

                    </div>

                    <div className='form-group mb-4 w-full md:w-6/12'>
                      <label className='font-semibold text-xl mb-1 block'>Zipcode:</label>
                      <input
                        type='text'
                        className={inputClasses}
                        value={zipCode}
                        onChange={handleZipCodeChange}
                      />

                      {errors.zipCode && <p style={{color:"#E91E63"}}>{errors.zipCode}</p>}

                    </div>
                  </div>
                </>
              )}


              {/*STEP FOOT*/}
              {step > 2 ? (
                <>
                  <div className="step-foot py-4 border-t border-gray-200 px-3 px-md-5 py-2 py-md-3">
                    <div className={`${alertStyle.alert} ${alertStyle.alertPrimary}`}>
                      Please note that you will see a charge from <strong>[company name]</strong> on your credit card
                      statement.
                      [company name] is a tax exempt organization under section 501(c)(3) of Internal Revenue
                      Code.<strong>Employer Identification Number 46-5035493.</strong>
                    </div>

                    <div className={`${alertStyle.alert} ${alertStyle.alertSecondary}`}>
                      <div className={`${checkboxStyle.checkboxHolder} flex items-start`}>
                        <div>
                          <input type="checkbox" id="cover-fees" className={`${checkboxStyle.checkboxLg}`} />
                        </div>

                        <label htmlFor="cover-fees" className="pl-2">I want to make an additional donation to cover
                          online processing fees, so that my entire contribution goes to [company name]. ($5.50)</label>
                      </div>
                    </div>

                    <div className="btn-holder text-center position-relative mt-5">
                      <div className="row justify-content-center">
                        <div className="col-md-8">
                          <button
                            type="button"
                            className={`${btnStyle.btnSuccessCustom} w-full sm:w-9/12 flex align-center justify-center text-xl mx-auto border rounded-md ls-1 py-3 text-uppercase px-5 w-100`}
                            id="btn-submit"
                            onClick={handleSubmit}
                          >
                            <Image
                              src={ImageProtection}
                              alt="verified"
                              width={22}
                              height={22}
                              style={{position: 'relative', top:'4px'}}
                            />
                              <span className="ps-2">DONATE $<span className="amount amount-js">{donationAmount}</span> </span>
                          </button>
                        </div>

                      </div>

                      <div className="pt-3 mt-4 border-t border-gray-200">
                        <button
                          type="button"
                          className={`${btnStyle.btnNavigation} btn bg-transparent font-semibold rounded-md pr-4 pl-2 py-1 hover:bg-slate-200`}
                          onClick={handlePrev}
                        >
                          <Image
                            src={LeftIcon}
                            alt='back'
                            className={`${btnStyle.imgLeft}`}
                            width={24}
                            height={24}
                          ></Image>
                          <span>BACK</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ):(
                <>
                <div className='step-foot px-8 py-4 border-t border-gray-200 text-right'>
              {step > 1 && (
                <button type='button'
                onClick={handlePrev}
                className='text-xl px-6 sm:px-10 py-3 sm:py-4 rounded-md bg-slate-800 text-white font-semibold mr-5 hover:bg-slate-900'>
                <Image src={ImageLeftWhiteIcon}
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
                className='text-xl px-6 sm:px-10 py-3 sm:py-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-800'>
                NEXT
                <Image src='/right_white.png'
                className='inline-block'
                style={{position: 'relative', top: '-2px'}}
                alt='prev'
                width={20}
                height={20}/>
                </button>
                </div>
                </>
                )}

            </div>
          </div>

          <div className="secure-text mt-3 mb-3 sm:mb-3 sm:mb-4">
            <p className="m-0 text-center opacity-75 text-xl"
               style={{color: '#00AF74'}}>
              <Image src='/verified-green-32.png'
                     className='inline-block pr-1'
                     style={{maxHeight: '20px', position: 'relative', top: '-3px'}}
                     alt='secured'
                     width={20}
                     height={20}
              />
                Secured by
              <Image src='/sectigo-store-logo.png'
                     className='inline-block pl-1'
                     style={{maxHeight: '20px'}}
                     alt='secured by sectigo'
                     width={80}
                     height={20}
              />
            </p>
          </div>
        </div>
      </div>

      {/*CONFIRMATION MODAL*/}
      <div
        className={`${isModal?'block':'hidden'} modal-custom bg-gray-500 bg-opacity-70 min-h-full fixed h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center`}

      >
          <div
            className={`bg-white rounded w-5/12`}
          >
            {/*HEADER*/}
            <div
              className={`py-3 px-6 border-b border-gray-200`}
            >
              <h2 className={`text-xl font-bold uppercase`}>Payment Confirmation</h2>
            </div>

            {/*BODY*/}
            <div
              className={`pt-4 pb-6 px-6`}
            >
              <p className="text-xl font-bold text-blue-700">You are about to authorize ${donationAmount}</p>
              <p className="text-base mt-4">Donation for: <span className="font-semibold"> {cause && cause.label}</span></p>
            </div>

            {/*FOOTER*/}
            <div
              className={`py-4 px-6 flex justify-end bg-gray-50 rounded-md`}
            >
              <button
                onClick={onModalClose}
                className={`text-base px-6 sm:px-5 py-3 mr-4 sm:py-3 bg-slate-300 uppercase rounded-md font-semibold hover:bg-slate-400`}
              >
                Cancel
              </button>

              <button
                onClick={onModalClose}
                className={`text-base px-6 sm:px-5 py-3 sm:py-3 bg-blue-600 text-white uppercase rounded-md font-semibold hover:bg-blue-800`}
              >
              Confirm
              </button>
            </div>
          </div>
      </div>
    </>
  )
}
