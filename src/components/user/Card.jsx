// components/user/Card.js
// import React from "react";
// import { Text } from "./Text";
// import { Button } from "./Button";
// import { Container } from "./Container";
// import { Element } from "@craftjs/core";

// export const Card = ({ background, padding = 20 }) => {
//   return (
//     // <Element is={Container} background={background} padding={padding} canvas id="text_element">
//     <Container background={background} padding={padding}>
//       <Element id="text" canvas>
//         <Text text="Title" fontSize={20} />
//         <Text text="Subtitle" fontSize={15} />
//       </Element>
//       <Element id="buttons" canvas>
//         <Button size="small" variant="contained" color="primary">
//           Learn more
//         </Button>
//       </Element>
//     </Container>
//     // </Element>
//   );
// };

// components/user/Card.js
import React from "react";
import { Text } from "./Text";
import { Button } from "./Button";
import { Element, useNode } from "@craftjs/core";

import { Container, ContainerDefaultProps, ContainerSettings } from "./Container";

export const CardTop = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} >
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    // 只接受文本
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Text),
  },
};

export const CardBottom = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return <div ref={connect} style={{borderTop: "1px solid #ccc", padding: "10px"}}>{children}</div>;
};

CardBottom.craft = {
  rules: {
    // 只接受按钮
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Button),
  },
};

export const Card = ({ background, padding = 20 }) => {
  return (
    <Container background={background} padding={padding}>
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </Element>
      <Element id="buttons" is={CardBottom} canvas>
        <Button size="small" variant="contained" color="primary">Learn more</Button>
      </Element>
    </Container>
  );
};


Card.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings
  }
}