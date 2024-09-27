// pages/index.js
import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";

import { Toolbox } from "./components/Toolbox";
import { SettingsPanel } from "./components/SettingsPanel";

import { Container } from "./components/user/Container";
import { Button } from "./components/user/Button";
import { Card, CardBottom, CardTop } from "./components/user/Card";
import { Text } from "./components/user/Text";

import { Editor, Frame, Element } from "@craftjs/core";
import { Topbar } from "./components/Topbar";
import { useState } from "react";
import { useEffect } from "react";
import lz from "lzutf8";

/**
 * 1、用 <Editor /> 包裹我们的应用，以设置编辑器的上下文。在 resolver 属性中指定用户组件的列表，以便 Craft.js 能够对我们的用户组件进行（反）序列化。
 * 2、然后用 <Frame /> 包裹可编辑区域，这样可以将渲染过程交给 Craft.js 处理。 在 <Frame /> 中渲染的每个元素都由编辑器内部状态中的一个称为 Node 的对象管理，该对象描述了元素、其事件和属性等信息。
 * 3、一个元素是否可拖动或可放置（或两者皆非）取决于管理它的 Node 类型：
    如果 Node 是 Canvas，则它是可放置的；

    如果 Node 是 Canvas 的直接子元素，则它是可拖动的。
 * 4、默认情况下，<Frame /> 内的每个元素都会自动定义一个非 Canvas 节点。因此，默认情况下，上述所有节点都既不可拖动也不可放置。
 * 5、可以使用提供的 <Element /> 组件来手动定义节点
 * 
 * 
 * 6、使用 useNode 钩子 Craft.js 管理我们组件的 DOM。这个钩子提供了连接器，充当 DOM 和 Craft.js 事件之间的桥梁。 还可以通过 craft 属性为我们的组件指定额外的配置
    connect：将 connect 连接器传递给组件的根元素，这告诉 Craft.js 该元素代表文本组件。如果该组件对应的节点是一个 Canvas，那么这也定义了可放置的区域。
    drag：将 drag 连接器传递给同一根元素，这为 DOM 添加了拖动处理程序。如果该组件的节点是 Canvas 的子节点，用户将能够拖动此元素，从而移动整个文本组件。
 * 
 * 7、<Element /> 在用户组件中使用时必须指定 id 属性
 * 8、每个用户组件必须添加到我们的解析器中
 * 
 * 9、工具箱组件
    connectors
      create ：将拖拽处理程序附加到其第一个参数指定的 DOM 上，并创建第二个参数指定的元素。
  
 * 10、 可编辑功能
      react-contenteditable 实现一个内容可编辑的功能 
      useNode 钩子提供了 setProp 方法，可以用来操作组件的属性。
      useNode 钩子接受一个收集器函数，可以用来检索与相应节点相关的状态信息。
 *
 * 11、useEditor：获取当前选择的组件，获取编辑器内部状态
 * 
  

 */

