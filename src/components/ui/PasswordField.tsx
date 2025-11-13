import React, { useState } from "react";
import { View } from "react-native";
import TextField from "./TextField";

type Props = React.ComponentProps<typeof TextField>;

const PasswordField = (restInputProps: Props) => {

    /*React.useState*/
    const [show, setShow] = useState(false);
    return (
        <View>
            <TextField
            {...restInputProps}
            icon={restInputProps.icon ?? "lock"}
            secureTextEntry={!show}
            autoCapitalize="none"
            autoCorrect={false}
            />
        </View>
    );
};

export default PasswordField;