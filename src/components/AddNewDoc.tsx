import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { FormContent } from './FormContent';
import { Cross1Icon } from '@radix-ui/react-icons';

export const AddNewDoctor = () => {
  return (
    <div>
      <Dialog>
        <div className="fixed bottom-10 right-10">
          <DialogTrigger asChild>
            <button className="rounded-full bg-white shadow-lg relative p-8">
              <span className="absolute max-w-[40px] top-1/2 left-1/2 w-full h-2 bg-[#22B3A7] transform -translate-x-1/2 -translate-y-1/2"></span>
              <span className="absolute max-h-[40px] top-1/2 left-1/2 w-2 h-full bg-[#22B3A7] transform -translate-x-1/2 -translate-y-1/2"></span>
            </button>
          </DialogTrigger>
        </div>
        <DialogOverlay className="fixed inset-0 bg-black opacity-80" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] min-h-[500px] rounded-xl bg-white text-black ">
          <div className="flex justify-end pt-6 pr-6">
            <DialogClose asChild>
              <button type="button">
                <Cross1Icon width="30" height="30" />
              </button>
            </DialogClose>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>
              <DialogTitle className="text-lg font-bold py-4">
                Add a new doctor
              </DialogTitle>
              <DialogDescription>
                Press save to add a new doctor to the list
              </DialogDescription>
              <div className="mt-4">
                <FormContent />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
