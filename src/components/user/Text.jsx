// components/user/Text.js
// import React from "react";

// export const Text = ({ text, fontSize }) => {
//   return (
//     <div>
//       <p style={{ fontSize }}>{text}</p>
//     </div>
//   );
// };

// components/user/Text.js
import React from "react";
import { Slider, FormControl, FormLabel } from "@material-ui/core";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { useState } from "react";
import { useEffect } from "react";

export const Text = ({ text, fontSize, textAlign }) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => {
    // console.log(state);
    return {
      hasSelectedNode: state.events.selected,
      hasDraggedNode: state.events.dragged,
    };
  });
  const [editable, setEditable] = useState(false); // 模拟双击：先选中再单击

  useEffect(() => {
    !hasSelectedNode && setEditable(false);
  }, [hasSelectedNode]);

  return (
    <div ref={(ref) => connect(drag(ref))} onClick={(e) => setEditable(true)}>
      <ContentEditable
        disabled={!editable}
        html={text}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
    <>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={(_, value) => {
            setProp((props) => (props.fontSize = value));
          }}
        />
      </FormControl>
    </>
  );
};

Text.craft = {
  props: {
    text: "Hi",
    fontSize: 20
  },
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
  },
  related: {
    settings: TextSettings
  }  
};
