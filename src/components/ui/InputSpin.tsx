import { Dimensions } from "react-native";
import InputSpinner from "react-native-input-spinner";

type Props = {
    guests: number;
    onSelectSpin: (guests: number) => void;
    mainGuests?: number;
    maxGuests?: number;
    step: number;
    colorMax?: string;
    colorMin?: string;
};

const InputSpin = ({guests, onSelectSpin, mainGuests, maxGuests, step, colorMax, colorMin}: Props) =>{
    const {width, height} = Dimensions.get("window")
   
    return (
        <InputSpinner
        value={guests}
        onChange={onSelectSpin}
        max={maxGuests}
        min={mainGuests}
        step={step}
        colorMax={colorMax}
        colorMin={colorMin}
        style={{
         width: width * 0.45,
      }}
    />
  );
};

export default InputSpin;