export default function App() {
  const [enabled, setEnabled] = useState(true);
  const [json, setJson] = useState(null);

  // Load save state from server on page load
  useEffect(() => {
    let stateToLoad = "eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkNvbnRhaW5lciJ9LCJpc0NhbnZhcyI6dHJ1ZSwicHJvcHPENWJhY2tncm91bmQiOiIjZWVlIiwicGFkZGluZyI6NX0sImRpc3BsYXnRVSwiY3VzdG9tIjp7fSwiaGlkZGVuIjpmYWxzZSwibm9kZXMiOlsiS2VYQU1iWEtSUSIsInVxRHZtTmhhQ1giLCIwdFg5RFk5X0dSIiwidmdYQjJacE9QayJdLCJsaW5rZWROxkR7fX0sIjF4SEtrcTBlYlH8APFhcmTuAOznAI73AO1mxQHsAPAz8gDwxFTuAOtwYXJlbnQiOuYBgPkA+/UAyGp3TjN0YS1jUsRM+ADIQnV0dG9u/gDKc2l6xCtzbWFsbOQBQGFyaWHlAJVvdXRsaW5l5QC1b2xvciI6InByaW1hcnkiLCJ0ZXjEJENsaWNrIG3kAetjaGlsZHLkAL/GFsR27gEC5wCO/wEE/wEE7AEEWnJISXpfVnFyS/sBBFTkAKr9AQLnAMxIaSB3b3JsZCEiLCJmb250U+UBGTIwLO4BI/EA18Vh/wDV/wDV7ADVVzlocnd2WExrRv8Dkv8DkvECpTk5OewCojL/A5L/AM7zA6JhLThRRGxOSUhVIiwiSlM2UHJQa2FHbvYDiMst/wG8/wG85QG8SXQncyBtZSBhZ2Fpbv8Bwf8Bwe4A8+sBjv8Bx+8A4OsBAP8A4P8A4OUA4ERyYWf/ANb/ANb/ANb/ANboANbrBYX/BT7/BT7/BT7/BT7/Apf+AMjpAjRvVlVFUi1CUG8iLCJi5QScc8RObW4xeG0tV1RwIuQA8usGav8FaP8FaP8FaP8FaP8FaP8FaP8BLv8B9uwHYf8CzP8CzP8FaP8C0f8FaP8A1fAA1esIKf8FaP8FaP8FaP8FaP8AzvQFaEZOblNaZjhzV3UiLCJaMEFFbWVSM1BB9gVoyy3/Abz/Abz/BWj/AcH/AcHsAY7/AcfwCATqAQD/AOD/AOD/BWj/ANb/ANb/ANbxANbrBJz+BWhUb3D8Apv1BUjENPcAse0LZfgCgFBVV0ppSW1FbsQlOFR5Vm1GZ3VJY/YCgMst/wGg/wGg5QGgVGl0bGUzNDU2NTQzMjM0Ne8BrP8Bne4A7O0GAP8Bne0A0+sA8/8A0/8A0+UA01N1YnTkANblANQ0NTbtANMx8g04/wDT/wDT9wDT6wb1/gJwQm90xHf/AnPxAnPHN/8Cdv0CdmVzUVppbVlzdVnEJWtJOVNhSVYyNCIsIkRNNmZBQnZwRzf2AoPLOv8Hw/8Hw/kHw2PnBdL/B8T0B8RMZWFybiBtb3Jl/wfJ8gYm6gG0/wHt7wEQ6wE9/wEQ/wEQ/wEQ/wEQ+wjUxBb/AQ7/AQ7/AQ7rAQ7rAj7/AQ7/AQ7/AQ7/AQ7/AQ7/AQ7/AQ7/AQ7GEXt9fX0=";

    const json = lz.decompress(lz.decodeBase64(stateToLoad));
    console.log(json);
    
    setJson(json);
  }, []);

  return (
    <div>
      <Typography variant="h5" align="center">
        A super simple page editor
      </Typography>
      <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }} enabled={enabled} >
        <Topbar />
        <Grid container spacing={3}>
          <Grid item xs>
            <Frame data={json} >
              {/* <Container padding={5} background="#eee"> */}
              <Element is={Container} padding={5} background="#eee" canvas>
                {/* 类型为容器的 Canvas 节点，可放置。 */}
                <Card />
                <Button size="small" variant="outlined" color="primary">
                  Click
                </Button>
                <Text size="small" text="Hi world!" />
                {/* <Container padding={6} background="#999"> */}
                <Element is={Container} padding={2} background="#999" canvas>
                  {/* 类型为容器的 Canvas 节点，也是 Canvas节点的直接子元素， 可放置且可拖动。 */}
                  <Text size="small" text="It's me again!" />
                  <Text size="small" text="Drag" />
                  {/* </Container> */}
                </Element>
                {/* </Container> */}
              </Element>
            </Frame>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ padding: "10px" }}>
              <Toolbox />
              <SettingsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Editor>
    </div>
  );
}
