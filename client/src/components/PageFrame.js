import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import {
  Segment as SegmentUI,
  Header as HeaderUI, Grid as GridUI
} from 'semantic-ui-react';

import ListData from "./ListData";

function PageFrame({ children, title, dataList }) {
  const match = useRouteMatch();

  return (
    <SegmentUI>
      <HeaderUI>
        <h2>{title} Page</h2>
      </HeaderUI>

      <GridUI celled columns="equal">
        <GridUI.Row>
          <GridUI.Column width={3}>

            <HeaderUI>
              <h3>{title} List</h3>
            </HeaderUI>

            <ListData dataList={dataList} />
            
          </GridUI.Column>
          <GridUI.Column>

            <Route exact path={`${match.url}`}>
              <HeaderUI>
                <h3>Select the {title} on the left</h3>
              </HeaderUI>
            </Route>

            <Route path={`${match.url}/:itemID`}>
              {children}
            </Route>

          </GridUI.Column>
        </GridUI.Row>
      </GridUI>
    </SegmentUI>
  );
}

export default PageFrame