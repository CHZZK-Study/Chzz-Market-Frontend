import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';

export const useProfileImageUploader = (
  _image: string | null,
  setImage: Dispatch<SetStateAction<string | null>>,
  file: File | null,
  setFile: Dispatch<SetStateAction<File | null>>,
  setOnMenu: Dispatch<SetStateAction<boolean>>
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertFileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('File reading failed!'));
        }
      };
      reader.onerror = () => reject(new Error('File reading failed!'));
    });
  };

  const addImage = async (newFile: File) => {
    try {
      const newImage = await convertFileToDataURL(newFile);
      setFile(newFile);
      setImage(newImage);
    } catch (error) {
      throw new Error('Error reading file!');
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFile = e.target.files[0];
    addImage(newFile);
  };

  const deleteImage = () => {
    setFile(null);
    setImage(null);
    setOnMenu(false);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return {
    file,
    fileInputRef,
    deleteImage,
    handleImage,
    handleBoxClick,
  };
};