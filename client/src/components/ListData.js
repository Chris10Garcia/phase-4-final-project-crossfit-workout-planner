import React from "react";
import { useRouteMatch, NavLink } from "react-router-dom";
import { 
  Header as HeaderUI, 
  Menu as MenuUI, 
  Placeholder as PlaceholderUI 
} from 'semantic-ui-react';

function ListData({ dataList }) {
  const match = useRouteMatch();

  if (dataList.length === 0) return (
    <React.Fragment>
      <HeaderUI as="h3">Please wait while backend server starts up and pulls data </HeaderUI>
      <PlaceholderUI fluid>
        <PlaceholderUI.Paragraph>
          <PlaceholderUI.Line /><PlaceholderUI.Line /><PlaceholderUI.Line /><PlaceholderUI.Line />
        </PlaceholderUI.Paragraph>
      </PlaceholderUI>
    </React.Fragment>
  );

  return (
    <MenuUI size="large" vertical fluid>
      { dataList.map( data => < MenuUI.Item 
                                          key={data.id}
                                          name={data.name}
                                          as={NavLink}
                                          to={`${match.url}/${data.id}`}
                                          color={"red"} /> )
      }
    </MenuUI>
  );
}


export default ListData