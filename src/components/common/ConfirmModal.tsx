import { ReactNode } from "react";
import Button from "./Button";

interface ConfirmModalProps {
  close: () => void
  title: string;
  description: string
  children: ReactNode
}

const ConfirmModal = ({ close, title, description, children }: ConfirmModalProps) => {
  return (
    <div className='absolute inset-0 bg-black/30' onClick={close}>
      <div className='flex items-center justify-center w-full h-full'>
        <div onClick={(e) => e.stopPropagation()} className='flex flex-col w-2/5 gap-3 px-8 py-6 bg-white rounded-lg sm:text-body1 text-body2'>
          <h3 className="text-heading3">{title}</h3>
          <p className='text-body2'>{description}</p>
          <div className="flex justify-between w-full gap-3">
            <Button type='button' onClick={close} className='w-full' color='white'>
              취소
            </Button>
            {children}
          </div >
        </div >
      </div >
    </div >
  );
}

export default ConfirmModal;
