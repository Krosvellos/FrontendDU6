//@@viewOn:imports
import { createVisualComponent, useState, BackgroundProvider } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Config from "../../config/config.js";
import { useThemeContext } from "../theme-mode/theme-context.js";

//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

const TextInput = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TextInput",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { id, value, onChange, ...restProps } = props;
    const [v, setV] = useState(value);
    const [isDark] = useThemeContext();

    //@@viewOn:render
    return (
      <BackgroundProvider background={isDark ? "dark" : "light"}>
      <Uu5Forms.Text.Input
        value={v}
        onChange={(e) => setV(e.data.value)}
        onBlur={() => onChange(v)}
        significance={id ? "subdued" : undefined}
        {...restProps}
      />
      </BackgroundProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TextInput };
export default TextInput;
//@@viewOff:exports 