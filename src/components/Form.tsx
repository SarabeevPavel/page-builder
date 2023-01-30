import { Select } from "./Select"
import { gaps, piecesOfCard, themes } from "../utils/rowConfig"

interface FormProps {
  onSubmit: () => void
  register: any
  errors: any
}

export const Form: React.FC<FormProps> = ({ onSubmit, register, errors }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center"
    >
      <div className="flex mb-3">
        <Select data={themes} name="theme" register={register} label="Theme" />

        <Select
          data={piecesOfCard}
          name="pcs"
          register={register}
          label="Columns (psc)"
        />

        <Select data={gaps} name="gap" register={register} label="Gap" />
      </div>
      {errors.exampleRequired && <span>This field is required</span>}
      <button
        type="submit"
        className="button-default w-full relative  p-0.5 py-3 mb-2 mr-2  overflow-hidden group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400  focus:ring-4 focus:outline-none focus:ring-pink-200 "
      >
        Add row
      </button>
    </form>
  )
}
