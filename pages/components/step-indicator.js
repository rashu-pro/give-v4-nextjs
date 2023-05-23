import stepStyle from "@/styles/step.module.scss";

export default function StepIndicator(props){
  return(
    <div
      className="step-indicator flex align-middle justify-end mb-2 sm:mb-2 md:mb-0"
    >
      <div className={stepStyle.stepListWrapper}>
        <div className={`${stepStyle.stepListSingle} ${props.dataStep===1?stepStyle.active:''}`}>
          <div className={stepStyle.stepMark}></div>
        </div>

        <div className={`${stepStyle.stepListSingle} ${props.dataStep===2?stepStyle.active:''}`}>
          <div className={stepStyle.stepMark}></div>
        </div>

        <div className={`${stepStyle.stepListSingle} ${props.dataStep===3?stepStyle.active:''}`}>
          <div className={stepStyle.stepMark}></div>
        </div>
      </div>
    </div>
  )
}
