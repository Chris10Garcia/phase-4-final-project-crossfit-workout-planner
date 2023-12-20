import React, { useContext } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import ListData from "./ListData";
import { CurrentUserContext } from "./App";

import {
  Segment as SegmentUI,
  Header as HeaderUI, 
  Grid as GridUI,
  Button as ButtonUI
} from 'semantic-ui-react';



function PageFrame({ children, title, dataList, setDisplayButton, displayButton }) {
  const match = useRouteMatch();

  const {user} = useContext(CurrentUserContext)
  
  return (
    <SegmentUI>
      <HeaderUI>
        <h2>{title} Page</h2> 
        { user  ? <ButtonUI onClick ={() => setDisplayButton(!displayButton)} >
                              { displayButton ? "Hide Form" : `Show Add New / Edit Form`}
                  </ButtonUI>
                :  ""}

      </HeaderUI>

      <GridUI celled columns="equal" stackable>
        <GridUI.Row>
          <GridUI.Column width={3}>

            <HeaderUI>
              <h3>{title} List</h3>
            </HeaderUI>

            <ListData dataList={dataList} />
            
          </GridUI.Column>

          { children[0] }

          <GridUI.Column>

            <Route exact path={`${match.url}`}>
              <HeaderUI>
                <h3>Select the {title} on the left</h3>
              </HeaderUI>
            </Route>

            <Route path={`${match.url}/:itemID`}>
              { children[1] }
            </Route>

          </GridUI.Column>

        </GridUI.Row>
      </GridUI>
    </SegmentUI>
  );
}

export default PageFrame