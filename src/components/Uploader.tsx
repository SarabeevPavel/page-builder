import { BsFillTrashFill } from "react-icons/bs"

interface UploaderProps {
  preview: string | null
  setPreview: (newPreview: string | null) => void
  register: any
  handleUploader: (e: any) => void
}

export const Uploader: React.FC<UploaderProps> = ({
  preview,
  setPreview,
  register,
  handleUploader,
}) => {
  return (
    <div className="mb-10 w-full">
      {!preview && (
        <div className="relative group flex items-center justify-center h-12">
          <>
            <input
              type="file"
              accept="image/*"
              multiple={false}
              className="relative text-right opacity-0 z-20 cursor-pointer w-full"
              {...register("image")}
              onChange={(e) => handleUploader(e)}
            />
            <button className="button-default absolute left-0 w-full h-12 z-10 flex justify-center items-center rounded-lg text-white bg-green-500 group-hover:bg-green-900 ease-in-out duration-200">
              Add photo
            </button>
          </>
        </div>
      )}
      {preview && (
        <div className="relative flex items-center justify-center w-full ">
          <img
            src={preview}
            alt="preview"
            className="w-full relative top-0 left-0 right-0 bottom-0 object-cover h-36 z-10"
          />
          <div className="z-20 w-full h-full flex justify-center items-center bg-black/50 absolute opacity-0 hover:opacity-100 ease-in-out duration-200">
            <button
              onClick={() => setPreview(null)}
              className="w-10 h-10 p-2 rounded-full hover:bg-red-600 hover:text-white ease-in-out duration-200"
            >
              <BsFillTrashFill size={25} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
