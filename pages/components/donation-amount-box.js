export default function DonationAmountBox(props){
  return (
    <>
      <button type='button'
              data-amount={props.amount}
              className='text-3xl font-bold px-3 py-4 border border-color-green-theme-50 rounded-lg text-color-green-theme w-full mb-4 hover:bg-color-green-theme-hover focus:bg-color-green-theme focus:text-white'>
        <span className="font-medium text-xl"
              style={{position:"relative",top:'-6px'}}>
          $ </span>
        {props.amount}
      </button>
    </>
  )
}
