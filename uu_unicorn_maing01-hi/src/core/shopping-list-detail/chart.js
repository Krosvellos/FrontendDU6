import { createVisualComponent } from "uu5g05";
import Uu5ChartsBricks from "uu5chartsg01-bricks";
import Config from "./config/config.js";
import { Lsi } from "uu5g05";

const Chart = createVisualComponent({
  uu5Tag: Config.TAG + "Chart",
  propTypes: {},
  defaultProps: { data: {} },

  render(props) {
    const data = props.shoppingListDetail.itemList;
    const originalArray = Object.values(data);

    console.log("Original Array:", originalArray);

    const transformedArray = originalArray.reduce((result, currentItem) => {
      if (currentItem.checked) {
        result.checkedCount += 1;
      } else {
        result.uncheckedCount += 1;
      }
      return result;
    }, { checkedCount: 0, uncheckedCount: 0 });

    console.log("Transformed Array:", transformedArray);
    
    const finalArray = [
      { name: <Lsi lsi={{ cs: "Splněné", en: "Checked" }} />, amount: transformedArray.checkedCount },
      { name: <Lsi lsi={{ cs: "Nesplněné", en: "Unchecked" }} />, amount: transformedArray.uncheckedCount },
    ];

    console.log("Final Array:", finalArray);
    const getColor = (item) => {
      const { name } = item;
      const label = name.props.children.en; // Extract the label value properly
      switch (label) {
        case "Checked":
          return "blue"; // Assign red color for "Checked" label
        case "Unchecked":
          return "dark-blue"; // Assign yellow color for "Unchecked" label
        default:
          return "blue"; // Default color if label doesn't match
      }
    };

    return (
      <div>
      <h3>Chart</h3>
      <Uu5ChartsBricks.PieChart
        data={[finalArray]}
        serieList={[
          { valueKey: "amount", labelKey: "name", color: getColor }
        ]}
        legend
        onClick={(e) => console.log("Clicked!", e)}
      />
    </div>
    );
  },
});

export { Chart };
export default Chart;
