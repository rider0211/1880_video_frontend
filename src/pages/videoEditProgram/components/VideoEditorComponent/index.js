import { Grid, Typography } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import VuiButton from "components/VuiButton";
import { useState } from "react";
import VideoItem from "../VideoItem";
import VuiBox from "components/VuiBox";
import { useSelector } from 'react-redux'
import { client_videos, header_videos, footer_videos } from "./mockData";

const clientVideosStatus = {
  client_video: {
    name: "Client Videos",
    items: client_videos
  },
}
const footerVideoStatus = {
  customer_footer_video: {
    name: "Customer Footer Video",
    items: footer_videos
  },
}
const headerVideoStatus = {
  customer_header_video: {
    name: "Customer Header Video",
    items: header_videos
  },
}
const editVideoStatus = {
  to_be_joined_header_video: {
    name: "Join Header Video",
    items: []
  },
  to_be_joined_client_video: {
    name: "Join Client Video",
    items: []
  },
  to_be_joined_footer_video: {
    name: "Join Footer Video",
    items: []
  },
};

const updateColumn = (source, destination, sourceColumn, setSourceColumn, destColumn, setDestColumn) => {
  const sourceColumnValue = sourceColumn[source.droppableId];
  const destColumnValue = destColumn[destination.droppableId];
  const sourceItems = [...sourceColumnValue.items];
  const destItems = [...destColumnValue.items];

  const [removed] = sourceItems.map((item) => ({ ...item, created_at: item.created_at = new Date(item.created_at).getTime() })).filter(item => item.created_at === source.index);
  const newSourceItems = sourceItems.map((item) => ({ ...item, created_at: item.created_at = new Date(item.created_at).getTime() })).filter(item => item.created_at !== source.index);
  destItems.splice(1, 0, removed);

  setSourceColumn({
    ...sourceColumn,
    [source.droppableId]: {
      ...sourceColumnValue,
      items: newSourceItems
    }
  });
  setDestColumn({
    ...destColumn,
    [destination.droppableId]: {
      ...destColumnValue,
      items: destItems
    }
  });
}
const onDragEnd = ({ result, clientVideoColumns, setclientVideoColumns, footerVideoColumns, setfooterVideoColumns, headerVideoColumns, setheaderVideoColumns, editVideoColumns, seteditVideoColumns }) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    switch (source.droppableId) {
      case "client_video":
        if (destination.droppableId === 'to_be_joined_client_video') {
          updateColumn(source, destination, clientVideoColumns, setclientVideoColumns, editVideoColumns, seteditVideoColumns)
        }
        break;
      case "customer_footer_video":
        if (destination.droppableId === 'to_be_joined_footer_video') {
          updateColumn(source, destination, footerVideoColumns, setfooterVideoColumns, editVideoColumns, seteditVideoColumns)
        }
        break;
      case "customer_header_video":
        if (destination.droppableId === 'to_be_joined_header_video') {
          updateColumn(source, destination, headerVideoColumns, setheaderVideoColumns, editVideoColumns, seteditVideoColumns)
        }
        break;
      case "to_be_joined_header_video":
        if (destination.droppableId === 'customer_header_video') {
          updateColumn(source, destination, editVideoColumns, seteditVideoColumns, headerVideoColumns, setheaderVideoColumns)
        }
        break;
      case "to_be_joined_client_video":
        if (destination.droppableId === 'client_video') {
          updateColumn(source, destination, editVideoColumns, seteditVideoColumns, clientVideoColumns, setclientVideoColumns)
        }
        break;
      case "to_be_joined_footer_video":
        if (destination.droppableId === 'customer_footer_video') {
          updateColumn(source, destination, editVideoColumns, seteditVideoColumns, footerVideoColumns, setfooterVideoColumns)
        }
        break;
      default:
        break;
    }
  }

};

