//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import PositionBar from "../core/position-bar.js";
import importLsi from "../lsi/import-lsi.js";
import { useThemeContext } from "../core/theme-mode/theme-context.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),
};
//@@viewOff:css
const Bgcss = {
  main: () =>
    Config.Css.css({
      backgroundColor: "grey"
    }),
};
//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const [isDark] = useThemeContext();
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    const containerStyles = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '35vh',
      color: "white",
      fontSize: "18px" // Center vertically on the viewport
    };
    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      
      <div {...attrs}>
        <PositionBar />
        
        <div style={containerStyles}>
      <h1>Frontend - Domácí Úkol 6</h1>
      <div>
        <b>Přeji krásný den! </b>
        </div>
        <div><b>Seznamy naleznete v Shopping Lists. </b></div>
        <div><b><b> </b></b></div>

    </div>
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports