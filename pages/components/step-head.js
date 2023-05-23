import StepIndicator from "@/pages/components/step-indicator";

export default function StepHead(props){
  return (
    <div className='step-head flex items-center flex-wrap bg-slate-900 px-6 sm:px-8 pt-2 sm:pt-4 pb-2 sm:pb-4'>
      <div className='w-10/12'>
        <h2 className='text-2xl sm:text-3xl font-bold text-white'>{props.dataTitle}</h2>
      </div>

      <div className='w-2/12'>
        <StepIndicator dataStep={props.dataStep} />
      </div>

    </div>
  )
}
