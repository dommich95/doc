import { DefaultApi, Doctor } from '@/API';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import {
  Cross1Icon,
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { FormContent } from './FormContent';

const api = new DefaultApi();

const Controls = ({
  doctor,
  onEdit,
  onDelete,
}: {
  doctor: Doctor;
  onEdit: (editedDoctor: Doctor) => void;
  onDelete: () => void;
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <div className="absolute top-3 right-6 w-[30px] h-[30px] rounded-full bg-[#22B3A7] flex items-center justify-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button type="button">
              <DotsVerticalIcon color="white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="py-1 w-auto h-auto px-1 rounded-md bg-white text-black">
              <DropdownMenuItem className="hover:bg-gray-200 rounded-md">
                <button
                  type="button"
                  className=" flex gap-2 mr-3 ml-1  items-center"
                  onClick={() => setEditDialogOpen(true)}
                >
                  <Pencil1Icon />
                  <p>Edit</p>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-200 rounded-md">
                <button
                  type="button"
                  className=" flex gap-2 mr-3 ml-1 items-center"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <TrashIcon />
                  <p>Delete</p>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogTrigger asChild />
        <DialogPortal>
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
                  Edit Profile
                </DialogTitle>
                <DialogDescription>
                  To complete the changes, please save.
                </DialogDescription>
                <div className="mt-4">
                  <FormContent doctor={doctor} onUpdate={onEdit} />
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger asChild />
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black opacity-80" />
          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[350px] max-w-[400px] min-h-[280px] rounded-xl bg-white text-black ">
            <div className="flex justify-end pt-6 pr-6">
              <DialogClose asChild>
                <button type="button">
                  <Cross1Icon width="30px" height="30px" />
                </button>
              </DialogClose>
            </div>
            <div className="text-center px-6">
              <DialogTitle className="text-2xl font-bold py-4">
                Delete Profile
              </DialogTitle>
              <DialogDescription>
                Are you sure that you want to delete this profile?
              </DialogDescription>
            </div>

            <div className="mt-14 flex gap-6 justify-center">
              <DialogClose asChild>
                <button
                  type="button"
                  className="w-auto h-auto min-w-[150px] py-1 px-4 rounded-lg hover:bg-[#22B3A7] hover:text-white "
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="button"
                className="w-auto h-auto min-w-[150px] rounded-lg bg-[#344597] text-white hover:bg-red-600"
                onClick={() => {
                  api
                    .apiDoctorsIdDelete({ id: doctor.id as number })
                    .finally(() => {
                      onDelete();
                      setDeleteDialogOpen(false);
                    })
                    .catch(error => {
                      alert(error);
                    });
                }}
              >
                Delete
              </button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};

export default function Card({
  doctor,
  onEdit,
  onDelete,
}: {
  doctor: Doctor;
  onEdit: (editedDoctor: Doctor) => void;
  onDelete: () => void;
}) {
  return (
    <div className="relative">
      <div className="min-w-auto min-h-10 shadow-gray-400 shadow-md drop-shadow-md relative  m-4 pl-8 pt-4 pb-6 rounded-md bg-white text-black">
        <div>
          <h3 className="text-xl  pt-10 pb-5 font-bold">{doctor.name}</h3>
          <div className="mb-4">
            <p className="text-lg font-bold">Contact</p>
            <ul>
              <li>
                <p>{doctor.phone}</p>
              </li>
              <li>
                <p>{doctor.email}</p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold">Address</p>
            <ul>
              <li>
                <p>{doctor.street}</p>
              </li>
              <li>
                <p>{doctor.state}</p>
              </li>
              <li>
                <p>{doctor.zip}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Controls doctor={doctor} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
