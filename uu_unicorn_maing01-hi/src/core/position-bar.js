//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, useState } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import { useUserContext } from "./user-list/user-context.js";
import User from "../bricks/user.js";
import Uu5Forms from "uu5g05-forms";
import { LanguageSelector,  } from "uu5g05-elements";
import { useThemeContext } from "./theme-mode/theme-context.js";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const PositionBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PositionBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [colorScheme, setColorScheme] = useState("grey");
    const { userList, loggedUser, setLoggedUser } = useUserContext();
    const [, setRoute] = useRoute();
    const [isDark, setIsDark] = useThemeContext();
    const backgroundStyle = {
      padding: "2px",
      background: isDark ? "black" : "white", // Change the background color based on isDark
      color: isDark ? "white" : "black", // Change text color based on isDark
    };
    
    const toggleColorScheme = () => {
      setColorScheme(colorScheme === "grey" ? "yellow" : "grey");
      setIsDark(!isDark); 
    };

    function withControlledInput(Input) {
      return (props) => {
        const { value: propsValue, onChange, onValidationStart, onValidationEnd } = props;

        const [value, setValue] = useState(propsValue);
        const [errorList, setErrorList] = useState(null);
        const [pending, setPending] = useState();

        return (
          <div>
            <Input
              {...props}
              value={value}
              onChange={(e) => {
                typeof onChange === "function" && onChange(e);
                setValue(e.data.value);
              }}
              onValidationStart={(e) => {
                typeof onValidationStart === "function" && onValidationStart(e);
                setPending(true);
              }}
              onValidationEnd={(e) => {
                typeof onValidationEnd === "function" && onValidationEnd(e);
                setErrorList(e.data.errorList.length ? e.data.errorList : null);
                setPending(false);
              }}
            />
            {errorList && (
              <div>
                <Uu5Elements.Text colorScheme="negative">
                  {errorList.map(({ code }) => code).join(" ")}
                </Uu5Elements.Text>
              </div>
            )}
            {pending && <div>Pending...</div>}
          </div>
        );
      };
    }

    const SwitchSelectInput = withControlledInput(Uu5Forms.SwitchSelect.Input);
    const [selectedMode, setSelectedMode] = useState(isDark ? "dark" : "light");
    const actionList = [
      {
        children: isDark ? <Lsi lsi={{ cs: "Přepnout na světlý režim", en: "Switch to Light mode"}}/> : <Lsi lsi={{ cs: "Přepnout na tmavý režim", en: "Switch to Dark mode"}}/>,
        collapsed: false,
        onClick: toggleColorScheme,
        colorScheme: colorScheme,
        significance: "highlighted",
      },      { component: <LanguageSelector LanguageSelector labelType="flag" languageList={["cs","en"]} />, collapsed: false },
      {
        children: "Shopping Lists",
        onClick: () => setRoute("shoppingListList"),
        collapsed: false,
        colorScheme: "blue"
      },
      {
        children: <User img={loggedUser.img} name={loggedUser.name} />,
        colorScheme: "grey",
        significance: "subdued",
      
        itemList: getUserItemList({ userList, setLoggedUser }),
        collapsed: false,
      },
       {
        component: (
          <SwitchSelectInput
            label={<Lsi lsi={{ en: "Switch to Dark/Light mode", cs: "Přepnout na tmavý/světlý režim" }} />}
            onChange={opt => {
              setSelectedMode(opt.value);
              setIsDark(opt.value === "dark");
              setColorScheme(opt.value === "dark" ? "yellow" : "grey");
            }}
            value={selectedMode}
            items={[
              { value: "dark", content: <Lsi lsi={{ cs: "Tmavý režim", en: "Dark mode" }} /> },
              { value: "light", content: <Lsi lsi={{ cs: "Světlý režim", en: "Light mode" }} /> },
            ]}
          />
        ),
        collapsed: false,
      },
    ];
      // other example routes
      
      const positionBarStyle = {
        backgroundColor: isDark ? "black" : "grey",
        color: isDark ? "white" : "black",
      };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div className={`position-bar ${isDark ? "dark-mode" : "light-mode"}`}>
      <Plus4U5App.PositionBar view={"short"} actionList={actionList} {...props}>
       <div><strong> Domácí Úkol 6 </strong></div>
      </Plus4U5App.PositionBar></div>
    );
   
    //@@viewOff:render
  },
});

function getUserItemList({ userList, setLoggedUser }) {
  const userItemList = [];
  userList.forEach((user) => {
    userItemList.push({
      children: <User img={user.img} name={user.name} />,
      onClick: () => setLoggedUser(user),
    });
  });
  return userItemList;
}

//@@viewOn:exports
export { PositionBar };
export default PositionBar;
//@@viewOff:exports