const cardHeader = (header) => {
  var title = header.replaceAll('_', ' ').toUpperCase();
  const splitTitle = title.split(' ');
  if (splitTitle[0] === 'TO') {
    title = splitTitle[3] + ' ' + splitTitle[4];
  }
  return <Typography alignSelf={'center'} color={"whitesmoke"}>{title}</Typography>
}
const returnDropBox = (columns, xs, sm, lg) => {
  return (
    Object.entries(columns).map(([columnID, column], index) => {
      return (
        <Grid item xs={xs} sm={sm} lg={lg} key={columnID}>
          <Card sx={{ backdropFilter: "none !important", marginTop: '20px', height: '100%' }}>
            <CardHeader component={() => cardHeader(columnID)} />
            <Divider light sx={{ marginTop: 5 }} />
            <Droppable droppableId={columnID} key={columnID}>
              {(provided, snapshot) => {
                return (
                  <CardContent
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      padding: 4,
                    }}>
                    {column.items.map((item, index) => {
                      const id = new Date(item.created_at).getTime();
                      return (
                        <Draggable
                          key={id}
                          draggableId={id.toString()}
                          index={id}
                        >
                          {(provided, snapshot) => {
                            return (
                              <VuiBox
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  ...provided.draggableProps.style,
                                  marginTop: '10px',
                                  textAlign: '-webkit-center'
                                }}
                              >
                                <VideoItem props={item} />
                              </VuiBox>
                            )
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </CardContent>
                )
              }}
            </Droppable>
          </Card>
        </Grid>
      )
    })
  )
}

function VideoEditorComponent() {
  const [clientVideoColumns, setclientVideoColumns] = useState(clientVideosStatus);
  const [footerVideoColumns, setfooterVideoColumns] = useState(footerVideoStatus);
  const [headerVideoColumns, setheaderVideoColumns] = useState(headerVideoStatus);
  const [editVideoColumns, seteditVideoColumns] = useState(editVideoStatus);
  return (
    <Grid container justifyContent={"space-between"} spacing={3} width={'100%'}>
      <DragDropContext onDragEnd={(result) => {
        const props = {
          result, clientVideoColumns, setclientVideoColumns, footerVideoColumns, setfooterVideoColumns, headerVideoColumns, setheaderVideoColumns, editVideoColumns, seteditVideoColumns
        }
        onDragEnd(props)
      }}>
        {returnDropBox(clientVideoColumns, 12, 6, 3)}
        <Grid item xs={12} sm={6} lg={6}>
          <Card sx={{ backdropFilter: "none !important", marginTop: '20px' }}>
            <CardHeader component={() => cardHeader("video_edit_panel")} />
            <Divider light sx={{ marginTop: 5 }} />
            <CardContent sx={{ height: '100%' }}>
              <Grid container justifyContent={"space-between"} spacing={3} width={'100%'}>
                {returnDropBox(editVideoColumns, null, 12, 4, 4)}
              </Grid>
              <Divider light sx={{ marginTop: 5 }} />
              <Grid container justifyContent={'center'} width={'100%'}>
                <VuiButton
                  variant="contained"
                  color="error"
                  sx={{ width: '80%' }}
                  size="large"
                  disabled={false}
                >
                  Join Video
                </VuiButton>
              </Grid>
              <Grid container justifyContent={'center'} spacing={3} width={'100%'}>
                <Grid item xs={12} sm={7} lg={8}>
                  <Card sx={{ marginTop: '20px' }}>
                    <CardHeader component={() => cardHeader('result_video')} />
                    <Divider light sx={{ marginTop: 5 }} />
                    <CardContent></CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                  <VuiButton
                    variant="outlined"
                    color="info"
                    sx={{ width: '100%', height: '100%', marginTop: '20px' }}
                    size="large"
                    disabled={false}
                  >
                    Upload & Send To Email
                  </VuiButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {returnDropBox(headerVideoColumns, null, 12, 12, 12)}
          {returnDropBox(footerVideoColumns, null, 12, 12, 12)}
        </Grid>
      </DragDropContext>
    </Grid>
  )
}

export default VideoEditorComponent;