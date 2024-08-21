import { mnemonicProps } from "@/lib/utils";

const MnemonicContainer = ({ mnemonicList }: mnemonicProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <h3 className="font-semibold text-2xl">Secret Recovery Phase</h3>
      <p className="text-sm text-gray-400">Save these words in a safe place</p>
      <div className="px-4 py-6 flex gap-6 flex-wrap max-w-[600px] bg-black justify-center rounded-xl ">
        {mnemonicList.map((item, idx) => (
          <div
            className="p-4 w-28 text-center  flex gap-4 items-center "
            key={idx}
          >
            <span>{idx + 1}</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MnemonicContainer;
