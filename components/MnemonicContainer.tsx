
type mnemonicProps = {
    mnemonicList: string[]
}

const MnemonicContainer = ({mnemonicList}: mnemonicProps ) => {
  return (
    <div className="p-2 flex gap-8 flex-wrap max-w-[600px]">
        {
            mnemonicList.map((item,idx)=>(
                <div className="p-4 w-28 text-center border rounded-lg flex gap-2 items-center justify-between" key={idx}><span>{idx+1}</span> {item}</div>
            ))
        }
    </div>
  )
}

export default MnemonicContainer