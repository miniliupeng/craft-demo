// components/Toolbox.js
// import React from "react";
// import { Box, Typography, Grid, Button as MaterialButton } from "@material-ui/core";

// export const Toolbox = () => {
//   return (
//     <Box px={2} py={2}>
//       <Grid container direction="column"  alignItems="center" justify="center" spacing={1}>
//         <Box pb={2}>
//           <Typography>Drag to add</Typography>
//         </Box>
//         <Grid container direction="column" item>
//           <MaterialButton variant="contained">Button</MaterialButton>
//         </Grid>
//         <Grid container direction="column" item>
//           <MaterialButton variant="contained">Text</MaterialButton>
//         </Grid>
//         <Grid container direction="column" item>
//           <MaterialButton variant="contained">Container</MaterialButton>
//         </Grid>
//         <Grid container direction="column" item>
//           <MaterialButton variant="contained">Card</MaterialButton>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// };


// components/Toolbox.js
import React from "react";
import { Box, Typography, Grid, Button as MaterialButton } from "@material-ui/core";
import { Element, useEditor } from "@craftjs/core";
import { Container } from "./user/Container";
import { Card } from "./user/Card";
import { Button } from "./user/Button";
import { Text } from "./user/Text";

export const Toolbox = () => {
  const { connectors, query } = useEditor();

  return (
    <Box px={2} py={2}>
      <Grid container direction="column"  alignItems="center" justify="center" spacing={1}>
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> {
            // console.log(ref);
            return connectors.create(ref, <Button size="small" >Click me</Button>)
          }} variant="contained">Button</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <Text text="Hi world" />)} variant="contained">Text</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <Element is={Container} padding={20} canvas />)} variant="contained">Container</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton ref={ref=> connectors.create(ref, <Card />)} variant="contained">Card</MaterialButton>
        </Grid>
      </Grid>
    </Box>
  )
};