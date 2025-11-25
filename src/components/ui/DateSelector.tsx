import { useState } from "react";
import { Text, View } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

type Props = {
  label?: string;
};
const DateSelector = ({ label }: Props) => {
  const today = new Date();
  console.log(today);
  const tomorrow = new Date(today.getDate() + 1);
  console.log(tomorrow);
  const startDate = getFormatedDate(tomorrow, "YYYY/MM/DD h:m");
  console.log(startDate);

  const [selectDate, setSelectedDate] = useState("");
  return (
    <View>
      {!!label && <Text>{label}</Text>}
      <DatePicker
        mode="calendar"
        options={{
          backgroundColor: "#090C08",
          textHeaderColor: "#FFA25B",
          textDefaultColor: "#F6E7C1",
          selectedTextColor: "#fff",
          mainColor: "#F4722B",
          textSecondaryColor: "#D6C7A1",
          borderColor: "rgba(122, 146, 165, 0.1)",
        }}
        style={{borderRadius: 15}}
        isGregorian={true}
        minimumDate={startDate}
        selected={selectDate}
        onSelectedChange={date => setSelectedDate(date)}
      />
    </View>
  );
};

export default DateSelector;
